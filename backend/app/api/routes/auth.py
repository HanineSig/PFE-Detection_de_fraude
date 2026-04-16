from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from app.core.database import get_db
from app.models.user import User, PendingUser
from app.schemas.auth import UserCreate, OTPVerification, ResendOTP, Token
from app.core.security import get_password_hash
from app.core.utils import generate_otp_code, get_otp_expiration
from app.core.jwt import create_access_token
from app.services.mail.mail_service import send_otp_email

router = APIRouter(prefix="/auth", tags=["Authentification"])

@router.post("/register", status_code=status.HTTP_202_ACCEPTED)
async def register(user: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Etape 1 de l'inscription : 
    Verifie si l'utilisateur existe deja. Si non, hache le MDP, cree une entree 
    dans 'pending_users' et declenche l'envoi de l'OTP en arriere-plan.
    """
    # 1. Verification de l'existence
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un compte avec cet email existe déjà."
        )

    # 2. Gestion de l'entite PendingUser (ecraser si existe deja une tentative non valide)
    db_pending = db.query(PendingUser).filter(PendingUser.email == user.email).first()
    
    otp_code = generate_otp_code()
    otp_expires_at = get_otp_expiration(minutes=15)
    hashed_pwd = get_password_hash(user.password)

    if db_pending:
        # Met a jour l'entrée existante si l'utilisateur redemande une inscription
        db_pending.otp_code = otp_code
        db_pending.otp_expires_at = otp_expires_at
        db_pending.hashed_password = hashed_pwd
        db_pending.nom = user.nom
        db_pending.prenom = user.prenom
    else:
        # Nouvelle tentative
        db_pending = PendingUser(
            email=user.email,
            hashed_password=hashed_pwd,
            nom=user.nom,
            prenom=user.prenom,
            otp_code=otp_code,
            otp_expires_at=otp_expires_at
        )
        db.add(db_pending)
    
    db.commit()

    # 3. Envoi de l'email en tache de fond (BackgroundTasks) pour ne pas bloquer le frontend
    background_tasks.add_task(send_otp_email, user.email, otp_code)

    return {"success": True, "message": "Compte mis en attente. Veuillez verifier votre email."}


@router.post("/verify-otp", response_model=Token)
def verify_otp(payload: OTPVerification, db: Session = Depends(get_db)):
    """
    Etape 2 de l'inscription :
    Verifie le code OTP. Si valide, transfere les donnees vers la table 'users',
    supprime l'entree de 'pending_users' et retourne le token JWT.
    """
    # 1. Recuperation du pending user
    pending = db.query(PendingUser).filter(PendingUser.email == payload.email).first()
    if not pending:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Aucune demande d'inscription trouvee pour cet email."
        )

    # 2. Verification de la date d'expiration
    if pending.otp_expires_at.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le code de verification a expire. Veuillez en redemander un."
        )

    # 3. Verification du code
    if pending.otp_code != payload.otp_code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Code de verification incorrect."
        )

    # 4. Transfert vers la table officielle "users"
    new_user = User(
        email=pending.email,
        hashed_password=pending.hashed_password,
        nom=pending.nom,
        prenom=pending.prenom,
        role=pending.role,
        is_active=True,
        is_verified=True
    )
    
    db.add(new_user)
    db.delete(pending) # Nettoyage table temporaire
    db.commit()
    db.refresh(new_user)

    # 5. Creation du Token (Verification OK)
    access_token = create_access_token(
        data={"sub": new_user.email, "role": new_user.role, "nom": new_user.nom, "prenom": new_user.prenom}
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/resend-otp")
def resend_otp(payload: ResendOTP, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Genere et renvoie un nouveau code OTP a un PendingUser.
    """
    pending = db.query(PendingUser).filter(PendingUser.email == payload.email).first()
    if not pending:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Aucune inscription en attente pour cet email."
        )

    new_otp = generate_otp_code()
    pending.otp_code = new_otp
    pending.otp_expires_at = get_otp_expiration()
    
    db.commit()

    background_tasks.add_task(send_otp_email, pending.email, new_otp)
    
    return {"success": True, "message": "Nouveau code envoye."}

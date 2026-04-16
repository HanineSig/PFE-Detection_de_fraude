import os
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from dotenv import load_dotenv

load_dotenv()

# Configuration FastAPI-Mail avec Mailjet
conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("SMTP_USER", ""),
    MAIL_PASSWORD = os.getenv("SMTP_PASSWORD", ""),
    MAIL_FROM = os.getenv("MAIL_FROM", "noreply@ciar.dz"),
    MAIL_PORT = int(os.getenv("SMTP_PORT", 587)),
    MAIL_SERVER = os.getenv("SMTP_HOST", "in-v3.mailjet.com"),
    MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "CIAR Security Platform"),
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

fm = FastMail(conf)

async def send_otp_email(email_to: str, otp_code: str):
    """
    Envoie un email OTP asynchrone utilisant fastapi-mail.
    """
    html = f"""
    <div style="font-family: Arial, sans-serif; background-color: #F6FAFD; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 30px; border-top: 4px solid #1A3D63; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h2 style="color: #0A1931; margin-top: 0;">Code de verification CIAR CIAR Fraud Detection</h2>
            <p style="color: #4A7FA7; font-size: 16px;">Bonjour,</p>
            <p style="color: #333; font-size: 14px; line-height: 1.5;">
                Vous avez demande la creation d'un compte sur notre plateforme. Veuillez utiliser le code de securite ci-dessous pour finaliser votre inscription. Ce code est valide pendant 15 minutes.
            </p>
            <div style="background-color: #F6FAFD; border: 1px solid #B3CFE5; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1A3D63;">{otp_code}</span>
            </div>
            <p style="color: #666; font-size: 12px;">Si vous n'etes pas a l'origine de cette demande, vous pouvez ignorer cet email.</p>
        </div>
    </div>
    """
    
    message = MessageSchema(
        subject="Votre code de securite CIAR",
        recipients=[email_to],
        body=html,
        subtype=MessageType.html
    )
    
    # Tentative d'envoi. Si faux credentials (en dev), on catch l'erreur
    try:
        if conf.MAIL_USERNAME:
            await fm.send_message(message)
            print(f"[MAIL_SERVICE] Email envoye a {email_to} avec le code {otp_code}")
        else:
            print(f"[MAIL_SERVICE - DEV MODE] SMTP non configure. Le code OTP pour {email_to} est : {otp_code}")
    except Exception as e:
        print(f"[MAIL_SERVICE - ERREUR] Impossible d'envoyer l'email : {e}")
        print(f"[MAIL_SERVICE - FALLBACK] Le code OTP pour {email_to} est : {otp_code}")

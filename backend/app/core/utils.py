import random
import string
from datetime import datetime, timedelta, timezone

def generate_otp_code(length: int = 6) -> str:
    """Genere une chaine de chiffres aleatoires de la taille specifiee."""
    return ''.join(random.choices(string.digits, k=length))

def get_otp_expiration(minutes: int = 15) -> datetime:
    """Retourne la date limite de validite d'un OTP."""
    return datetime.now(timezone.utc) + timedelta(minutes=minutes)

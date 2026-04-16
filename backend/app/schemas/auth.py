from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, description="Mot de passe avec 8 car. min, 1 maj, 1 chiffre/spe")
    nom: str
    prenom: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    nom: str
    prenom: str
    role: str
    is_active: bool
    is_verified: bool

    class Config:
        from_attributes = True

class OTPVerification(BaseModel):
    email: EmailStr
    otp_code: str

class ResendOTP(BaseModel):
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

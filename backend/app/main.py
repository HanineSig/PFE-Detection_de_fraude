import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Import de la base de donnees et des routes
from app.core.database import engine, Base
from app.api.routes import auth

# Chargement des variables d'environnement
load_dotenv()

# Creation des tables de la base de donnees (Alembic sera utilise en prod, mais utile en dev)
Base.metadata.create_all(bind=engine)

# Initialisation de l'application FastAPI
app = FastAPI(
    title=os.getenv("PROJECT_NAME", "CIAR Fraud Detection API"),
    version=os.getenv("VERSION", "1.0.0"),
    description="API Backend - Systeme d'aide a la decision",
)

# Configuration CORS pour autoriser le frontend a communiquer avec l'API
origins_raw = os.getenv("BACKEND_CORS_ORIGINS", '["http://localhost:5173"]')
import json
try:
    origins = json.loads(origins_raw)
except Exception:
    origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs API
app.include_router(auth.router, prefix="/api")

@app.get("/", tags=["Healthcheck"])
def read_root():
    return {"status": "ok", "message": "Bienvenue sur l'API CIAR Fraud Detection"}

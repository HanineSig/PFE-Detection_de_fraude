# Guide de Déploiement et d'Exécution - CIAR Fraud Detection

Ce guide regroupe de manière ultra-synthétique toutes les commandes nécessaires pour installer les dépendances et démarrer les serveurs de l'application, que ce soit pour le développement (Frontend) ou l'API (Backend).

L'application est découpée en deux dossiers distincts nécessitant deux terminaux différents.

---

## 1. FRONTEND (Interface Utilisateur / React)

Le frontend utilise **Node.js** et son gestionnaire de paquets **npm**.
*Assurez-vous d'ouvrir un terminal spécifiquement dans le dossier `frontend`.*

### A. Installation de l'environnement (Une seule fois)
Placez-vous dans le bon dossier et installez les dépendances listées dans `package.json` :
```powershell
cd "e:\Etudes\M2-ISI\PFE\Détection de fraude\Code_AG_PFE\frontend"
npm install
```

### B. Lancer le serveur de développement (Pour tester l'UI)
Cette commande démarre le serveur web local avec rechargement à chaud (Hot-Reloading).
```powershell
cd "e:\Etudes\M2-ISI\PFE\Détection de fraude\Code_AG_PFE\frontend"
npm run dev
```
👉 *L'application sera accessible dans votre navigateur à l'adresse : **http://localhost:5173***

---

## 2. BACKEND (Moteur API / Python FastAPI)

Le backend utilise **Python** et son gestionnaire de paquets **pip**, au sein d'un environnement virtuel protégé appelé **venv** (pour ne pas casser le Python de votre système entier).
*Assurez-vous d'ouvrir un deuxième terminal spécifiquement dans le dossier `backend`.*

### A. Installation de l'environnement (Une seule fois)
Placez-vous dans le bon dossier, **activez** l'environnement virtuel, puis installez les dépendances listées dans `requirements.txt` :
```powershell
cd "e:\Etudes\M2-ISI\PFE\Détection de fraude\Code_AG_PFE\backend"

# 1. Activation de l'environnement virtuel (Obligatoire à chaque ouverture du terminal)
.\venv\Scripts\Activate.ps1

# 2. Installation des outils (FastAPI, Machine Learning, Mails, etc.)
pip install -r requirements.txt
```

### B. Lancer le serveur de développement (Pour l'API backend)
Une fois l'environnement activé, lancez le serveur FastAPI. Uvicorn est le serveur qui fait tourner notre API. Le flag `--reload` permet de redémarrer le serveur dès qu'on modifie le code python.
```powershell
cd "e:\Etudes\M2-ISI\PFE\Détection de fraude\Code_AG_PFE\backend"

# N'oubliez pas l'activation si vous venez de lancer ce nouveau terminal
.\venv\Scripts\Activate.ps1

# Démarrage du moteur FastAPI (Il cherchera votre dossier 'app' et le fichier 'main.py')
uvicorn app.main:app --reload
```
👉 *L'API locale sera opérationnelle et sa documentation automatique (Swagger) sera accessible sur : **http://localhost:8000/docs***

---

## 💡 RÉSUMÉ RAPIDE POUR LE TRAVAIL QUOTIDIEN

**Terminal 1 (Le visuel) :**
```powershell
cd frontend
npm run dev
```

**Terminal 2 (Le moteur / Base de données) :**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```
















# ------------------
# 1. On rentre dans le dossier backend
cd "E:\Etudes\M2-ISI\PFE\Détection de fraude\Code_AG_PFE\backend"

# 2. ON ACTIVE LE VENV (C'est ÇA qui te manquait !)
.\venv\Scripts\Activate.ps1

# 3. Seulement maintenant, on lance le serveur (tu devrais voir "(venv)" écrit au début de ta ligne de commande avant de taper ça)
uvicorn app.main:app --reload

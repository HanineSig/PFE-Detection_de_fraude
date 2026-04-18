# GUIDE COMPLET — MON PFE CIAR FRAUD DETECTION
## Master 2 ISI — 2025/2026 | A lire a chaque debut de session

> **Ce fichier est MON document de référence.** A chaque nouvelle session de dev, je relis ce fichier pour me remettre en contexte et savoir exactement où j'en suis et ce que je dois faire.
>
> **Ce document est vivant.** La structure du projet, les pages, leur contenu, la DA, les détails techniques — tout peut évoluer au fil du développement. Seules les règles de la section 11 sont permanentes et intouchables.

---

## TABLE DES MATIERES

1. [Ce que j'ai compris du projet](#1-ce-que-jai-compris)
2. [Stack technique arrêtée](#2-stack-technique)
3. [Structure des dossiers du projet](#3-structure-des-dossiers)
4. [Dépendances à installer — Liste complète](#4-dépendances)
5. [Commandes à exécuter — Setup complet](#5-setup-et-commandes)
6. [Architecture des pages](#6-architecture-des-pages)
7. [Plan de développement phase par phase](#7-plan-de-développement)
8. [État actuel du projet](#8-état-actuel)
9. [Observations et ajustements à l'architecture](#9-observations)
10. [Conventions de nommage et style](#10-conventions)
11. [REGLES PERMANENTES DE CODAGE — A ne jamais oublier](#11-regles-permanentes)

---

## 1. CE QUE J'AI COMPRIS DU PROJET

### 🎯 La mission
Je développe un **Système d'Aide à la Décision pour la Détection de Fraude à l'Assurance** pour la compagnie algérienne **CIAR** (Compagnie d'Assurance). Le système s'appelle **CIAR Fraud Detection**.

### 🏢 Le contexte métier
- La CIAR souffre de fraudes aux sinistres (déclarations fictives, exagérations de dommages…)
- Actuellement, la détection se fait **manuellement** par des experts : lent, coûteux, insuffisant
- Mon système vient **assister** (pas remplacer) les experts en leur donnant un score de suspicion + des explications pour chaque dossier de sinistre

### 🧠 Le cœur du système
1. Un dossier de sinistre arrive (ex: accident voiture)
2. Le système analyse : règles métier (30%) + modèle ML XGBoost/Random Forest (70%)
3. Il sort un **score de fraude [0-1]**, un niveau (Faible/Moyen/Élevé), les facteurs de risque, et un graphe SHAP explicatif
4. L'expert valide ou rejette → son feedback améliore le modèle (reinforcement)

### 👥 Les utilisateurs
- **Expert** : peut analyser des dossiers, valider/rejeter des alertes
- **Admin** : peut tout faire + gérer les utilisateurs + voir les logs d'audit

### 🧩 Les grandes parties du système
```
Frontend (React) ↔ API (FastAPI/Python) ↔ Oracle DB
                                      ↕
                              ML Engine (XGBoost + SHAP)
```

---

## 2. STACK TECHNIQUE

> **⚠️ DÉCISION FINALE — Ne pas changer sans raison valable**

| Couche | Technologie | Version cible | Pourquoi |
|---|---|---|---|
| **Frontend** | React.js via **Vite** | React 19.x / Vite 6.x | SPA rapide, HMR, build léger |
| **Styling** | **Tailwind CSS** | v3.x (NE PAS utiliser v4 encore) | Utility-first, dark mode natif, cohérent |
| **Icônes** | Lucide React | latest | MIT, léger, cohérent |
| **Graphiques** | Recharts | 2.x | Natif React, responsive |
| **Router** | React Router DOM | v6.x | Standard SPA |
| **Auth Google** | @react-oauth/google | latest | Simple, officiel |
| **HTTP Client** | Axios | 1.x | Intercepteurs JWT, gestion erreurs |
| **Backend** | FastAPI (Python) | 0.110+ | Auto-doc Swagger, rapide, idéal ML |
| **ML** | scikit-learn + XGBoost | sklearn 1.4+ / xgboost 2.x | Standards industrie |
| **Explicabilité** | SHAP | 0.45+ | Interprétabilité des modèles |
| **Base de données** | **Oracle** (prod) / PostgreSQL (dev) | Oracle 19c / PG 15 | Déjà utilisé à la CIAR |
| **ORM** | SQLAlchemy | 2.x | Compatible Oracle + PG |
| **Auth tokens** | JWT (PyJWT) | 2.x | Stateless, sécurisé |
| **Environnement** | Python venv | Python 3.11 | Stable, pandas/sklearn compatibles |
| **Package manager** | npm | 10.x | Standard |
| **IDE** | VS Code | latest | Extensions Python + React |
| **Versioning** | Git + GitHub | — | — |
| **Notebooks** | Jupyter Lab | 4.x | Exploration ML |
| **Conteneurisation** | Docker (optionnel) | — | Pour déploiement final |

---

## 3. STRUCTURE DES DOSSIERS DU PROJET

> **C'est comme ça que le projet sera organisé dans le dossier `Code_AG_PFE/`**

```
Code_AG_PFE/
│
├── 📁 Ressource PFE/               ← DOCS DE RÉFÉRENCE (ne pas toucher)
│   ├── ARCHITECTURE_CIAR_PFE.md
│   ├── Fiche_Proposition_PFE...md
│   ├── Plan PFE (1).md
│   ├── Proto SingUP/
│   └── Proto Loader/
│
├── 📄 A_MOI.md                     ← CE FICHIER (guide personnel)
│
├── 📁 frontend/                    ← APPLICATION REACT (Vite)
│   ├── 📁 public/
│   │   ├── favicon.ico
│   │   ├── logo-ciar.png
│   │   └── index.html
│   │
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   │   ├── images/
│   │   │   │   ├── bg-left-panel.jpg
│   │   │   │   └── logo-ciar.svg
│   │   │   └── icons/
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📁 auth/
│   │   │   │   ├── SignUpForm.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── GoogleLoginButton.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── 📁 layout/
│   │   │   │   ├── AppLayout.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── TopBar.jsx
│   │   │   │   └── WavyBackground.jsx
│   │   │   │
│   │   │   ├── 📁 ui/              ← composants atomiques réutilisables
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Badge.jsx       ← badge couleur (vert/orange/rouge)
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── DarkModeToggle.jsx
│   │   │   │   └── Alert.jsx
│   │   │   │
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── KPICard.jsx
│   │   │   │   ├── FraudChart.jsx
│   │   │   │   ├── RepartitionChart.jsx
│   │   │   │   └── RecentDossiersTable.jsx
│   │   │   │
│   │   │   └── 📁 analysis/
│   │   │       ├── ScoreGauge.jsx  ← jauge circulaire score fraude
│   │   │       ├── FactorList.jsx
│   │   │       ├── ShapPlot.jsx    ← graphique SHAP affiché
│   │   │       └── ExpertFeedback.jsx
│   │   │
│   │   ├── 📁 pages/               ← une page = une route
│   │   │   ├── SignUp.jsx          ← ✅ EN COURS (proto existant)
│   │   │   ├── Login.jsx           ← 🔲 À FAIRE
│   │   │   ├── Dashboard.jsx       ← 🔲 À FAIRE
│   │   │   ├── AnalyseDossier.jsx  ← 🔲 À FAIRE
│   │   │   ├── GestionAlertes.jsx  ← 🔲 À FAIRE
│   │   │   ├── Profil.jsx          ← 🔲 À FAIRE
│   │   │   └── NotFound.jsx        ← 🔲 À FAIRE
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── useDarkMode.js
│   │   │   ├── useAuth.js
│   │   │   ├── useDossiers.js
│   │   │   └── useAnalyse.js
│   │   │
│   │   ├── 📁 contexts/
│   │   │   ├── ThemeContext.jsx
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── api.js              ← axios instance + intercepteurs JWT
│   │   │   ├── authService.js
│   │   │   ├── dossiersService.js
│   │   │   ├── analyseService.js
│   │   │   ├── dashboardService.js
│   │   │   └── 📁 mockData/        ← données fictives pendant dev frontend
│   │   │       ├── mockDossiers.js
│   │   │       ├── mockStats.js
│   │   │       └── mockAnalyse.js
│   │   │
│   │   ├── 📁 router/
│   │   │   └── AppRouter.jsx
│   │   │
│   │   ├── 📁 styles/
│   │   │   ├── globals.css
│   │   │   └── animations.css
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env                        ← NE PAS COMMIT
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── 📁 backend/                     ← API FASTAPI
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   └── 📁 routes/
│   │   │       ├── auth.py
│   │   │       ├── dossiers.py
│   │   │       ├── analyse.py
│   │   │       └── dashboard.py
│   │   │
│   │   ├── 📁 core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── database.py
│   │   │
│   │   ├── 📁 models/
│   │   │   ├── user.py
│   │   │   ├── dossier.py
│   │   │   └── alert.py
│   │   │
│   │   ├── 📁 schemas/
│   │   │   ├── auth.py
│   │   │   ├── dossier.py
│   │   │   └── analyse.py
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── auth_service.py
│   │   │   ├── dossier_service.py
│   │   │   └── ml_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── 📁 ml/                      ← MOTEUR MACHINE LEARNING
│   │   ├── 📁 data/
│   │   │   ├── raw/
│   │   │   ├── processed/
│   │   │   └── features/
│   │   │
│   │   ├── 📁 notebooks/           ← Jupyter pour exploration
│   │   │   ├── 01_exploration.ipynb
│   │   │   ├── 02_feature_engineering.ipynb
│   │   │   ├── 03_model_training.ipynb
│   │   │   └── 04_shap_explainability.ipynb
│   │   │
│   │   ├── 📁 models/              ← modèles .pkl sauvegardés
│   │   │   ├── xgboost_fraud_v1.pkl
│   │   │   ├── random_forest_v1.pkl
│   │   │   └── scaler.pkl
│   │   │
│   │   └── 📁 src/
│   │       ├── preprocessor.py
│   │       ├── feature_engineering.py
│   │       ├── business_rules.py
│   │       ├── trainer.py
│   │       ├── predictor.py
│   │       └── explainer.py
│   │
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📁 docs/                        ← documentation technique
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── ML_METHODOLOGY.md
│   └── USER_GUIDE.md
│
├── 📁 scripts/
│   ├── seed_db.py
│   └── export_oracle.py
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 4. DÉPENDANCES À INSTALLER

### 4.1 — Prérequis système (à installer en premier)

| Outil | Version | Lien | Pourquoi |
|---|---|---|---|
| **Node.js** | 20.x LTS | https://nodejs.org | Runtime JS + npm |
| **Python** | 3.11.x | https://python.org | Backend + ML |
| **Git** | latest | https://git-scm.com | Versioning |
| **VS Code** | latest | https://code.visualstudio.com | IDE |
| **Oracle DB** | 19c (en prod) | via CIAR | Base de données principale |
| **PostgreSQL** | 15.x | https://postgresql.org | Base de données dev/local |
| **Jupyter Lab** | via pip | — | Notebooks ML |

> **Extensions VS Code recommandées :**
> - Python (Microsoft)
> - Pylance
> - ES7+ React/Redux/React-Native snippets
> - Tailwind CSS IntelliSense
> - GitLens
> - Thunder Client (pour tester l'API)
> - Prettier - Code formatter

---

### 4.2 — Dépendances Frontend (npm)

**`frontend/package.json` — dépendances de production :**

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.28.0",
    "axios": "^1.8.0",
    "recharts": "^2.15.0",
    "lucide-react": "^0.475.0",
    "@react-oauth/google": "^0.12.1",
    "jwt-decode": "^4.0.0"
  },
  "devDependencies": {
    "vite": "^6.2.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.1"
  }
}
```

**Installation npm (une fois dans le dossier `frontend/`) :**
```bash
npm install react react-dom react-router-dom axios recharts lucide-react @react-oauth/google jwt-decode
npm install -D tailwindcss@3 autoprefixer postcss
```

---

### 4.3 — Dépendances Backend Python

**`backend/requirements.txt` :**

```text
# Framework API
fastapi==0.115.0
uvicorn[standard]==0.32.0
python-multipart==0.0.12

# Base de données
sqlalchemy==2.0.36
cx_Oracle==8.3.0          # Connexion Oracle
psycopg2-binary==2.9.10   # Connexion PostgreSQL (dev)
alembic==1.14.0           # Migrations DB

# Authentification
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
PyJWT==2.10.1

# Machine Learning
scikit-learn==1.5.2
xgboost==2.1.3
shap==0.46.0
pandas==2.2.3
numpy==1.26.4
matplotlib==3.9.3
seaborn==0.13.2
joblib==1.4.2

# Utilitaires
python-dotenv==1.0.1
pydantic==2.10.3
pydantic-settings==2.6.1
httpx==0.28.1             # Pour tests async
```

**`backend/ml/requirements_ml.txt` (notebooks Jupyter) :**

```text
jupyterlab==4.3.0
ipykernel==6.29.5
imbalanced-learn==0.12.4  # SMOTE pour déséquilibre classes
scipy==1.14.1
plotly==5.24.1
```

**Installation backend :**
```bash
# Créer environnement virtuel (dans backend/)
python -m venv venv

# Activer (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Installer tout
pip install -r requirements.txt
```

---

## 5. SETUP COMPLET — COMMANDES À EXÉCUTER

### 5.1 — Initialiser le projet Frontend

```powershell
# Se placer dans le dossier racine du projet
cd "e:\Etudes\M2-ISI\PFE\Détection de fraude\Code_AG_PFE"

# Créer le projet Vite React
npm create vite@latest frontend -- --template react

# Entrer dans le dossier
cd frontend

# Installer les dépendances
npm install

# Installer les libs du projet
npm install react-router-dom axios recharts lucide-react @react-oauth/google jwt-decode

# Installer Tailwind CSS v3
npm install -D tailwindcss@3 autoprefixer postcss

# Initialiser Tailwind
npx tailwindcss init -p
```

> **Après `npx tailwindcss init -p`**, modifier `tailwind.config.js` :
> ```javascript
> export default {
>   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
>   darkMode: 'class',
>   theme: {
>     extend: {
>       colors: {
>         'primary-dark': '#0A1931',
>         'secondary-blue-light': '#B3CFE5',
>         'secondary-blue-mid': '#4A7FA7',
>         'secondary-blue-dark': '#1A3D63',
>         'background-light': '#F6FAFD',
>       },
>       fontFamily: {
>         sans: ['Inter', 'sans-serif'],
>       }
>     }
>   },
>   plugins: []
> }
> ```

---

### 5.2 — Initialiser le projet Backend

```powershell
# Depuis la racine
mkdir backend
cd backend

# Créer l'environnement virtuel Python 3.11
python -m venv venv

# Activer l'env virtuel (PowerShell)
.\venv\Scripts\Activate.ps1

# Installer les dépendances
pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary python-jose passlib pyjwt python-dotenv pydantic pydantic-settings python-multipart alembic

# Vérifier que FastAPI marche
uvicorn app.main:app --reload --port 8000
```

---

### 5.3 — Initialiser le projet ML / Jupyter

```powershell
# Depuis backend/ (avec le venv activé)
pip install scikit-learn xgboost shap pandas numpy matplotlib seaborn joblib imbalanced-learn jupyterlab plotly

# Lancer Jupyter Lab
jupyter lab
```

---

### 5.4 — Fichiers d'environnement à créer

**`frontend/.env`** :
```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=ton_google_client_id
VITE_APP_NAME=CIAR Fraud Detection
VITE_APP_VERSION=1.0.0
VITE_USE_MOCK=true
```

**`backend/.env`** :
```env
# App
APP_NAME=CIAR Fraud Detection API
DEBUG=True
SECRET_KEY=une_clé_secrète_très_longue_et_random

# Base de données (dev avec PostgreSQL)
DATABASE_URL=postgresql://postgres:password@localhost:5432/ciar_fraud_db

# Oracle (prod)
ORACLE_DSN=localhost:1521/ORCL
ORACLE_USER=ciar_user
ORACLE_PASSWORD=password

# JWT
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=480

# Google OAuth
GOOGLE_CLIENT_ID=ton_google_client_id
```

---

### 5.5 — Commandes de développement quotidiennes

```powershell
# Lancer le frontend (depuis frontend/)
npm run dev
# → Disponible sur http://localhost:5173

# Lancer le backend (depuis backend/, venv activé)
uvicorn app.main:app --reload --port 8000
# → API sur http://localhost:8000
# → Swagger UI sur http://localhost:8000/docs

# Lancer Jupyter (depuis backend/ml/, venv activé)
jupyter lab
# → http://localhost:8888
```

---

## 6. ARCHITECTURE DES PAGES

### Routes et accès

| Route | Composant | Accès | Description | Statut |
|---|---|---|---|---|
| `/signup` | `SignUp.jsx` | 🌐 Public | Inscription nouvel utilisateur | ✅ Proto existant |
| `/login` | `Login.jsx` | 🌐 Public | Connexion email/password + Google | 🔲 À faire |
| `/` | `Dashboard.jsx` | 🔒 Protégé | KPIs + résumé activité + graphes | 🔲 À faire |
| `/analyse/:id` | `AnalyseDossier.jsx` | 🔒 Protégé | Analyse ML d'un dossier sinistre | 🔲 À faire |
| `/alertes` | `GestionAlertes.jsx` | 🔒 Protégé | Liste des alertes à traiter | 🔲 À faire |
| `/profil` | `Profil.jsx` | 🔒 Protégé | Profil + paramètres utilisateur | 🔲 À faire |
| `*` | `NotFound.jsx` | 🌐 Public | Page 404 | 🔲 À faire |

### Description détaillée de chaque page

#### 1. `/signup` — Page d'inscription
- Formulaire : Nom, Prénom, Email, Mot de passe, Confirmer MDP, Rôle
- Validation côté client
- Bouton "S'inscrire" + lien vers Login
- Panneau gauche décoratif avec logo CIAR (WavyBackground)
- **Proto existant dans `Ressource PFE/Proto SingUP/`** → s'en inspirer

#### 2. `/login` — Page de connexion
- Formulaire : Email + Mot de passe
- Connexion Google OAuth (bouton "@react-oauth/google")
- Case "Se souvenir de moi"
- Lien "Mot de passe oublié ?" (à implémenter plus tard)
- Même design que SignUp (panneau gauche)

#### 3. `/` — Dashboard principal
- **KPI Cards** : Total dossiers, % suspecté fraude, Dossiers en cours, Alertes actives
- **Graphique évolution** : Fraudes détectées par mois (Recharts LineChart)
- **Graphique répartition** : Pie chart Faible/Moyen/Élevé
- **TableauDossiers récents** : 10 derniers dossiers avec score
- Filtres : période, type sinistre, niveau risque

#### 4. `/analyse/:id` — Analyse d'un dossier
- Infos du dossier (assuré, véhicule, sinistre)
- Bouton **"ANALYSER"** → appelle POST /api/analyser/:id
- **ScoreGauge** : jauge circulaire colorée avec le score
- **FactorList** : liste des facteurs de risque avec poids
- **ShapPlot** : graphique barres SHAP (importance features)
- **ExpertFeedback** : boutons "Confirmer fraude" / "Rejeter / Dossier légitime"

#### 5. `/alertes` — Gestion des alertes
- Liste des alertes classées par score (du plus suspect au moins)
- Filtres : statut (non traité, en cours, validé, rejeté), niveau
- Actions : cliquer → va vers AnalyseDossier
- Badges colorés pour les niveaux de risque

#### 6. `/profil` — Profil utilisateur
- Infos personnelles (modifiables)
- Changement de mot de passe
- Historique de ses validations

---

## 7. PLAN DE DÉVELOPPEMENT PHASE PAR PHASE

> **Rappel des dates :** Stage Février → Juin 2026. Soutenance fin Juin 2026.

---

### 🟡 PHASE 1 — FRONTEND COMPLET (Avril → Mai 2026)

**Objectif : Avoir toutes les pages React fonctionnelles avec données mock**

#### Étape 1.1 — Setup & Base (1-2 jours)
- [ ] Créer le projet Vite (`npm create vite@latest frontend`)
- [ ] Configurer Tailwind CSS v3
- [ ] Créer `globals.css` avec les variables CSS (palette CIAR)
- [ ] Créer `AppRouter.jsx` avec React Router v6
- [ ] Créer `AuthContext.jsx` et `ThemeContext.jsx`
- [ ] Créer les données mock (mockDossiers, mockStats, mockAnalyse)
- [ ] Créer le composant `WavyBackground.jsx`
- [ ] Créer les composants UI atomiques (Button, Input, Card, Badge, Modal, Loader)

#### Étape 1.2 — Pages Auth (2-3 jours)
- [ ] Finaliser `SignUp.jsx` (en s'inspirant du proto existant)
- [ ] Créer `Login.jsx` (même structure que SignUp)
- [ ] Intégrer Google OAuth (bouton + flux)
- [ ] Créer `ProtectedRoute.jsx` (redirect vers /login si non connecté)

#### Étape 1.3 — Layout principal (1-2 jours)
- [ ] Créer `Sidebar.jsx` avec navigation (icônes Lucide + labels)
- [ ] Créer `TopBar.jsx` avec : nom user, DarkModeToggle, bouton déconnexion
- [ ] Créer `AppLayout.jsx` qui wrap Sidebar + TopBar + contenu
- [ ] Implémenter `useDarkMode.js` + `DarkModeToggle.jsx`

#### Étape 1.4 — Dashboard (3-4 jours)
- [ ] Créer `KPICard.jsx` avec animation chiffres
- [ ] Créer `FraudChart.jsx` (LineChart Recharts)
- [ ] Créer `RepartitionChart.jsx` (PieChart Recharts)
- [ ] Créer `RecentDossiersTable.jsx`
- [ ] Assembler `Dashboard.jsx` avec données mock
- [ ] Créer `dashboardService.js` avec pattern MOCK/REAL

#### Étape 1.5 — Analyse Dossier (3-4 jours)
- [ ] Créer `ScoreGauge.jsx` (jauge circulaire SVG animée)
- [ ] Créer `FactorList.jsx`
- [ ] Créer `ShapPlot.jsx` (BarChart horizontal Recharts)
- [ ] Créer `ExpertFeedback.jsx` (boutons validation)
- [ ] Assembler `AnalyseDossier.jsx`
- [ ] Créer `analyseService.js`

#### Étape 1.6 — Alertes + Profil (2-3 jours)
- [ ] Créer `GestionAlertes.jsx` avec filtres
- [ ] Créer `Profil.jsx`
- [ ] Créer `NotFound.jsx`

---

### 🔵 PHASE 2 — BACKEND API (Mai 2026)

**Objectif : API FastAPI fonctionnelle connectée à la DB**

#### Étape 2.1 — Setup FastAPI (1-2 jours)
- [ ] Créer la structure des dossiers backend
- [ ] Configurer `main.py` avec FastAPI + CORS
- [ ] Configurer `database.py` avec SQLAlchemy
- [ ] Créer les modèles SQLAlchemy (user, dossier, alert)
- [ ] Créer les schémas Pydantic

#### Étape 2.2 — Auth JWT (2-3 jours)
- [ ] Endpoint `POST /api/auth/register`
- [ ] Endpoint `POST /api/auth/login`
- [ ] Endpoint `POST /api/auth/google`
- [ ] Middleware JWT (dépendance sur routes protégées)
- [ ] RBAC : rôles expert/admin

#### Étape 2.3 — Endpoints dossiers + dashboard (2-3 jours)
- [ ] `GET /api/dossiers` avec pagination + filtres
- [ ] `GET /api/dossiers/:id`
- [ ] `GET /api/dashboard/stats`
- [ ] `GET /api/dashboard/alertes`

#### Étape 2.4 — Connexion Oracle (2-3 jours)
- [ ] Configurer `cx_Oracle` + DSN Oracle
- [ ] Tester la connexion avec les vraies données CIAR
- [ ] Script d'export Oracle → CSV (`scripts/export_oracle.py`)

---

### 🟣 PHASE 3 — MACHINE LEARNING (Mai → Juin 2026)

**Objectif : Modèle entraîné et intégré dans l'API**

#### Étape 3.1 — Exploration données (Notebook 01, 3-4 jours)
- [ ] Importer les données depuis Oracle/CSV
- [ ] Analyse exploratoire (EDA) : distribution, corrélations, valeurs manquantes
- [ ] Définir le label "Fraude" (colonne target)
- [ ] Visualisations (Matplotlib/Seaborn/Plotly)

#### Étape 3.2 — Feature Engineering (Notebook 02, 3-4 jours)
- [ ] Nettoyage : valeurs manquantes, outliers, encodage catégorielles
- [ ] Features temporelles : délai déclaration, heure sinistre
- [ ] Features comportementales : nb sinistres historique, fréquence
- [ ] Features contextuelles : distance domicile/accident, cohérence lieu
- [ ] Gestion déséquilibre classes (SMOTE si nécessaire)

#### Étape 3.3 — Entraînement modèles (Notebook 03, 4-5 jours)
- [ ] Baseline : Régression Logistique
- [ ] Modèle : Random Forest
- [ ] Modèle : XGBoost (candidat principal)
- [ ] Comparaison : Recall, Précision, F1, AUC-ROC
- [ ] Sauvegarder le meilleur modèle (joblib → `.pkl`)

#### Étape 3.4 — Explicabilité SHAP (Notebook 04, 2-3 jours)
- [ ] Calculer les SHAP values
- [ ] Visualisations SHAP (summary plot, force plot)
- [ ] Créer `explainer.py` qui génère le rapport facteurs

#### Étape 3.5 — Intégration API (2-3 jours)
- [ ] Créer `ml_service.py` qui charge le modèle et prédit
- [ ] Endpoint `POST /api/analyser/:id`
- [ ] Endpoint `GET /api/analyser/:id/history`
- [ ] Endpoint `POST /api/analyser/:id/feedback`

---

### 🟢 PHASE 4 — INTÉGRATION & FINALISATION (Juin 2026)

#### Étape 4.1 — Brancher Frontend ↔ Backend
- [ ] Passer `VITE_USE_MOCK=false` dans `.env`
- [ ] Tester chaque route frontend avec les vrais endpoints
- [ ] Gérer les erreurs (401, 403, 500...) avec des composants Alert

#### Étape 4.2 — Tests & Validation
- [ ] Tests avec les experts CIAR sur des cas réels
- [ ] Ajustements UX selon retours
- [ ] Tests de performance API

#### Étape 4.3 — Documentation & Soutenance
- [ ] Rédiger `docs/API.md` et `docs/ML_METHODOLOGY.md`
- [ ] Rédiger `docs/USER_GUIDE.md`
- [ ] Rédiger le mémoire PFE (plan dans `Plan PFE (1).md`)
- [ ] Préparer la démo finale

---

## 8. ÉTAT ACTUEL DU PROJET

> **À mettre à jour à chaque session de travail**

| Élément | Statut | Notes |
|---|---|---|
| Setup Frontend (Vite + Tailwind) | 🔲 À faire | Commencer par là |
| SignUp.jsx | ⏳ Proto existant | Adapter le proto dans `Proto SingUP/` |
| Login.jsx | 🔲 À faire | — |
| Dashboard.jsx | 🔲 À faire | — |
| AnalyseDossier.jsx | 🔲 À faire | — |
| GestionAlertes.jsx | 🔲 À faire | — |
| Backend FastAPI | 🔲 À faire | Phase 2 |
| Oracle configuration | 🔲 À faire | À faire avec les données CIAR |
| ML Pipeline | 🔲 À faire | Phase 3 |
| Intégration complète | 🔲 À faire | Phase 4 |

---

## 9. OBSERVATIONS ET AJUSTEMENTS À L'ARCHITECTURE

> Après analyse complète des 3 fichiers de ressource, voici mes observations :

### ✅ Ce qui est bien fait dans l'architecture existante
- La séparation frontend/backend/ml est claire et logique
- Le pattern MOCK → REAL avec variable d'env est une excellente idée
- La palette de couleurs est définie et cohérente
- SHAP pour l'explicabilité est le bon choix pour un système d'aide à la décision

### ⚠️ Points à clarifier / ajuster

1. **Score final : 30% règles + 70% ML** — Ce ratio doit être validé avec les experts CIAR. Il peut changer après les tests réels.

2. **Oracle en dev** — Configurer cx_Oracle sur Windows peut être complexe. Je recommande de démarrer avec **PostgreSQL en local** (même schéma), et ne connecter Oracle que quand le backend est stable.

3. **Google OAuth** — Pour l'utiliser, il faut créer un projet sur Google Cloud Console et activer l'API OAuth2. Le client ID doit être configuré dans les deux `.env`.

4. **Isolation Forest** — Mentionné dans l'archi comme "non supervisé" pour les anomalies. À implémenter seulement si les données labellisées sont insuffisantes.

5. **Docker** — Optionnel pour la démonstration finale. Ne pas perdre de temps là-dessus avant d'avoir un système fonctionnel.

6. **AJOUT SUGGÉRÉ — Page Loader** : Un prototype Loader existe dans les ressources. Utiliser un beau loader animé (spinner avec logo CIAR) pendant les appels API ML (qui peuvent prendre plusieurs secondes).

7. **AJOUT SUGGÉRÉ — Page de Gestion Utilisateurs** (Admin seulement) : L'architecture mentionne le rôle Admin mais n'a pas de page dédiée. À ajouter : `/admin/utilisateurs` avec liste, activation/désactivation, changement de rôle.

### 🔧 Ajout de routes suggéré

```
/admin/utilisateurs    → GestionUtilisateurs.jsx    (Admin uniquement)
/dossiers              → ListeDossiers.jsx           (vue liste avec recherche)
```

---

## 10. CONVENTIONS DE NOMMAGE ET STYLE

### Frontend (React)

```
- Composants  : PascalCase       -> MonComposant.jsx
- Hooks       : camelCase        -> useMonHook.js
- Services    : camelCase        -> authService.js
- Constantes  : SCREAMING_SNAKE  -> MAX_RETRY_COUNT
- CSS classes : classes Tailwind ou kebab-case
- Langue      : commentaires en francais, noms de variables en anglais
- Imports     : imports nommes pour les composants UI, default pour les pages
```

### Backend (Python)

```
- Fichiers    : snake_case       -> auth_service.py
- Classes     : PascalCase       -> DossierService
- Fonctions   : snake_case       -> get_dossier_by_id()
- Constantes  : SCREAMING_SNAKE  -> MAX_PAGE_SIZE
- Docstrings  : format Google
- Langue      : commentaires en francais, noms de fonctions en anglais
```

### Git

```
- Branches  : feature/nom-feature | fix/nom-bug | docs/nom-doc
- Commits   : fix: ... | feat: ... | docs: ... | refactor: ...
- .gitignore: node_modules/, venv/, *.pkl, .env, __pycache__/, dist/
```

---

## 11. REGLES PERMANENTES DE CODAGE -- A NE JAMAIS OUBLIER

> Ces regles s'appliquent a TOUT le code genere, modifie ou relu dans ce projet, sans exception.
> Elles ne changent pas avec l'evolution du projet.

---

### REGLE 1 -- PAS D'EMOJIS DANS LE CODE

Aucun emoji dans :
- Les commentaires de code (JS, JSX, Python, CSS)
- Les noms de variables, fonctions, classes
- Les messages de logs ou d'erreur dans le code
- Les docstrings Python
- Les fichiers de configuration (.env, tailwind.config.js, vite.config.js...)

Les emojis sont UNIQUEMENT autorises dans :
- Ce fichier A_MOI.md (document personnel)
- Les fichiers de documentation Markdown (README.md, docs/)
- Les messages de commit Git (avec moderation)

**Exemple incorrect :**
```javascript
// Verification de l'utilisateur
const isLogged = checkAuth();
```

**Exemple correct :**
```javascript
/*
 * Verification de l'etat d'authentification de l'utilisateur.
 * Retourne true si un token JWT valide est present dans le localStorage.
 */
const isLogged = checkAuth();
```

---

### REGLE 2 -- COMMENTAIRES PARTOUT ET BIEN ECRITS

Chaque fichier de code doit avoir un en-tete et des blocs clairement commentes.

**En-tete de fichier (obligatoire) :**
```javascript
/*
 * Fichier      : NomDuFichier.jsx
 * Role         : Description claire du role de ce fichier dans le projet
 * Composant    : NomDuComposant (si applicable)
 * Dependances  : Liste des imports principaux non evidents
 * Auteur       : PFE CIAR -- M2 ISI 2025/2026
 */
```

**Separateurs de blocs logiques (obligatoires) :**
```javascript
/* ============================================================
 * IMPORTS ET DEPENDANCES
 * ============================================================ */

/* ============================================================
 * CONSTANTES ET CONFIGURATION
 * ============================================================ */

/* ============================================================
 * ETAT LOCAL (useState)
 * ============================================================ */

/* ============================================================
 * EFFETS DE BORD (useEffect)
 * ============================================================ */

/* ============================================================
 * FONCTIONS ET HANDLERS
 * ============================================================ */

/* ============================================================
 * RENDU JSX
 * ============================================================ */
```

**Commentaires inline sur les logiques non triviales :**
```javascript
/* Calcul du score final : 30% regles metier + 70% prediction ML */
const scoreFinal = (scoreRegles * 0.3) + (scoreML * 0.7);

/* Au-dela de ce seuil, une alerte est generee automatiquement */
const SEUIL_ALERTE = 0.7;

/* Rediriger vers /login si le token est absent ou expire */
if (!token || isTokenExpired(token)) {
    navigate('/login');
}
```

**Docstrings Python (obligatoires sur toutes les fonctions non triviales) :**
```python
def analyser_dossier(dossier_id: int, db: Session) -> dict:
    """
    Lance l'analyse ML sur un dossier de sinistre.

    Applique dans l'ordre :
    1. La recuperation des donnees depuis la base Oracle
    2. Le pre-traitement et l'ingenierie des caracteristiques
    3. Les regles metier CIAR (30% du score final)
    4. La prediction XGBoost (70% du score final)
    5. Le calcul des valeurs SHAP pour l'explicabilite

    Args:
        dossier_id (int): Identifiant unique du dossier sinistre
        db (Session): Session de base de donnees SQLAlchemy

    Returns:
        dict: {
            'score': float (0.0 a 1.0),
            'niveau': str ('FAIBLE' | 'MOYEN' | 'ELEVE'),
            'resume': str,
            'details': list,
            'shap_values': dict
        }

    Raises:
        DossierNotFoundException: Si le dossier n'existe pas
        MLModelNotLoadedException: Si le modele n'est pas charge
    """
    pass
```

---

### REGLE 3 -- SEPARATION STRICTE FRONTEND / BACKEND

Le projet est divise en deux dossiers totalement independants :

```
Code_AG_PFE/
    frontend/   -> Uniquement du code React / JS / CSS
    backend/    -> Uniquement du code Python (API + ML)
```

Regles de separation :
- Aucune logique metier dans le frontend : il ne fait qu'afficher et appeler l'API
- Le frontend ne sait rien de la base de donnees : il parle uniquement a l'API en JSON
- Le backend ne sait rien du rendu visuel : il renvoie uniquement du JSON structure
- Chaque dossier a son propre `.env`, son propre gestionnaire de dependances (npm vs pip)
- Les variables d'environnement frontend commencent par `VITE_`

**Schema de communication :**
```
Utilisateur
    |
    v
[React Frontend -- Port 5173]
    | HTTP REST JSON
    v
[FastAPI Backend -- Port 8000]
    |              |
    v              v
[Oracle / PG DB]  [ML Engine (XGBoost + SHAP)]
```

---

### REGLE 4 -- UN SEUL DESIGN SYSTEM, APPLIQUE PARTOUT

Tout le frontend suit une seule et meme DA.
Aucune page, aucun composant ne derogera a ces regles :

**Palette de couleurs (immuable) :**
```css
/* Couleurs de base */
--primary-dark:         #0A1931;   /* Fond dark mode, texte principal en light */
--secondary-blue-light: #B3CFE5;   /* Texte clair sur fond sombre */
--secondary-blue-mid:   #4A7FA7;   /* Accents, liens actifs, etats hover */
--secondary-blue-dark:  #1A3D63;   /* Cards et surfaces en dark mode */
--background-light:     #F6FAFD;   /* Fond general en light mode */

/* Couleurs semantiques -- niveaux de risque */
--color-success:  #22C55E;   /* Score faible : dossier legitime */
--color-warning:  #F59E0B;   /* Score moyen  : dossier suspect */
--color-danger:   #EF4444;   /* Score eleve  : fraude probable */
```

**Niveaux de score de fraude :**
```
[0.00 - 0.30]  ->  FAIBLE  ->  #22C55E (vert)   ->  Traitement normal
[0.30 - 0.70]  ->  MOYEN   ->  #F59E0B (orange) ->  Verification recommandee
[0.70 - 1.00]  ->  ELEVE   ->  #EF4444 (rouge)  ->  Alerte urgente
```

**Themes :**
```
Light Mode : bg #F6FAFD | cards #FFFFFF  | texte #0A1931 | bordures rgba(10,25,49,0.1)
Dark Mode  : bg #0A1931 | cards #1A3D63 | texte #F6FAFD | bordures rgba(179,207,229,0.15)
```

**Typographie :**
- Police unique : Inter (Google Fonts)
- Titres       : font-weight 700, letter-spacing tight
- Corps        : font-weight 400, line-height 1.6
- Labels       : font-weight 500, uppercase, letter-spacing wide

---

### REGLE 5 -- STRUCTURE REGULIERE DE CHAQUE FICHIER

Chaque fichier doit etre organise de maniere identique et previsible.
Ne jamais tout mettre en vrac dans un seul bloc sans separation.

**Structure d'un composant React :**
```jsx
/*
 * Fichier     : NomComposant.jsx
 * Role        : Description du composant
 * Auteur      : PFE CIAR
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React, { useState, useEffect } from 'react';

/* ============================================================
 * CONSTANTES DU COMPOSANT
 * ============================================================ */
const VALEUR_PAR_DEFAUT = 'exemple';

/* ============================================================
 * COMPOSANT PRINCIPAL
 * ============================================================ */
const NomComposant = ({ prop1, prop2 }) => {

    /* --- Etat local --- */
    const [valeur, setValeur] = useState(null);

    /* --- Effets de bord --- */
    useEffect(() => {
        /* Chargement des donnees au montage du composant */
    }, []);

    /* --- Fonctions et handlers --- */
    const handleClick = () => {
        /* Traitement du clic utilisateur */
    };

    /* --- Rendu JSX --- */
    return (
        <div>
            {/* Contenu du composant */}
        </div>
    );
};

export default NomComposant;
```

---

### REGLE 6 -- FLEXIBILITE ASSUMEE DU PROJET

Le projet est en cours de developpement. Les elements suivants PEUVENT changer :
- La structure precise des pages et leur contenu detaille
- Certains composants peuvent etre renommes, fusionnes ou supprimes
- La DA peut etre ajustee (couleurs secondaires, animations, layout des pages)
- De nouvelles pages peuvent s'ajouter
- Les endpoints API peuvent evoluer avec les besoins reels de la CIAR
- Le ratio regles/ML (30/70) peut changer apres validation avec les experts

**Ce qui ne change JAMAIS :**
- Les regles 1 a 5 de cette section
- La separation stricte frontend / backend
- La palette de couleurs principale (tokens primaires)
- La logique metier globale : score + SHAP + feedback expert
- Le stack technique retenu : React + FastAPI + Oracle + XGBoost

---

### REGLE 7 -- PERSISTANCE DE L'ARCHITECTURE (GIT)

**Tout dossier vide créé dans l'architecture du projet DOIT contenir un fichier `.gitkeep`.**

Cela garantit que l'organisation des dossiers est préservée lors des push vers le dépôt distant (GitHub/GitLab), car Git ignore par défaut les répertoires ne contenant aucun fichier.

**Action systématique :**
- Dès la création d'un dossier (ex: `src/hooks`, `ml/data/raw`, etc.), si celui-ci est vide, y ajouter un fichier vide nommé `.gitkeep`.

---

## RAPPEL -- DESIGN SYSTEM CIAR (reference rapide)

```css
/* Couleurs principales */
--primary-dark:         #0A1931;   /* Fond dark / Texte principal light */
--secondary-blue-light: #B3CFE5;   /* Texte clair sur fond sombre */
--secondary-blue-mid:   #4A7FA7;   /* Accents, liens, hover */
--secondary-blue-dark:  #1A3D63;   /* Cards en dark mode */
--background-light:     #F6FAFD;   /* Fond light mode */

/* Sémantique — scores de fraude */
--color-success:  #22C55E;  /* Score faible : légitime */
--color-warning:  #F59E0B;  /* Score moyen : suspect */
--color-danger:   #EF4444;  /* Score élevé : fraude probable */
```

```
Niveaux de score de fraude :
  [0.0 - 0.3]  → FAIBLE  → Badge vert    → légitime, traitement normal
  [0.3 - 0.7]  → MOYEN   → Badge orange  → suspect, vérification recommandée
  [0.7 - 1.0]  → ÉLEVÉ   → Badge rouge   → alerte, expertise urgente
```

---

## 4. RÈGLE D'OR : CODE PRÊT POUR LA PRODUCTION (PROD-READY)
> **ULTRA IMPORTANT** : L'application n'est pas uniquement un prototype local. Tout code généré doit être pensé et écrit pour être déployé en production.
> - **Performance** : Les composants doivent être optimisés (limiter les re-renders en React, optimiser les requêtes FastAPI). L'application ne doit ni lagger ni crasher, même sur différents réseaux.
> - **Sécurité** : Les failles classiques doivent être gérées (mots de passe forts exigés, gestion des erreurs silencieuses API, validation stricte des inputs).
> - **Gestion des erreurs** : Prévoir les cas d'échec (timeouts, services indisponibles), ne jamais afficher de stack trace à l'utilisateur final.

---

> 📝 **Ce fichier est vivant.** Je dois le mettre à jour à chaque avancée majeure.
> Dernière mise à jour : Avril 2026 | Auteur : Moi (PFE CIAR M2 ISI)

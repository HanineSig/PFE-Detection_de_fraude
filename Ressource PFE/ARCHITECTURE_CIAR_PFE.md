# 🏗️ ARCHITECTURE COMPLÈTE — CIAR Fraud Detection System
## Projet de Fin d'Études — Master 2 ISI — 2025/2026

---

## 📌 TABLE DES MATIÈRES

1. [Vue d'ensemble du projet](#1-vue-densemble)
2. [Structure des répertoires](#2-structure-des-répertoires)
3. [Architecture Frontend (React)](#3-architecture-frontend)
4. [Architecture Backend (Python)](#4-architecture-backend)
5. [Architecture ML Pipeline](#5-architecture-ml)
6. [Base de données](#6-base-de-données)
7. [Design System & DA](#7-design-system)
8. [API Contract (Mock → Real)](#8-api-contract)
9. [Flux applicatif complet](#9-flux-applicatif)
10. [Roadmap & Planning](#10-roadmap)

---

## 1. VUE D'ENSEMBLE

```
┌─────────────────────────────────────────────────────────────────┐
│                     CIAR FRAUD DETECTION                        │
│                  Système d'Aide à la Décision                   │
└─────────────────────────────────────────────────────────────────┘

          ┌──────────────┐        ┌──────────────────┐
          │   FRONTEND   │◄──────►│    BACKEND API   │
          │   React.js   │  REST  │  FastAPI/Python  │
          │  (Port 3000) │  JSON  │  (Port 8000)     │
          └──────────────┘        └────────┬─────────┘
                                           │
                         ┌─────────────────┼─────────────────┐
                         │                 │                 │
                  ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐
                  │  Oracle DB  │  │  ML Engine  │  │  Auth/JWT   │
                  │ (Sinistres) │  │  scikit /   │  │  Firebase   │
                  │             │  │  XGBoost    │  │  ou local   │
                  └─────────────┘  └─────────────┘  └─────────────┘
```

**Stack technique retenue :**

| Couche | Technologie | Justification |
|---|---|---|
| Frontend | React.js (Vite) | SPA, composants réutilisables, écosystème riche |
| Styling | Tailwind CSS | Utility-first, responsive rapide, dark mode natif |
| Icônes | Lucide React | MIT, cohérent, léger |
| Graphiques | Recharts | Natif React, responsive, customisable |
| Auth Google | @react-oauth/google | Simple, officiel |
| Backend | FastAPI (Python) | Rapide, auto-doc Swagger, idéal pour ML |
| ML | scikit-learn + XGBoost | Standards industrie |
| Explicabilité | SHAP | Interprétabilité des modèles |
| Base de données | Oracle / PostgreSQL | Oracle en prod, PostgreSQL en dev |
| Auth tokens | JWT (PyJWT) | Stateless, sécurisé |

---

## 2. STRUCTURE DES RÉPERTOIRES

```
ciar-fraud-detection/
│
├── 📁 frontend/                          # Application React
│   ├── 📁 public/
│   │   ├── favicon.ico
│   │   ├── logo-ciar.png
│   │   └── index.html
│   │
│   ├── 📁 src/
│   │   │
│   │   ├── 📁 assets/                    # Images, fonts, SVGs statiques
│   │   │   ├── images/
│   │   │   │   ├── bg-left-panel.jpg     # Image décorative panneau gauche
│   │   │   │   └── logo-ciar.svg
│   │   │   └── icons/
│   │   │
│   │   ├── 📁 components/                # Composants réutilisables
│   │   │   ├── 📁 auth/
│   │   │   │   ├── SignUpForm.jsx         # Formulaire inscription
│   │   │   │   ├── LoginForm.jsx          # Formulaire connexion
│   │   │   │   ├── GoogleLoginButton.jsx  # Bouton OAuth Google
│   │   │   │   └── ProtectedRoute.jsx     # Route gardée (JWT)
│   │   │   │
│   │   │   ├── 📁 layout/
│   │   │   │   ├── AppLayout.jsx          # Layout principal avec sidebar
│   │   │   │   ├── Sidebar.jsx            # Navigation latérale
│   │   │   │   ├── TopBar.jsx             # Barre supérieure
│   │   │   │   └── WavyBackground.jsx     # Panneau gauche avec effet vague
│   │   │   │
│   │   │   ├── 📁 ui/                     # Composants UI atomiques
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Badge.jsx              # Badge score (vert/orange/rouge)
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── DarkModeToggle.jsx     # Bouton soleil/lune animé
│   │   │   │   └── Alert.jsx
│   │   │   │
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── KPICard.jsx            # Carte indicateur clé
│   │   │   │   ├── FraudChart.jsx         # Graphique évolution fraudes
│   │   │   │   ├── RepartitionChart.jsx   # Camembert répartition
│   │   │   │   └── RecentDossiersTable.jsx
│   │   │   │
│   │   │   └── 📁 analysis/
│   │   │       ├── ScoreGauge.jsx         # Jauge score suspicion
│   │   │       ├── FactorList.jsx         # Liste facteurs de risque
│   │   │       ├── ShapPlot.jsx           # Affichage graphique SHAP
│   │   │       └── ExpertFeedback.jsx     # Validation expert
│   │   │
│   │   ├── 📁 pages/                      # Pages / Routes
│   │   │   ├── SignUp.jsx                 # Page inscription ✅ (en cours)
│   │   │   ├── Login.jsx                  # Page connexion
│   │   │   ├── Dashboard.jsx              # Page accueil / KPIs
│   │   │   ├── AnalyseDossier.jsx         # Page analyse sinistre
│   │   │   ├── GestionAlertes.jsx         # Page alertes
│   │   │   ├── Profil.jsx                 # Page profil utilisateur
│   │   │   └── NotFound.jsx               # Page 404
│   │   │
│   │   ├── 📁 hooks/                      # Hooks personnalisés
│   │   │   ├── useDarkMode.js             # Gestion thème clair/sombre
│   │   │   ├── useAuth.js                 # État authentification
│   │   │   ├── useDossiers.js             # Données dossiers (avec cache)
│   │   │   └── useAnalyse.js              # Lancer une analyse ML
│   │   │
│   │   ├── 📁 contexts/                   # React Context API
│   │   │   ├── ThemeContext.jsx            # Thème global (dark/light)
│   │   │   └── AuthContext.jsx             # Utilisateur connecté + token
│   │   │
│   │   ├── 📁 services/                   # Couche API (fetch/axios)
│   │   │   ├── api.js                     # Instance axios + intercepteurs
│   │   │   ├── authService.js             # Login, signup, Google, logout
│   │   │   ├── dossiersService.js         # CRUD dossiers
│   │   │   ├── analyseService.js          # POST /analyser/{id}
│   │   │   ├── dashboardService.js        # GET /dashboard/stats
│   │   │   └── mockData/                  # 🔴 MOCK — à remplacer par vrai API
│   │   │       ├── mockDossiers.js
│   │   │       ├── mockStats.js
│   │   │       └── mockAnalyse.js
│   │   │
│   │   ├── 📁 router/
│   │   │   └── AppRouter.jsx              # Routes React Router v6
│   │   │
│   │   ├── 📁 styles/
│   │   │   ├── globals.css                # Variables CSS + reset
│   │   │   └── animations.css             # Keyframes globaux
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── formatters.js              # Formatage dates, scores, devises
│   │   │   ├── validators.js              # Validation formulaires
│   │   │   └── constants.js               # Constantes globales
│   │   │
│   │   ├── App.jsx                        # Composant racine
│   │   └── main.jsx                       # Point d'entrée Vite
│   │
│   ├── .env.example                       # Variables d'environnement
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── 📁 backend/                            # API FastAPI Python
│   ├── 📁 app/
│   │   ├── 📁 api/
│   │   │   ├── 📁 routes/
│   │   │   │   ├── auth.py                # POST /auth/login, /auth/register
│   │   │   │   ├── dossiers.py            # GET /dossiers, GET /dossiers/{id}
│   │   │   │   ├── analyse.py             # POST /analyser/{id}
│   │   │   │   └── dashboard.py           # GET /dashboard/stats
│   │   │   └── __init__.py
│   │   │
│   │   ├── 📁 core/
│   │   │   ├── config.py                  # Settings, env vars
│   │   │   ├── security.py                # JWT encode/decode
│   │   │   └── database.py               # Connexion Oracle/PostgreSQL
│   │   │
│   │   ├── 📁 models/
│   │   │   ├── user.py                    # Modèle SQLAlchemy User
│   │   │   ├── dossier.py                 # Modèle Dossier/Sinistre
│   │   │   └── alert.py                   # Modèle Alerte
│   │   │
│   │   ├── 📁 schemas/                    # Pydantic schemas
│   │   │   ├── auth.py                    # LoginRequest, TokenResponse
│   │   │   ├── dossier.py                 # DossierResponse, DossierList
│   │   │   └── analyse.py                 # AnalyseResponse (score, details)
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── auth_service.py
│   │   │   ├── dossier_service.py
│   │   │   └── ml_service.py              # Appelle le moteur ML
│   │   │
│   │   └── main.py                        # Point d'entrée FastAPI
│   │
│   ├── 📁 ml/                             # Moteur Machine Learning
│   │   ├── 📁 data/
│   │   │   ├── raw/                       # Données brutes Oracle
│   │   │   ├── processed/                 # Données nettoyées
│   │   │   └── features/                  # Features engineerées
│   │   │
│   │   ├── 📁 notebooks/                  # Jupyter — exploration & entraînement
│   │   │   ├── 01_exploration.ipynb
│   │   │   ├── 02_feature_engineering.ipynb
│   │   │   ├── 03_model_training.ipynb
│   │   │   └── 04_shap_explainability.ipynb
│   │   │
│   │   ├── 📁 models/                     # Modèles sérialisés
│   │   │   ├── xgboost_fraud_v1.pkl
│   │   │   ├── random_forest_v1.pkl
│   │   │   └── scaler.pkl
│   │   │
│   │   ├── 📁 src/
│   │   │   ├── preprocessor.py            # Nettoyage + transformation
│   │   │   ├── feature_engineering.py     # Création variables
│   │   │   ├── business_rules.py          # Règles métier CIAR
│   │   │   ├── trainer.py                 # Entraînement modèles
│   │   │   ├── predictor.py               # Prédiction + score final
│   │   │   └── explainer.py              # SHAP values + rapport
│   │   │
│   │   └── requirements_ml.txt
│   │
│   ├── .env.example
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📁 docs/                               # Documentation
│   ├── ARCHITECTURE.md                    # Ce fichier
│   ├── API.md                             # Documentation API endpoints
│   ├── ML_METHODOLOGY.md                  # Choix algorithmes, métriques
│   └── USER_GUIDE.md                      # Guide utilisateur expert
│
├── 📁 scripts/                            # Scripts utilitaires
│   ├── seed_db.py                         # Peupler la DB avec données test
│   └── export_oracle.py                   # Export données Oracle → CSV
│
├── docker-compose.yml                     # Stack complète (dev)
├── .gitignore
└── README.md
```

---

## 3. ARCHITECTURE FRONTEND

### Pages & Routes

| Route | Composant | Accès | Description |
|---|---|---|---|
| `/signup` | `SignUp.jsx` | Public | Inscription nouvel utilisateur |
| `/login` | `Login.jsx` | Public | Connexion |
| `/` | `Dashboard.jsx` | Protégé | KPIs + résumé activité |
| `/analyse/:id` | `AnalyseDossier.jsx` | Protégé | Analyse ML d'un dossier |
| `/alertes` | `GestionAlertes.jsx` | Protégé | Liste alertes à traiter |
| `/profil` | `Profil.jsx` | Protégé | Profil utilisateur |
| `*` | `NotFound.jsx` | Public | 404 |

### State Management

```
┌─────────────────────────────────────────────────────┐
│                   STATE ARCHITECTURE                │
│                                                     │
│  AuthContext  ──►  user, token, role, isLogged      │
│  ThemeContext ──►  theme (dark | light)             │
│                                                     │
│  Local State  ──►  form data, UI state, loading     │
│  Custom Hooks ──►  data fetching + caching          │
└─────────────────────────────────────────────────────┘
```

### Variables d'environnement Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_APP_NAME=CIAR Fraud Detection
VITE_APP_VERSION=1.0.0
```

---

## 4. ARCHITECTURE BACKEND

### Endpoints API

```
AUTH
  POST   /api/auth/login          → { token, role, user }
  POST   /api/auth/register       → { success, message }
  POST   /api/auth/google         → { token, role, user }
  POST   /api/auth/logout         → { success }

DOSSIERS
  GET    /api/dossiers            → { data[], total, page }
  GET    /api/dossiers/:id        → { dossier, historique }
  GET    /api/dossiers/search     → { results[] }

ANALYSE
  POST   /api/analyser/:id        → { score, niveau, resume, details, shap }
  GET    /api/analyser/:id/history → { analyses[] }
  POST   /api/analyser/:id/feedback → { success }

DASHBOARD
  GET    /api/dashboard/stats     → { total, pct_risque, evolution, repartition }
  GET    /api/dashboard/alertes   → { alertes[], count }
```

### Sécurité

```python
# Middleware JWT sur toutes les routes protégées
# RBAC : role "expert" | "admin"
# Expert : peut analyser, valider alertes
# Admin  : peut tout + gérer utilisateurs + voir logs
```

---

## 5. ARCHITECTURE ML

### Pipeline de traitement

```
[Données Oracle]
      │
      ▼
[1. EXTRACTION]  → export_oracle.py  → CSV brut
      │
      ▼
[2. NETTOYAGE]   → preprocessor.py  → valeurs manquantes, outliers, types
      │
      ▼
[3. FEATURES]    → feature_engineering.py
      │           → délai_déclaration, nb_sinistres_assuré, 
      │             distance_domicile_accident, score_historique...
      ▼
[4. RÈGLES MÉTIER] → business_rules.py
      │              → flags binaires (retard > 7j, incohérence lieu...)
      ▼
[5. MODÈLE ML]   → XGBoost / Random Forest
      │           → prédiction probabilité fraude [0,1]
      ▼
[6. SCORE FINAL] → combinaison règles (30%) + ML (70%)
      │
      ▼
[7. EXPLICABILITÉ] → SHAP values → rapport facteurs
      │
      ▼
[API Response]   → { score, niveau, resume, details, shap_plot }
```

### Modèles à comparer

| Modèle | Avantage | Usage |
|---|---|---|
| Logistic Regression | Baseline, interprétable | Référence |
| Random Forest | Robuste, peu d'overfitting | Candidat principal |
| XGBoost | Très performant, rapide | Candidat principal |
| Isolation Forest | Non supervisé (anomalies) | Complément |

### Métriques d'évaluation

```
- Recall (prioritaire) : minimiser les fraudes non détectées
- Précision : minimiser les faux positifs (ne pas pénaliser innocents)
- F1-Score : équilibre
- AUC-ROC : performance globale
- Matrice de confusion
```

---

## 6. BASE DE DONNÉES

### Tables principales

```sql
-- Utilisateurs
users (id, nom, prenom, email, password_hash, role, created_at, active)

-- Sinistres / Dossiers
sinistres (id_dossier, num_police, date_sinistre, date_declaration,
           lieu_sinistre, type_sinistre, montant_declare,
           id_assure, id_vehicule, statut, created_at)

-- Assurés
assures (id, nom, prenom, date_naissance, adresse, nb_sinistres_historique)

-- Véhicules
vehicules (id, immatriculation, marque, modele, annee, valeur_assurance)

-- Analyses ML
analyses (id, id_dossier, score_fraude, niveau_risque, resume,
          details_json, shap_data, analyst_id, created_at)

-- Alertes
alertes (id, id_dossier, id_analyse, statut, feedback_expert,
         commentaire, validated_by, validated_at)

-- Logs
audit_logs (id, user_id, action, entity_type, entity_id, timestamp)
```

---

## 7. DESIGN SYSTEM & DA

### Palette de couleurs (stricte)

```css
/* Primitive tokens */
--primary-dark:         #0A1931;   /* Fond dark mode */
--secondary-blue-light: #B3CFE5;   /* Texte clair sur fond sombre */
--secondary-blue-mid:   #4A7FA7;   /* Accents, liens */
--secondary-blue-dark:  #1A3D63;   /* Cards dark mode */
--background-light:     #F6FAFD;   /* Fond light mode */

/* Semantic tokens */
--color-success:        #22C55E;   /* Scores bas, validé */
--color-warning:        #F59E0B;   /* Scores moyens, suspect */
--color-danger:         #EF4444;   /* Scores hauts, fraude */
--color-text-dark:      #0A1931;
--color-text-light:     #F6FAFD;
```

### Typographie

```css
/* Font principale : Inter (Google Fonts) */
/* Titre : font-weight 700, tracking tight */
/* Corps : font-weight 400, line-height 1.6 */
/* Labels : font-weight 500, uppercase, tracking wide */
```

### Thème dark/light

```
Light Mode:
  bg: #F6FAFD
  cards: #FFFFFF
  text: #0A1931
  borders: rgba(10,25,49,0.1)

Dark Mode:
  bg: #0A1931
  cards: #1A3D63
  text: #F6FAFD
  borders: rgba(179,207,229,0.15)
```

### Composants visuels récurrents

| Composant | Description |
|---|---|
| `WavyBackground` | Panneau gauche avec clip-path SVG vague |
| `ScoreGauge` | Jauge circulaire colorée (vert/orange/rouge) |
| `KPICard` | Carte avec icône, valeur, tendance |
| `DarkModeToggle` | Bouton soleil↔lune animé |
| `FraudBadge` | Badge coloré niveau risque |

---

## 8. API CONTRACT (MOCK → REAL)

### Pattern de service (exemple authService.js)

```javascript
// services/authService.js
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const signUp = async (data) => {
  if (USE_MOCK) {
    // 🔴 MOCK — Remplacer par appel réel quand backend prêt
    return mockSignUp(data);
  }
  const res = await api.post('/auth/register', data);
  return res.data;
};
```

Variables `.env` de contrôle :
```env
VITE_USE_MOCK=true          # true = données fictives, false = vrai backend
VITE_API_URL=http://localhost:8000/api
```

---

## 9. FLUX APPLICATIF COMPLET

```
Utilisateur
    │
    ▼
[Sign Up / Login]
    │ JWT Token
    ▼
[Dashboard] ──── KPIs (GET /dashboard/stats)
    │              Derniers dossiers (GET /dossiers)
    │
    ▼ (clic dossier)
[Analyse Dossier] ──── Infos dossier (GET /dossiers/:id)
    │
    ▼ (clic ANALYSER)
[POST /analyser/:id]
    │
    ├──► Backend reçoit la demande
    │         │
    │         ▼
    │    [ML Pipeline]
    │    1. Récupère données dossier (Oracle)
    │    2. Applique règles métier
    │    3. Prédit avec XGBoost
    │    4. Calcule SHAP values
    │    5. Compose réponse JSON
    │
    ▼ Résultat (score, facteurs, SHAP)
[Rapport Expert]
    │
    ▼ (feedback)
[POST /analyser/:id/feedback]
    │ améliore le modèle (reinforcement)
    ▼
[Alerte mise à jour]
```

---

## 10. ROADMAP & PLANNING

### Phase 1 — Frontend (Février - Mars 2026)

```
Semaine 1-2 :
  ✅ Page Sign Up (en cours)
  □ Page Login
  □ Structure projet + router + contexts

Semaine 3-4 :
  □ Dashboard principal + KPIs (mock data)
  □ Table dossiers + filtres
  □ Design system complet

Semaine 5-6 :
  □ Page Analyse Dossier
  □ Score gauge + rapport facteurs
  □ Page Gestion Alertes
```

### Phase 2 — Backend & ML (Mars - Avril 2026)

```
Semaine 7-8 :
  □ Setup FastAPI + auth JWT
  □ Connexion Oracle
  □ Endpoints dossiers

Semaine 9-10 :
  □ Exploration données (Jupyter)
  □ Feature engineering
  □ Entraînement modèles

Semaine 11-12 :
  □ Intégration SHAP
  □ Endpoint /analyser
  □ Connexion Frontend ↔ Backend
```

### Phase 3 — Validation & Soutenance (Mai - Juin 2026)

```
Semaine 13-14 :
  □ Tests avec experts CIAR
  □ Ajustements UX
  □ Documentation technique

Semaine 15-16 :
  □ Rapport PFE
  □ Guide utilisateur
  □ Préparation soutenance
  □ Démo finale
```

---

## 📋 CONVENTIONS DE CODE

### Frontend (React)

```
- Composants : PascalCase (MonComposant.jsx)
- Hooks : camelCase + préfixe "use" (useMonHook.js)
- Services : camelCase + suffixe "Service" (authService.js)
- Constantes : SCREAMING_SNAKE_CASE
- CSS classes : kebab-case ou Tailwind utilities
- Commentaires : français (cohérent avec le projet)
```

### Backend (Python)

```
- Fichiers : snake_case
- Classes : PascalCase
- Fonctions/variables : snake_case
- Constantes : SCREAMING_SNAKE_CASE
- Docstrings : format Google
- Commentaires : français
```

---

> 📝 **Ce document est vivant** — à mettre à jour à chaque décision technique majeure.
> Version : 1.0 | Date : Février 2026 | Auteur : Équipe PFE CIAR

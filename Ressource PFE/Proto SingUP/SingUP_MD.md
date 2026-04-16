# PROJET PFE – DASHBOARD DÉTECTION FRAUDE (CIAR)
## INSTRUCTION SPÉCIFIQUE – PAGE D’INSCRIPTION (SIGN UP)

> Ce prompt s’appuie sur le fichier de contexte général fourni précédemment.  
> Il concerne exclusivement la réalisation de la **page d’inscription (Sign Up)**.

---

## 1. OBJECTIF DE LA PAGE
Créer une page **Sign Up** professionnelle, épurée et légèrement fun, conforme aux wireframes fournis (images `.png` / `.jfif`), intégrant :
- Un **dark mode** (icône soleil/lune avec animation)
- Une **connexion Google fonctionnelle**
- Un **design responsif** (web + mobile)
- Une **ambiance visuelle** en lien avec la détection de fraude / assurance / data (image de fond à gauche, effets de vagues/bulles)

---

## 2. ÉLÉMENTS VISUELS OBLIGATOIRES (basés sur vos fichiers)

### 2.1. Disposition générale (wireframe)
- **Colonne gauche** (environ 40% de largeur sur desktop) :
  - Image de fond décorative (thème : données, assurance, détection, technologie)
  - Effet visuel : **vague + bulbes (bulbous/wavy)** sur les bords
  - Couleur dominante : sombre ou dégradé depuis la palette
- **Colonne droite** (environ 60% de largeur) :
  - Formulaire d’inscription
  - Champs :
    - **Nom** (text)
    - **Prénom** (text)
    - **Adresse email** (email)
    - **Mot de passe** (password)
    - **Confirmation mot de passe** (password)
  - Bouton vert : **« Créer le compte »**
  - Lien/bouton en bas à droite : **« Se connecter »** → redirige vers login

### 2.2. Éléments supplémentaires visibles sur vos croquis
- **Bouton rouge en haut à droite** → devient **icône soleil/lune pour dark mode** (avec animation)
- **Bouton bleu en bas** (dans la zone formulaire ou sous celui-ci) → **« Se connecter avec Google »** (fonctionnel)

---

## 3. PALETTE DE COULEURS (à utiliser strictement)

```css
--primary-dark: #0A1931;
--secondary-blue-light: #B3CFE5;
--secondary-blue-mid: #4A7FA7;
--secondary-blue-dark: #1A3D63;
--background-light: #F6FAFD;
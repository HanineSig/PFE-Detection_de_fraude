# Plan de Développement - Composants Sign Up / OTP (Prompt 1)

Ce document décrit le plan d'action séquentiel et immuable pour développer le système de SignUp complet, sécurisé (production-ready) et visuellement irréprochable.

## 1. STRATÉGIE BACKEND (Moteur Auth & Mail)
Conformément aux instructions "Prod-Ready" :
1. **Implémentation de `pending_users`** :
   - Modèle SQLAlchemy pour stocker temporairement les inscriptions (valides 15 minutes).
2. **Implémentation de fastapi-mail** :
   - Configuration asynchrone pour ne pas ralentir l'application FastAPI.
   - Design du template HTML du mail avec l'esthétique de CIAR (Alerte OTP propre).
3. **Logique des Endpoints** :
   - `POST /register` : Valide les Input de force via Pydantic (mdp : 8 car, 1 Maj, 1 Spécial), crée le `pending_users`, envoie le mail OTP.
   - `POST /verify-otp` : Vérifie le code. Si match, transfère vers l'authentique table `users`, supprime le `pending_user`, signe et renvoie le JWT.

## 2. STRATÉGIE FRONTEND (Design UI & Expérience Utilisateur)
La page SignUp doit susciter l'effet **WOW** :
1. **Structure CSS/Layout** :
   - Côté droit : Formulaire épuré, aux angles arrondis (`rounded-2xl` etc.), incluant le toggle "Mot de Passe" (icône 👁️).
   - "Créer mon compte" : Utilisation des bleus CIAR ou d'un style primaire épuré, mais **aucun bouton vert** (interdiction levée uniquement ici, remplacement par du `primary-dark` ou `secondary-blue-mid`).
   - Bouton de connexion invisible Google : Rond, ombré (`shadow-sm`, hover effect, avec SVG pur du 'G').
   - Bas droite : Bouton discret "Se connecter" au lieu d'un lien standard.
2. **Vague Modifiée & Animation ("Wow effect")** :
   - Modification de `WavyBackground` ou création d'une version locale `SignUpBackground`. L'image de fond doit légèrement **déborder** du masque en SVG. Je vais intégrer un système de calques asymétriques pour recréer l'effet "out-of-bound".
   - Bouton Dark Mode : Toggle Lune/Soleil fonctionnel (il utilisera les outils créés précédemment, placé harmonieusement).
3. **Intégration UX / Validation** :
   - Les inputs doivent réagir en direct (Couleur rouge si mot de passe trop faible, vert si respect des critères dès la saisie).
   - Une fois `Créer mon compte` pressé : **Transition animée** du formulaire vers l'écran de saisie OTP.

## 3. VALIDATION DE L'EXÉCUTION
Avant toute conclusion :
- Tester le dépassement graphique (l'image de gauche) en redimensionnant l'écran.
- Tester l'apparition claire de la lune et de la transition soleil.
- Vérifier qu'aucun crash n'a lieu lors de l'envoi d'e-mail (fallback sur terminal si pas de credentials SMTP).

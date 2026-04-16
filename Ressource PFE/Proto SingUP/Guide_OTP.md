# Guide d'Intégration OTP avec SMTP (Mailjet)
*Ce guide explique de bout en bout comment configurer et utiliser le système d'envoi d'emails OTP pour notre application en production (CIAR Fraud Detection).*

## 1. Choix du service d'envoi (SMTP)
Pour que notre backend FastAPI puisse envoyer des emails fiablement sans atterrir dans les spams, nous utiliserons un service transactionnel.
**Mailjet** est un excellent choix car il offre un tier gratuit généreux (200 emails / jour) parfait pour le PFE et la mise en production.

### Alternative
- **SendGrid** ou **Brevo (Sendinblue)** offrent des services similaires, mais Mailjet est particulièrement simple à configurer avec `smtplib` ou `fastapi-mail`.

## 2. Configuration côté Hébergeur (Récupérer les identifiants)
Afin de configurer l'envoi d'emails, suivez ces étapes :

1. **Création du compte** : Allez sur [Mailjet.com](https://www.mailjet.com/) et créez un compte.
2. **Validation de l'email expéditeur** : Vous devrez configurer une adresse d'envoi (ex: `no-reply-ciar@votre-domaine.com` ou une adresse Gmail standard vérifiée par Mailjet). Mailjet vous enverra un email pour prouver que vous possédez cette adresse. Seule cette adresse pourra envoyer les OTP.
3. **Récupération des clés SMTP** :
   - Allez dans **Preferences > Paramètres SMTP et SEND API**.
   - Vous y trouverez le **host** HTTP (ex: `in-v3.mailjet.com`).
   - Le **Port** (généralement `587` pour TLS).
   - Créez une nouvelle clé API. Vous obtiendrez :
     - **API Key** (À utiliser comme Nom d'utilisateur/Username SMTP).
     - **Secret Key** (À utiliser comme Mot de passe SMTP).

## 3. Configuration dans notre application Backend
Dans le backend de l'application (le fichier `.env` que nous avons créé), nous allons injecter les variables fournies par Mailjet :

```env
# Paramètres réels SMTP (Exemple Mailjet)
SMTP_HOST=in-v3.mailjet.com
SMTP_PORT=587
SMTP_USER=votre_api_key_ici
SMTP_PASSWORD=votre_secret_key_ici

# L'email validé lors de l'étape 2
MAIL_FROM=votre.email.verifie@gmail.com
MAIL_FROM_NAME="CIAR Securite"
```

## 4. Architecture de la solution dans le Code
L'envoi des emails sera géré par la librairie asynchrone `fastapi-mail` qui est extrêmement performante en production (elle n'interrompt ni ne ralentit les requêtes des utilisateurs).

### Le Workflow de création de compte :
1. L'utilisateur remplit le Frontend.
2. Le Backend reçoit la requête (`/auth/register`).
3. Le Backend insère l'utilisateur dans une nouvelle table **`pending_users`** (et non directement dans `users`).
   *Pourquoi ? Cela évite de polluer la base de données propre avec de fausses adresses. Ces données ont une durée de vie de 15 minutes.*
4. Le Backend génère un code OTP (ex: `482 194`), le stocke, et délègue à `fastapi-mail` l'envoi d'un email formaté et "Design" à l'aide d'un template HTML inclut dans le dossier `app/services/mail/templates/`.
5. L'utilisateur reçoit l'email, et entre le code sur la modale du frontend.
6. Le Frontend envoie la requête (`/auth/verify-otp`).
7. Si l'OTP est correct, on **déplace** l'utilisateur de `pending_users` vers la grande table `users`, on certifie son token, et on lui donne accès à l'application. La ligne temporaire dans `pending_users` est supprimée.

> **Avantage PROD** : Aucune donnée polluante, aucun duplicate email valide, un système qui respire le professionnalisme.

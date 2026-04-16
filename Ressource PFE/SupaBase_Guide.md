# Guide Complet : Configuration Rapide avec Supabase
*Ce guide explique comment utiliser Supabase (un PostgreSQL dans le cloud) pour éviter l'installation locale complexe et accélérer le développement.*

---

## ☁️ Étape 1 : Créer le projet Supabase

1. **S'inscrire / Se connecter** : Rendez-vous sur [Supabase.com](https://supabase.com/) et connectez-vous (vous pouvez utiliser votre compte GitHub pour aller plus vite).
2. **Nouveau Projet** : 
   - Cliquez sur le bouton vert **"New Project"**.
   - Choisissez l'organisation par défaut.
   - **Name** : `CIAR Fraud Detection` (ou le nom de votre choix).
   - **Database Password** : Mettez un mot de passe sécurisé et **COPIEZ-LE**. Ne le perdez pas, vous en aurez besoin juste après et Supabase ne vous l'affichera plus jamais !
   - **Region** : Choisissez la zone la plus proche (ex: *Frankfurt* ou *Paris*).
3. Cliquez sur **Create new project**. Le serveur va mettre environ 1 à 2 minutes pour s'initialiser. Attendez que le tableau de bord principal s'affiche.

---

## 🔗 Étape 2 : Récupérer la clé de connexion

Une fois que votre tableau de bord est prêt, il faut lier cette base à notre code Python :

1. Dans le menu de gauche de Supabase, descendez et cliquez sur l'engrenage **"Project Settings"**.
2. Dans le sous-menu, cliquez sur **"Database"**.
3. Descendez jusqu'à la section **"Connection String"** et assurez-vous d'être sur l'onglet **URI**.
4. Vous allez voir un lien qui ressemble à ça :
   `postgresql://postgres.votre_id:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres`
5. **Copiez ce lien**.

---

## ⚙️ Étape 3 : Configurer le projet en local

1. Ouvrez le fichier `.env` qui se trouve dans le dossier `backend` de notre projet de code.
2. Trouvez cette variable :
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ciar_fraud_db"
   ```
3. Effacez le lien entre les guillemets et **collez le lien de Supabase**.
4. ⚠️ **TRÈS IMPORTANT** : Dans le lien que vous venez de coller, remplacez manuellement le morceau `[YOUR-PASSWORD]` par le vrai mot de passe que vous avez choisi à l'étape 1. Ne laissez pas les crochets `[ ]`.

*Exemple du résultat final attendu dans le .env :*
`DATABASE_URL="postgresql://postgres.xxx:MonMotDePasseSecret123@aws-0-eu-central-1.../postgres"`

---

## 🚀 Étape 4 : La Magie de FastAPI

Il n'y a plus rien à faire sur l'interface Supabase ! Notre code s'occupe du reste.

1. Allez dans votre terminal backend.
2. Relancez le serveur :
   ```powershell
   uvicorn app.main:app --reload
   ```
3. **Que va-t-il se passer ?**
   FastAPI va se connecter instantanément à votre serveur Supabase en Allemagne/France. Il va constater que la base est vide, et grâce à SQLAlchemy, **il va y créer automatiquement toutes nos tables professionnelles** (`users`, `pending_users`, etc.).
   
Vous pourrez vérifier en allant sur le site de Supabase, dans le menu *Table Editor* situé à gauche : vos tables apparaîtront par magie quelques secondes après l'exécution de la commande !

L'application locale est désormais prête à être testée de bout en bout !

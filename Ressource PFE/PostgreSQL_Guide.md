# Guide Complet : Installation et Configuration de PostgreSQL
*Ce guide explique étape par étape comment installer le vrai serveur de base de données PostgreSQL sur Windows, afin de recréer l'environnement de production en local.*

---

## 🛠️ Étape 1 : Téléchargement et Installation de PostgreSQL

1. **Aller sur le site officiel** : Rendez-vous sur la page de téléchargement Windows :
   [https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. **Choisir la version** : Téléchargez la dernière version stable pour Windows (ex: version 16 ou 17).
3. **Lancer l'installateur** :
   - Laissez les dossiers d'installation par défaut.
   - **Composants** : Assurez-vous que "PostgreSQL Server", "pgAdmin 4" et "Command Line Tools" sont bien cochés.
4. **⚠️ TRÈS IMPORTANT - Le Mot de Passe** : 
   - L'installateur va vous demander de créer un mot de passe pour le super-utilisateur "postgres".
   - Pour correspondre à notre code actuel, entrez le mot de passe : `postgres` (en minuscules). Si vous en mettez un autre, vous devrez modifier le fichier `.env` du backend.
5. **Port par défaut** : Laissez le port sur `5432`.
6. Terminez l'installation (décochez Stack Builder à la fin, vous n'en avez pas besoin).

---

## 🗄️ Étape 2 : Création de la Base de Données `ciar_fraud_db`

Maintenant que le serveur tourne sur votre ordinateur, nous devons créer le "réceptacle" (la base de données vide) qui accueillera nos tables.

1. Appuyez sur la touche Windows de votre clavier, cherchez **pgAdmin 4** et lancez-le.
2. pgAdmin est l'interface visuelle (dans le navigateur ou logiciel) pour gérer PostgreSQL. Il vous demandera peut-être de définir un Master Password, choisissez ce que vous voulez.
3. Dans la colonne de gauche, déroulez l'arbre : **Servers > PostgreSQL 16** (ou votre version).
4. Il vous demandera le mot de passe créé à l'installation (rappelez-vous : `postgres`).
5. Faites un **Clic-Droit sur "Databases"** > **Create** > **Database...**
6. Dans la fenêtre qui s'ouvre :
   - **Database** (nom) : Tapez **`ciar_fraud_db`** (C'EST TRÈS IMPORTANT, notre code cherche ce nom exact).
   - Owner : Laissez `postgres`.
7. Cliquez sur **Save**.
   
*C'est bon ! Votre serveur est prêt et votre base de données est créée !*

---

## 🔌 Étape 3 : Liaison avec le Backend FastAPI

1. Assurez-vous que le fichier `.env` dans votre dossier `backend` possède bien cette ligne (exactement comme ça) :
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ciar_fraud_db"
   ```
   *Anatomie du lien : `postgresql://[utilisateur]:[mot_de_passe]@[hote]:[port]/[nom_base]`*

2. **C'est fini !** Lorsque vous allez relancer le backend Python :
   ```powershell
   .\venv\Scripts\Activate.ps1
   uvicorn app.main:app --reload
   ```
   FastAPI va détecter que Uvicorn démarre, se connecter via SQLAlchemy au port 5432, trouver `ciar_fraud_db`, vérifier si les tables (`users`, `pending_users`, etc.) existent, et **s'il ne les trouve pas, il les créera automatiquement de façon propre et structurée**.

---

## 💡 Notes de Résolution de Problèmes

- **Message d'erreur "Connection refused"** : Votre serveur PostgreSQL ne tourne pas (vous pouvez chercher "Services" sous Windows et vérifier que *postgresql* est En cours d'exécution), ou le mot de passe du fichier `.env` est faux.
- **Message d'erreur "Database ciar_fraud_db does not exist"** : Vous avez oublié de faire l'étape 2 sur pgAdmin, ou fait une faute de frappe dans le nom.

Avec cette configuration, vous avez un environnement de test local **100% Prod-Ready**, capable d'encaisser le système JWT, le OTP et surtout les modèles lourds d'analyses des fraudes !

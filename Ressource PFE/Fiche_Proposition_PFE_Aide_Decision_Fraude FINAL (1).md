



## RÉPUBLIQUE ALGÉRIENNE DÉMOCRATIQUE ET POPULAIRE
## MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR ET DE LA RECHERCHE SCIENTIFIQUE

## FICHE DE PROPOSITION DE SUJET
## PROJET DE FIN D'ÉTUDES
## MASTER 2 INGÉNIERIE DES SYSTÈMES D'INFORMATION

Organisme d'accueil Compagnie d'Assurance CIAR
Secteur d'activité Assurance et Réassurance
Encadrant professionnel M. A. LOUNIS
Durée du stage 4 mois (Février - Juin 2026)
Date de proposition Février 2026

## Année Universitaire 2025-2026



## 1. INTITULÉ DU PROJET
Système d'Aide à la Décision pour la Détection de Fraude à l'Assurance basé
sur le Machine Learning
## 2. CONTEXTE ET JUSTIFICATION DU PROJET
2.1. Contexte général
Le secteur de l'assurance en Algérie connaît une croissance continue mais demeure confronté à un
défi  majeur  :  la  fraude  à  l'assurance.  Ce  phénomène  représente  une  part  significative  des  pertes
financières des compagnies d'assurance et affecte directement la viabilité économique du secteur.
La fraude peut prendre diverses formes, notamment la déclaration de sinistres fictifs, l'exagération
des dommages, ou encore la manipulation des circonstances d'un accident.
2.2. Problématique identifiée
À  la  CIAR,  comme  dans  la  majorité  des  compagnies  d'assurance,  le  processus  de  détection  des
fraudes repose essentiellement sur l'expertise humaine et des contrôles manuels aléatoires. Cette
approche traditionnelle présente plusieurs limites :
- La détection manuelle est un processus long et coûteux en ressources humaines
- Le nombre limité d'experts ne permet pas d'analyser tous les dossiers de manière
approfondie
- Les fraudeurs développent des techniques de plus en plus sophistiquées difficiles à
détecter
- L'absence d'historique structuré empêche l'identification de patterns récurrents
- Le délai de détection peut atteindre plusieurs semaines, augmentant les pertes financières
2.3. Justification du recours au Machine Learning
L'Intelligence  Artificielle,  et  plus  particulièrement  le  Machine  Learning,  offre  des  possibilités
prometteuses  pour  assister  les  experts  dans  la  détection  de  fraude.  Ces  technologies  permettent
d'analyser  de  grands  volumes  de  données,  d'identifier  des  patterns  complexes  et  de  signaler
automatiquement les dossiers présentant des caractéristiques suspectes. Il est important de préciser
que l'objectif n'est pas de remplacer l'expertise humaine, mais de fournir aux experts un outil d'aide
à la décision leur permettant de prioriser leur analyse sur les dossiers les plus suspects et de prendre
des décisions plus éclairées.
## 3. PROBLÉMATIQUE DE RECHERCHE
Comment concevoir et développer un système d'aide à la décision intelligent, capable d'analyser
les déclarations de sinistres et d'identifier les dossiers potentiellement frauduleux en combinant

règles métier et algorithmes de Machine Learning, tout en garantissant l'explicabilité des résultats
pour permettre aux experts d'intervenir de manière éclairée et responsable ?
## 4. OBJECTIFS DU PROJET
4.1. Objectif général
Concevoir et développer un système d'aide à la décision basé sur le Machine Learning permettant
d'assister les experts de la CIAR dans l'identification des dossiers de sinistres présentant des risques
de fraude, en fournissant des alertes justifiées et en priorisant l'analyse humaine sur les cas les plus
suspects.
4.2. Objectifs spécifiques
Analyser et comprendre le domaine métier
- Étudier le processus actuel de gestion et de contrôle des sinistres à la CIAR
- Identifier en collaboration avec les experts les indicateurs et signaux d'alerte de fraude
- Analyser les données historiques disponibles et leur structure
Concevoir l'architecture du système
- Définir l'architecture technique globale du système d'aide à la décision
- Modéliser la base de données nécessaire au stockage et à l'analyse des données
- Concevoir les interfaces utilisateur adaptées aux besoins des experts
Développer le module d'analyse intelligente
- Préparer et nettoyer les données historiques de sinistres
- Créer des variables pertinentes par ingénierie des caractéristiques
- Implémenter des règles métier basées sur l'expertise des gestionnaires
- Développer et entraîner des modèles de Machine Learning adaptés au problème
- Intégrer des mécanismes d'explicabilité pour justifier les alertes générées
Réaliser l'application web
- Développer une interface permettant l'analyse de dossiers de sinistres
- Créer un tableau de bord présentant les statistiques et visualisations utiles
- Mettre en place un système de gestion et de suivi des alertes
- Permettre aux experts de valider ou rejeter les alertes pour améliorer le système
Valider et documenter la solution
- Tester la solution sur des cas réels en collaboration avec les experts métier
- Évaluer les performances et l'apport du système par rapport à la méthode actuelle
- Rédiger la documentation technique complète du système
- Élaborer un guide utilisateur pour faciliter l'adoption de l'outil
## 5. DÉMARCHE MÉTHODOLOGIQUE

Le  projet  sera  mené  selon  une  approche  itérative  et  incrémentale  permettant  des  validations
régulières  avec  l'encadrant  professionnel  et  une  adaptation  continue  aux  besoins  identifiés.  La
méthodologie s'articulera autour de quatre grandes phases.
5.1. Phase d'analyse et de conception
Cette phase initiale permettra de comprendre en profondeur le domaine métier et d'établir les bases
solides du projet. Elle comprendra :
- L'étude détaillée du processus de gestion des sinistres et des méthodes actuelles de
détection
- L'identification des besoins fonctionnels et non fonctionnels en collaboration avec les
experts
- La définition des indicateurs de fraude et des règles métier à implémenter
- La conception de l'architecture globale du système avec les diagrammes appropriés
- La modélisation de la base de données et la spécification des interfaces
5.2. Phase de développement du module d'analyse
Cette phase constituera le cœur technique du projet avec le développement du module d'analyse
intelligent. Les activités principales seront :
- La collecte, l'exploration et le nettoyage des données historiques de sinistres
- L'ingénierie des caractéristiques pour créer des variables pertinentes pour l'analyse
- L'implémentation des règles métier identifiées avec les experts
- Le développement et l'entraînement de plusieurs modèles de Machine Learning
- L'évaluation comparative des différents algorithmes selon des métriques appropriées
- L'intégration de mécanismes d'explicabilité pour justifier les prédictions
5.3. Phase de développement de l'application
Cette phase permettra de rendre la solution accessible aux utilisateurs finaux à travers une interface
web intuitive. Elle comprendra :
- Le développement du backend avec création d'une API REST sécurisée
- L'intégration du module d'analyse intelligent dans l'API
- Le développement de l'interface utilisateur avec les composants nécessaires
- La création des tableaux de bord avec visualisations et statistiques
- La mise en place du système de gestion des alertes et du feedback utilisateur
5.4. Phase de validation et documentation
La phase finale assurera la qualité de la solution et sa pérennité. Elle comportera :
- La réalisation de tests fonctionnels et de performance sur l'ensemble du système
- La validation avec des cas réels en présence des experts métier
- L'évaluation des apports du système par rapport aux méthodes actuelles
- La rédaction de la documentation technique complète
- L'élaboration du guide utilisateur et du mémoire de fin d'études

- La préparation de la présentation de soutenance
## 6. TECHNOLOGIES ET OUTILS ENVISAGÉS
Le choix des technologies se fera en fonction des besoins identifiés et des ressources disponibles.
Les technologies suivantes sont envisagées :
Catégorie Technologies possibles
Modélisation UML, BPMN, Merise
Backend Python (Flask, FastAPI, Django)
## Frontend React.js, Vue.js, Angular
Machine Learning scikit-learn, XGBoost, pandas, NumPy, SHAP, Matplotlib, Seaborn
Base de données Oracle (ou autres possibilités : PostgreSQL, MySQL, MongoDB)
## Visualisation Chart.js, Plotly, D3.js
## Environnement Jupyter Notebook, Visual Studio Code, Git, Docker

## 7. RÉSULTATS ATTENDUS
7.1. Livrables du projet
Livrables techniques
- Un système d'aide à la décision opérationnel et fonctionnel
- Une application web accessible permettant l'analyse de dossiers de sinistres
- Des modèles de Machine Learning entraînés et optimisés
- Une API REST documentée permettant l'intégration future avec d'autres systèmes
- Une base de données structurée et opérationnelle
Livrables documentaires
- Mémoire de fin d'études conforme aux exigences académiques
- Documentation technique détaillée du système
- Guide utilisateur destiné aux experts métier
- Rapports d'analyse et d'évaluation des modèles développés
- Support de présentation pour la soutenance
7.2. Bénéfices attendus
Pour l'organisme d'accueil

- Un outil d'aide à la décision permettant de prioriser l'analyse des dossiers suspects
- Une réduction du temps consacré à l'analyse manuelle de tous les dossiers
- Une amélioration de la détection des fraudes grâce à l'identification de patterns
complexes
- Une capitalisation des connaissances sur les indicateurs de fraude
- Un système évolutif permettant l'amélioration continue avec le feedback des experts
Pour les étudiants
- Acquisition de compétences en Machine Learning et Data Science
- Maîtrise du développement d'applications web full-stack
- Expérience pratique de gestion d'un projet informatique de bout en bout
- Compréhension des processus métier dans le secteur de l'assurance
- Valorisation du profil professionnel dans des domaines à forte demande
## 8. PLANNING PRÉVISIONNEL
Le projet s'étendra sur une période de 4 mois, de février à juin 2026, avec une soutenance prévue
fin juin. Le planning prévisionnel est le suivant :
Période Activités principales
Semaines 1-3 Analyse des besoins, étude de l'existant, identification des indicateurs de
fraude, conception de l'architecture, modélisation de la base de données
Semaines 4-8 Collecte et préparation des données, ingénierie des caractéristiques,
développement et entraînement des modèles de Machine Learning,
évaluation des performances
Semaines 9-12 Développement de l'API et de la base de données, développement de
l'interface utilisateur, création des tableaux de bord, intégration des
composants
Semaines 13-14 Tests et validation, évaluation des performances, rédaction de la
documentation, finalisation du mémoire, préparation de la soutenance
Fin Juin 2026 Soutenance du projet de fin d'études

## 9. RÉFÉRENCES BIBLIOGRAPHIQUES
- DERRIG, R. A., & OSTASZEWSKI, K. (1995). Fuzzy techniques of pattern recognition
in risk and claim classification. Journal of Risk and Insurance, 62(3), 447-482.
- VIAENE, S., et al. (2007). Strategies for detecting fraudulent claims in the automobile
insurance industry. European Journal of Operational Research, 176(1), 565-583.

- ARTIS, M., AYUSO, M., & GUILLÉN, M. (2002). Détection de la fraude à l'assurance
automobile : un modèle de régression logistique. Assurances et Gestion des Risques,
## 70(3), 385-398.
- BREIMAN, L. (2001). Random forests. Machine Learning, 45(1), 5-32.
- CHEN, T., & GUESTRIN, C. (2016). XGBoost: A scalable tree boosting system.
Proceedings of the 22nd ACM SIGKDD, 785-794.
- CORNUÉJOLS, A., & MICLET, L. (2010). Apprentissage artificiel : concepts et
algorithmes. Eyrolles.
- GÉRON, A. (2019). Hands-On Machine Learning with Scikit-Learn, Keras, and
TensorFlow. O'Reilly Media.
- NGAI, E. W., et al. (2011). The application of data mining techniques in financial fraud
detection: A classification framework. Decision Support Systems, 50(3), 559-569.

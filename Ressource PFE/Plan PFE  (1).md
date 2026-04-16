

## INTRODUCTION GÉNÉRALE
- Contexte mondial et algérien
- Enjeux de la fraude à l'assurance
- Problématique et questions de recherche
- Hypothèses de travail
- Objectifs (scientifiques + techniques)
- Méthodologie de recherche
- Contributions attendues
- Structure du mémoire

## CHAPITRE 1 : CONTEXTE ORGANISATIONNEL
1.1 Présentation de la CIAR
1.1.1 Historique et positionnement
1.1.2 Organisation et chiffres clés
1.1.3 Système d'Information existant
1.1.4 Architecture technique (Oracle, etc.)
1.2 Secteur des assurances en Algérie
1.2.1 Cadre réglementaire
1.2.2 Cycle de vie d'un contrat automobile
1.2.3 Processus de gestion des sinistres (BPMN)
1.2.4 Acteurs et responsabilités
1.3 Problématique à la CIAR
1.3.1 Processus actuel de détection
1.3.2 Limites quantifiées (statistiques internes)
1.3.3 Besoins exprimés
1.3.4 Positionnement de notre solution

## CHAPITRE 2 : LA FRAUDE À L'ASSURANCE
2.1 Définition et typologie détaillée
2.1.1 Fraude opportuniste vs organisée
2.1.2 Exemples concrets (anonymisés)
2.2 Impact économique
2.2.1 Au niveau mondial
## 2.2.2 En Algérie
2.2.3 À la CIAR
2.3 Méthodes traditionnelles de détection
2.3.1 Règles métier
2.3.2 Listes noires
2.3.3 Contrôles aléatoires
2.3.4 Expertise humaine
2.4 Limites des approches classiques
2.5 Cadre juridique algérien

## CHAPITRE 3 : IA ET DÉTECTION DE FRAUDE
3.1 Fondements du Machine Learning
3.1.1 Apprentissage supervisé
3.1.2 Classification binaire
3.1.3 Généralisation et overfitting

3.2 Algorithmes de classification
3.2.1 Régression logistique (A définir)
3.2.2 Random Forest (A définir)
3.2.3 XGBoost (A définir)
3.2.4 SVM (A définir)
3.2.5 Comparaison (tableau synthétique)
3.3 Gestion du déséquilibre des classes
3.3.1 Problématique (fraude rare)
## 3.3.2 SMOTE
3.3.3 Techniques d'échantillonnage
3.3.4 Métriques adaptées
3.4 Explicabilité des modèles (SHAP)
3.4.1 Nécessité de l'explicabilité
3.4.2 Théorie SHAP
## 3.4.3 Visualisations
3.5 État de l'art et travaux connexes

## CHAPITRE 4 : CONSTRUCTION DU DATASET
4.1 Sources des données
4.2 Extraction depuis Oracle
4.2.1 Requêtes SQL (exemples)
## 4.2.2 Structuration
4.3 Anonymisation et conformité
4.4 Définition du label "Fraude”
4.4.1 Critères métier
4.4.2 Cas confirmés vs suspects
4.4.3 Stratégie de labellisation
4.4.4 Validation des labels
4.4.5 Distribution finale
4.5 Nettoyage et prétraitement
4.5.1 Valeurs manquantes
## 4.5.2 Outliers
4.5.3 Encodage variables catégorielles
## 4.5.4 Normalisation
## 4.6 Feature Engineering
4.6.1 Features temporelles
4.6.2 Features comportementales
4.6.3 Features contextuelles
4.6.4 Tableau récapitulatif complet
4.7 Analyse exploratoire (EDA)
4.7.1 Statistiques descriptives
## 4.7.2 Visualisations
## 4.7.3 Corrélations

## CHAPITRE 5 : CONCEPTION DU SYSTÈME
5.1 Architecture globale
5.1.1 Vue d'ensemble
5.1.2 Architecture en couches

5.1.3 Flux de données
5.1.4 Justification des choix
5.2 Modélisation UML
5.2.1 Cas d'utilisation
## 5.2.2 Séquence
## 5.2.3 Classes
## 5.2.4 Déploiement
5.3 Conception base de données Oracle
5.3.1 Modèle conceptuel
5.3.2 Modèle logique
5.3.3 Scripts DDL
5.4 Conception du tableau de bord
## 5.4.1 Maquettes
5.4.2 KPIs
## 5.4.3 Visualisations
5.5 Sécurité et contrôle d'accès
5.5.1 Authentification (JWT)
## 5.5.2 RBAC
5.5.3 Protection des données
5.6 Stratégie d'intégration

## CHAPITRE 6 : IMPLÉMENTATION
6.1 Environnement de développement
6.2 Implémentation du module ML
6.2.1 Pipeline de données
6.2.2 Code des algorithmes
## 6.2.3 Entraînement
6.3 Implémentation API (FastAPI)
## 6.3.1 Structure
## 6.3.2 Endpoints (code)
6.3.3 Intégration ML
6.4 Implémentation Frontend (React)
6.4.1 Architecture composants
## 6.4.2 Interfaces (screenshots)
## 6.4.3 Dashboard
6.5 Base de données Oracle
## 6.6 Déploiement

## CHAPITRE 7 : ÉVALUATION ET VALIDATION
7.1 Métriques d'évaluation
## 7.1.1 Accuracy
## 7.1.2 Precision, Recall, F1
## 7.1.3 ROC-AUC
7.1.4 Matrice de confusion
7.2 Résultats comparatifs des modèles
7.3 Analyse des résultats
7.4 Validation métier avec experts
7.4.1 Protocole de test

## 7.4.2 Résultats
7.4.3 Feedback qualitatif
7.5 Performance technique du système
## 7.6 Discussion
## 7.6.1 Forces
## 7.6.2 Limites
## 7.6.3 Risques

## CONCLUSION GÉNÉRALE
- Synthèse des travaux réalisés
- Contributions scientifiques
- Contributions pour la CIAR
- Limites et difficultés rencontrées
- Perspectives d'amélioration
- Conclusion personnelle

## ANNEXES
## BIBLIOGRAPHIE

/*
 * Fichier     : constants.js
 * Role        : Constantes globales du projet - valeurs partagees dans tout le frontend
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * CONFIGURATION API
 * ============================================================ */

/* URL de base de l'API backend - lue depuis les variables d'environnement */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/* Mode mock : si true, les services utilisent des donnees fictives locales */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

/* ============================================================
 * SEUILS DE SCORE DE FRAUDE
 * Definissent les niveaux de risque affiches dans l'interface
 * ============================================================ */
export const SCORE_THRESHOLDS = {
  FAIBLE: 0.3,   /* En dessous de ce seuil : dossier considere comme legitime */
  MOYEN:  0.7,   /* Entre FAIBLE et MOYEN : dossier suspect a verifier         */
  /* Au-dessus de MOYEN : fraude probable, alerte urgente                       */
};

/* Labels d'affichage correspondant aux niveaux */
export const SCORE_LABELS = {
  FAIBLE: 'Faible',
  MOYEN:  'Moyen',
  ELEVE:  'Eleve',
};

/* Classes de couleur Tailwind correspondant aux niveaux */
export const SCORE_COLORS = {
  FAIBLE: 'text-color-success',
  MOYEN:  'text-color-warning',
  ELEVE:  'text-color-danger',
};

/* ============================================================
 * ROLES UTILISATEURS
 * ============================================================ */
export const ROLES = {
  EXPERT: 'expert',
  ADMIN:  'admin',
};

/* ============================================================
 * STATUTS DES ALERTES
 * ============================================================ */
export const ALERT_STATUTS = {
  NON_TRAITE: 'non_traite',
  EN_COURS:   'en_cours',
  VALIDE:     'valide',
  REJETE:     'rejete',
};

export const ALERT_STATUTS_LABELS = {
  non_traite: 'Non traite',
  en_cours:   'En cours',
  valide:     'Valide',
  rejete:     'Rejete',
};

/* ============================================================
 * TYPES DE SINISTRES
 * ============================================================ */
export const TYPES_SINISTRES = [
  'Accident materiel',
  'Accident corporel',
  'Vol',
  'Incendie',
  'Catastrophe naturelle',
];

/* ============================================================
 * PAGINATION
 * ============================================================ */
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE      = 100;

/* ============================================================
 * DUREE DE VIE DU TOKEN JWT (en millisecondes)
 * 8 heures = une journee de travail
 * ============================================================ */
export const TOKEN_EXPIRE_MS = 8 * 60 * 60 * 1000;

/* ============================================================
 * CLES DU LOCAL STORAGE
 * ============================================================ */
export const STORAGE_KEYS = {
  TOKEN:    'ciar_token',
  USER:     'ciar_user',
  THEME:    'ciar_theme',
};

/* ============================================================
 * NOM ET VERSION DE L'APPLICATION
 * ============================================================ */
export const APP_NAME    = import.meta.env.VITE_APP_NAME    || 'CIAR Fraud Detection';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

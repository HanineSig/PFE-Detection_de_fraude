/*
 * Fichier     : formatters.js
 * Role        : Fonctions de formatage - dates, montants, scores, pourcentages
 *               Utilisees dans tous les composants d'affichage de donnees
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { SCORE_THRESHOLDS, SCORE_LABELS } from './constants';

/* ============================================================
 * FORMATAGE DES DATES
 * ============================================================ */

/**
 * Formate une date en format lisible francais (JJ/MM/AAAA).
 * @param {string|Date} date - Date a formater
 * @returns {string} Date formatee ou '--' si vide
 */
export const formatDate = (date) => {
  if (!date) return '--';
  return new Date(date).toLocaleDateString('fr-FR', {
    day:   '2-digit',
    month: '2-digit',
    year:  'numeric',
  });
};

/**
 * Formate une date avec heure (JJ/MM/AAAA HH:MM).
 * @param {string|Date} date - Date a formater
 * @returns {string} Date et heure formatees
 */
export const formatDateTime = (date) => {
  if (!date) return '--';
  return new Date(date).toLocaleDateString('fr-FR', {
    day:    '2-digit',
    month:  '2-digit',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calcule et formate le delai entre deux dates en jours.
 * Utilise notamment pour le delai de declaration d'un sinistre.
 * @param {string|Date} debut  - Date de debut
 * @param {string|Date} fin    - Date de fin
 * @returns {string} Nombre de jours formaté
 */
export const formatDelai = (debut, fin) => {
  if (!debut || !fin) return '--';
  const diff = Math.abs(new Date(fin) - new Date(debut));
  const jours = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${jours} jour${jours > 1 ? 's' : ''}`;
};

/* ============================================================
 * FORMATAGE DES MONTANTS
 * ============================================================ */

/**
 * Formate un montant en dinars algeriens (DZD).
 * @param {number} montant - Montant a formater
 * @returns {string} Montant formate avec symbole
 */
export const formatMontant = (montant) => {
  if (montant === undefined || montant === null) return '--';
  return new Intl.NumberFormat('fr-DZ', {
    style:    'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(montant);
};

/* ============================================================
 * FORMATAGE DES SCORES DE FRAUDE
 * ============================================================ */

/**
 * Convertit un score decimal [0,1] en pourcentage affichable.
 * Exemple : 0.734 -> "73.4%"
 * @param {number} score - Score entre 0 et 1
 * @returns {string} Pourcentage formate
 */
export const formatScore = (score) => {
  if (score === undefined || score === null) return '--';
  return `${(score * 100).toFixed(1)}%`;
};

/**
 * Determine le niveau de risque a partir du score numerique.
 * Utilise les seuils definis dans constants.js
 * @param {number} score - Score entre 0 et 1
 * @returns {string} Niveau : 'FAIBLE', 'MOYEN' ou 'ELEVE'
 */
export const getNiveauRisque = (score) => {
  if (score === undefined || score === null) return null;
  if (score < SCORE_THRESHOLDS.FAIBLE) return 'FAIBLE';
  if (score < SCORE_THRESHOLDS.MOYEN)  return 'MOYEN';
  return 'ELEVE';
};

/**
 * Retourne le label d'affichage du niveau de risque.
 * @param {number} score - Score entre 0 et 1
 * @returns {string} Label lisible
 */
export const getNiveauLabel = (score) => {
  const niveau = getNiveauRisque(score);
  return niveau ? SCORE_LABELS[niveau] : '--';
};

/* ============================================================
 * FORMATAGE DES TEXTES
 * ============================================================ */

/**
 * Tronque un texte long avec des points de suspension.
 * @param {string} texte   - Texte a tronquer
 * @param {number} maxLen  - Longueur maximale (defaut: 50)
 * @returns {string} Texte tronque
 */
export const truncate = (texte, maxLen = 50) => {
  if (!texte) return '--';
  if (texte.length <= maxLen) return texte;
  return `${texte.slice(0, maxLen)}...`;
};

/**
 * Capitalise la premiere lettre d'une chaine.
 * @param {string} str - Chaine a capitaliser
 * @returns {string} Chaine avec premiere lettre en majuscule
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

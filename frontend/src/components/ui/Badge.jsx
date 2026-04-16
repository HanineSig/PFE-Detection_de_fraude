/*
 * Fichier     : Badge.jsx
 * Role        : Composant badge coloré pour afficher les niveaux de risque
 *               (FAIBLE=vert, MOYEN=orange, ELEVE=rouge) et les statuts d'alerte
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';

/* ============================================================
 * CONSTANTES DE STYLE
 * Mapping niveau de risque -> classes Tailwind
 * ============================================================ */

/* Couleurs des badges de niveau de risque */
const NIVEAU_CLASSES = {
  FAIBLE:  'bg-green-100  text-green-700  dark:bg-green-900/30  dark:text-green-400',
  MOYEN:   'bg-amber-100  text-amber-700  dark:bg-amber-900/30  dark:text-amber-400',
  ELEVE:   'bg-red-100    text-red-700    dark:bg-red-900/30    dark:text-red-400',
};

/* Couleurs des badges de statut d'alerte */
const STATUT_CLASSES = {
  non_traite: 'bg-gray-100   text-gray-700   dark:bg-gray-800   dark:text-gray-300',
  en_cours:   'bg-blue-100   text-blue-700   dark:bg-blue-900/30 dark:text-blue-400',
  valide:     'bg-green-100  text-green-700  dark:bg-green-900/30 dark:text-green-400',
  rejete:     'bg-red-100    text-red-700    dark:bg-red-900/30  dark:text-red-400',
};

/* Labels d'affichage des statuts */
const STATUT_LABELS = {
  non_traite: 'Non traite',
  en_cours:   'En cours',
  valide:     'Valide',
  rejete:     'Rejete',
};

/* ============================================================
 * COMPOSANT BADGE
 * ============================================================ */

/**
 * Badge colore representant un niveau de risque ou un statut.
 * @param {string} type    - Type de badge : 'niveau' | 'statut'
 * @param {string} value   - Valeur : 'FAIBLE'|'MOYEN'|'ELEVE' ou statut d'alerte
 * @param {boolean} pulse  - Ajoute une animation de pulsation (pour les alertes actives)
 * @param {string} className - Classes supplementaires
 */
const Badge = ({ type = 'niveau', value, pulse = false, className = '' }) => {

  /* --- Determination des classes et du label selon le type --- */
  let colorClasses = '';
  let label        = value;

  if (type === 'niveau') {
    colorClasses = NIVEAU_CLASSES[value] || NIVEAU_CLASSES.FAIBLE;
    label        = value ? (value.charAt(0) + value.slice(1).toLowerCase()) : '--';
  } else if (type === 'statut') {
    colorClasses = STATUT_CLASSES[value] || STATUT_CLASSES.non_traite;
    label        = STATUT_LABELS[value]  || value;
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-0.5
        text-xs font-semibold
        rounded-full
        ${colorClasses}
        ${className}
      `}
    >
      {/* Point de statut anime si pulse=true */}
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {label}
    </span>
  );
};

export default Badge;

/*
 * Fichier     : Card.jsx
 * Role        : Composant carte generique - conteneur visuel du design system CIAR
 *               Supporte les modes clair et sombre automatiquement
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';

/* ============================================================
 * COMPOSANT CARD
 * ============================================================ */

/**
 * Conteneur carte avec fond, ombre et bordure selon le theme actif.
 * @param {ReactNode} children   - Contenu de la carte
 * @param {string}   className   - Classes CSS supplementaires
 * @param {boolean}  hoverable   - Ajoute un effet de survol (utile pour les listes cliquables)
 * @param {boolean}  noPadding   - Supprime le padding interne (pour les cartes avec image)
 * @param {Function} onClick     - Handler optionnel de clic
 */
const Card = ({ children, className = '', hoverable = false, noPadding = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[var(--bg-card)]
        border border-[var(--border-color)]
        rounded-xl
        shadow-[var(--shadow-sm)]
        ${noPadding ? '' : 'p-6'}
        ${hoverable ? 'cursor-pointer hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* ============================================================
 * SOUS-COMPOSANTS - Decomposition semantique des sections de carte
 * ============================================================ */

/**
 * En-tete de carte avec titre et action optionnelle.
 * @param {string}   title    - Titre de la section
 * @param {ReactNode} action  - Element actionnable (bouton, lien) a droite du titre
 */
Card.Header = ({ title, action, className = '' }) => (
  <div className={`flex items-center justify-between mb-4 ${className}`}>
    <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
    {action && <div>{action}</div>}
  </div>
);

/**
 * Corps de la carte - zone principale de contenu.
 */
Card.Body = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

/**
 * Pied de carte - zone de boutons ou informations complementaires.
 */
Card.Footer = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-[var(--border-color)] ${className}`}>
    {children}
  </div>
);

export default Card;

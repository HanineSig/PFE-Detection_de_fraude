/*
 * Fichier     : Loader.jsx
 * Role        : Composant de chargement - spinner anime avec logo CIAR
 *               Utilise pendant les appels API (analyses ML, chargement de donnees)
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';

/* ============================================================
 * COMPOSANT LOADER
 * ============================================================ */

/**
 * Affiche un spinner de chargement centre dans son conteneur.
 * @param {string} message - Texte affiche sous le spinner (optionnel)
 * @param {boolean} fullPage - Si true, occupe toute la hauteur de l'ecran
 * @param {string} size - Taille du spinner : 'sm' | 'md' | 'lg'
 */
const Loader = ({ message = 'Chargement...', fullPage = false, size = 'md' }) => {

  /* --- Tailles du spinner selon la prop size --- */
  const sizeClasses = {
    sm:  'w-8  h-8  border-2',
    md:  'w-12 h-12 border-3',
    lg:  'w-16 h-16 border-4',
  };

  /* --- Classes du conteneur selon fullPage --- */
  const containerClasses = fullPage
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-primary)] z-50'
    : 'flex flex-col items-center justify-center py-12';

  return (
    <div className={containerClasses} role="status" aria-label={message}>

      {/* Spinner - cercle anime en rotation */}
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full
          border-[var(--border-color)]
          border-t-[var(--secondary-blue-mid)]
          animate-spin
        `}
      />

      {/* Message de chargement */}
      {message && (
        <p className="mt-4 text-sm text-[var(--text-secondary)] font-medium tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;

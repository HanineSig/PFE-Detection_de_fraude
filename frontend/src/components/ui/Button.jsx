/*
 * Fichier     : Button.jsx
 * Role        : Composant bouton reutilisable - plusieurs variantes et tailles
 *               Utilise dans tous les formulaires et actions de l'application
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import Loader from './Loader';

/* ============================================================
 * CONSTANTES DE STYLE
 * ============================================================ */

/* Variantes visuelles du bouton */
const VARIANTS = {
  primary:   'bg-[var(--secondary-blue-mid)] text-white hover:bg-[var(--secondary-blue-dark)] shadow-sm',
  secondary: 'bg-transparent border border-[var(--secondary-blue-mid)] text-[var(--secondary-blue-mid)] hover:bg-[var(--secondary-blue-mid)] hover:text-white',
  danger:    'bg-[var(--color-danger)] text-white hover:opacity-90 shadow-sm',
  success:   'bg-[var(--color-success)] text-white hover:opacity-90 shadow-sm',
  ghost:     'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--border-color)]',
};

/* Tailles du bouton */
const SIZES = {
  sm:  'px-3 py-1.5 text-sm rounded-full',
  md:  'px-5 py-2.5 text-sm rounded-full',
  lg:  'px-7 py-3   text-base rounded-full',
  xl:  'px-8 py-4   text-base rounded-full',
};

/* ============================================================
 * COMPOSANT BUTTON
 * ============================================================ */

/**
 * Bouton reutilisable avec support du loading, icone, et variantes.
 * @param {string}   variant    - Variante visuelle (primary, secondary, danger, success, ghost)
 * @param {string}   size       - Taille (sm, md, lg, xl)
 * @param {boolean}  isLoading  - Affiche un spinner si true
 * @param {boolean}  disabled   - Desactive le bouton
 * @param {ReactNode} leftIcon  - Icone a gauche du texte (composant Lucide)
 * @param {ReactNode} rightIcon - Icone a droite du texte
 * @param {string}   className  - Classes CSS supplementaires
 * @param {Function} onClick    - Handler du clic
 * @param {ReactNode} children  - Contenu du bouton
 */
const Button = ({
  variant    = 'primary',
  size       = 'md',
  isLoading  = false,
  disabled   = false,
  leftIcon   = null,
  rightIcon  = null,
  className  = '',
  onClick,
  type       = 'button',
  children,
  ...rest
}) => {

  /* Le bouton est desactive pendant le chargement ou si explicitement desactive */
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[var(--secondary-blue-mid)] focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant] || VARIANTS.primary}
        ${SIZES[size]       || SIZES.md}
        ${className}
      `}
      {...rest}
    >
      {/* Spinner de chargement a la place de l'icone gauche */}
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : leftIcon}

      {/* Contenu textuel du bouton */}
      {children}

      {/* Icone droite - non affichee pendant le chargement */}
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button;

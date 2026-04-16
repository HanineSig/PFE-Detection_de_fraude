/*
 * Fichier     : Input.jsx
 * Role        : Composant champ de saisie reutilisable avec label, erreur et icone
 *               Applique le design system CIAR de maniere uniforme sur tous les formulaires
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React, { forwardRef } from 'react';

/* ============================================================
 * COMPOSANT INPUT
 * Utilise forwardRef pour permettre l'acces direct au DOM si necessaire
 * ============================================================ */

/**
 * Champ de saisie stylelise avec label, message d'erreur et icone optionnelle.
 * @param {string}   label       - Libelle affiché au-dessus du champ
 * @param {string}   error       - Message d'erreur (affiche en rouge sous le champ)
 * @param {string}   hint        - Texte d'aide (affiche en gris sous le champ)
 * @param {ReactNode} leftIcon   - Icone a gauche dans le champ
 * @param {ReactNode} rightIcon  - Icone a droite dans le champ (ex: oeil mot de passe)
 * @param {string}   className   - Classes CSS supplementaires sur le conteneur
 * @param {string}   id          - Identifiant unique du champ (obligatoire pour l'accessibilite)
 */
const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className  = '',
  id,
  type       = 'text',
  disabled   = false,
  ...rest
}, ref) => {

  /* --- Calcul des classes de bordure selon l'etat (erreur, normal, focus) --- */
  const borderClass = error
    ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]'
    : 'border-[var(--border-color)] focus:ring-[var(--secondary-blue-mid)]';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>

      {/* Label du champ */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}

      {/* Conteneur du champ avec positionnement des icones */}
      <div className="relative">

        {/* Icone gauche */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] transition-colors duration-300 peer-focus:text-[var(--secondary-blue-mid)]">
            {leftIcon}
          </div>
        )}

        {/* Champ de saisie */}
        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          className={`
            w-full
            bg-[var(--bg-card)]
            text-[var(--text-primary)]
            placeholder:text-[var(--text-secondary)]
            border rounded-full
            px-5 py-3 text-sm
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-[var(--secondary-blue-mid)] focus:ring-offset-1
            focus:-translate-y-0.5 focus:shadow-md
            disabled:opacity-50 disabled:cursor-not-allowed
            peer
            ${leftIcon  ? 'pl-11' : ''}
            ${rightIcon ? 'pr-11' : ''}
            ${borderClass}
          `}
          {...rest}
        />

        {/* Icone droite */}
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Message d'erreur - affiché uniquement si erreur */}
      {error && (
        <p className="text-xs text-[var(--color-danger)] font-medium">
          {error}
        </p>
      )}

      {/* Texte d'aide - affiché si pas d'erreur */}
      {!error && hint && (
        <p className="text-xs text-[var(--text-secondary)]">
          {hint}
        </p>
      )}
    </div>
  );
});

/* Nom pour le debogage dans les outils React */
Input.displayName = 'Input';

export default Input;

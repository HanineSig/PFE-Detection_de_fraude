/*
 * Fichier     : DarkModeToggle.jsx
 * Role        : Bouton de bascule entre le theme clair et sombre
 *               Affiche une icone soleil (clair) ou lune (sombre) avec animation
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

/* ============================================================
 * COMPOSANT DARK MODE TOGGLE
 * ============================================================ */

/**
 * Bouton icone qui bascule entre le mode clair et sombre.
 * Utilise le ThemeContext pour lire et modifier le theme courant.
 * Anime la transition entre les icones soleil et lune.
 */
const DarkModeToggle = () => {

  /* Lecture du theme courant et de la fonction de bascule */
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      className={`
        relative
        p-2.5 rounded-full
        border border-[var(--border-color)]
        bg-[var(--bg-card)]
        text-[var(--text-secondary)]
        hover:text-[var(--secondary-blue-mid)]
        hover:border-[var(--secondary-blue-mid)]
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[var(--secondary-blue-mid)]
      `}
    >
      {/* Animation de rotation lors du changement de theme */}
      <div
        className={`
          transform transition-transform duration-300
          ${isDark ? 'rotate-0' : 'rotate-180'}
        `}
      >
        {/* Affiche Lune si mode sombre actif, Soleil sinon */}
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </div>
    </button>
  );
};

export default DarkModeToggle;

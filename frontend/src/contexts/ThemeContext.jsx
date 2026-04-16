/*
 * Fichier     : ThemeContext.jsx
 * Role        : Gestion globale du theme clair/sombre (dark mode)
 *               Persiste le choix de l'utilisateur dans le localStorage
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

/* ============================================================
 * CREATION DU CONTEXTE
 * ============================================================ */

/* Contexte theme - fournit isDark et toggleTheme a tous les enfants */
const ThemeContext = createContext(null);

/* ============================================================
 * PROVIDER - COMPOSANT FOURNISSEUR DU THEME
 * ============================================================ */

/**
 * ThemeProvider enveloppe l'application et expose le theme global.
 * Lit le theme sauvegarde dans le localStorage au demarrage.
 * Applique la classe 'dark' sur l'element <html> pour Tailwind.
 */
export const ThemeProvider = ({ children }) => {

  /* --- Initialisation : lecture du theme sauvegarde ou theme clair par defaut --- */
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved === 'dark';
  });

  /* --- Effet : applique ou retire la classe 'dark' sur l'element HTML --- */
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    /* Sauvegarde le choix dans le localStorage */
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
  }, [isDark]);

  /* --- Fonction de bascule du theme --- */
  const toggleTheme = () => setIsDark((prev) => !prev);

  /* --- Valeurs exposees au contexte --- */
  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/* ============================================================
 * HOOK PERSONNALISE - usetheme
 * ============================================================ */

/**
 * Hook pour consommer le ThemeContext dans n'importe quel composant.
 * Leve une erreur si utilise en dehors du ThemeProvider.
 * @returns {{ isDark: boolean, toggleTheme: Function, theme: string }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit etre utilise a l\'interieur d\'un ThemeProvider');
  }
  return context;
};

export default ThemeContext;

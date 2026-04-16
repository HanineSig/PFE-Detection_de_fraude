/*
 * Fichier     : main.jsx
 * Role        : Point d'entree Vite - monte l'application React dans le DOM
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

/* ============================================================
 * MONTAGE DE L'APPLICATION
 * StrictMode active les avertissements supplementaires en developpement
 * ============================================================ */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

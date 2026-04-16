/*
 * Fichier     : AppLayout.jsx
 * Role        : Layout principal de l'application apres connexion
 *               Assemble la Sidebar + TopBar + zone de contenu principale
 *               Enveloppe toutes les pages protegees
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import Sidebar from './Sidebar';
import TopBar  from './TopBar';

/* ============================================================
 * COMPOSANT APP LAYOUT
 * ============================================================ */

/**
 * Structure en grille de l'application apres connexion :
 *
 *   +----------+----------------------------------+
 *   |          |           TopBar                 |
 *   | Sidebar  +----------------------------------+
 *   |          |                                  |
 *   |          |      Zone de contenu (page)      |
 *   |          |                                  |
 *   +----------+----------------------------------+
 *
 * @param {ReactNode} children - La page a afficher dans la zone de contenu
 */
const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">

      {/* ---- Navigation laterale ---- */}
      <Sidebar />

      {/* ---- Zone principale (TopBar + contenu) ---- */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Barre superieure */}
        <TopBar />

        {/* Zone de contenu de la page - scrollable independamment */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

/*
 * Fichier     : TopBar.jsx
 * Role        : Barre superieure de l'application (header)
 *               Affiche le titre de la page courante, le toggle de theme, et le bouton de deconnexion
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DarkModeToggle from '../ui/DarkModeToggle';

/* ============================================================
 * CONSTANTES
 * Mapping des routes vers leur titre de page
 * ============================================================ */
const PAGE_TITLES = {
  '/':        'Tableau de bord',
  '/alertes': 'Gestion des Alertes',
  '/profil':  'Mon Profil',
};

/* ============================================================
 * COMPOSANT TOP BAR
 * ============================================================ */

/**
 * Barre horizontale en haut de l'application.
 * Contient : titre de la page | notifications | toggle theme | deconnexion
 */
const TopBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /* --- Determination du titre de la page courante --- */
  const getPageTitle = () => {
    /* Routes dynamiques comme /analyse/:id */
    if (location.pathname.startsWith('/analyse/')) {
      return 'Analyse de Dossier';
    }
    return PAGE_TITLES[location.pathname] || 'CIAR Fraud Detection';
  };

  /* --- Gestion de la deconnexion --- */
  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[var(--bg-card)] border-b border-[var(--border-color)]">

      {/* ---- Titre de la page ---- */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {getPageTitle()}
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Bonjour, {user?.prenom || 'Utilisateur'}
        </p>
      </div>

      {/* ---- Actions a droite ---- */}
      <div className="flex items-center gap-3">

        {/* Bouton de notifications (placeholder - fonctionnel plus tard) */}
        <button
          aria-label="Voir les notifications"
          className="relative p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--secondary-blue-mid)] transition-colors"
        >
          <Bell size={18} />
          {/* Indicateur de notification non lue */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-danger)] rounded-full" />
        </button>

        {/* Bouton de bascule theme clair/sombre */}
        <DarkModeToggle />

        {/* Separateur vertical */}
        <div className="w-px h-6 bg-[var(--border-color)]" />

        {/* Bouton de deconnexion */}
        <button
          onClick={handleLogout}
          aria-label="Se deconnecter"
          title="Se deconnecter"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--color-danger)] hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline font-medium">Deconnexion</span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;

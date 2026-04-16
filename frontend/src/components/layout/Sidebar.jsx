/*
 * Fichier     : Sidebar.jsx
 * Role        : Barre de navigation laterale de l'application
 *               Affiche les liens de navigation avec icones, gere l'etat actif
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

/* ============================================================
 * CONFIGURATION DE LA NAVIGATION
 * Chaque entree definit la route, le label et l'icone Lucide
 * ============================================================ */
const NAV_ITEMS = [
  {
    path:  '/',
    label: 'Tableau de bord',
    Icon:  LayoutDashboard,
    /* Route exacte - ne pas matcher /analyse ou /alertes */
    exact: true,
  },
  {
    path:  '/alertes',
    label: 'Alertes',
    Icon:  Bell,
    exact: false,
  },
  {
    path:  '/profil',
    label: 'Mon Profil',
    Icon:  User,
    exact: false,
  },
];

/* ============================================================
 * COMPOSANT SIDEBAR
 * ============================================================ */

/**
 * Barre de navigation laterale avec mode collapsed/expanded.
 * En mode collapsed (reduit), seules les icones sont visibles.
 */
const Sidebar = () => {

  const location   = useLocation();
  const { user, isAdmin } = useAuth();

  /* Etat de reduction de la sidebar (true = collapsed, icones seulement) */
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* --- Fonction de verification de la route active --- */
  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`
        flex flex-col
        bg-[var(--bg-card)]
        border-r border-[var(--border-color)]
        transition-all duration-300
        relative
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* ---- En-tete : Logo + bouton de reduction ---- */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">

        {/* Logo - masque en mode collapsed */}
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--secondary-blue-mid)] flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-bold text-[var(--text-primary)] text-sm leading-tight">
              CIAR<br/>
              <span className="text-[var(--text-secondary)] font-normal text-xs">Fraud Detection</span>
            </span>
          </div>
        )}

        {/* Icone seule en mode collapsed */}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-[var(--secondary-blue-mid)] flex items-center justify-center mx-auto">
            <Shield size={16} className="text-white" />
          </div>
        )}

        {/* Bouton de reduction/expansion - visible seulement en mode expanded */}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            aria-label="Reduire la navigation"
            className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--secondary-blue-mid)] hover:bg-[var(--border-color)] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* ---- Navigation principale ---- */}
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ path, label, Icon, exact }) => {
          const active = isActive(path, exact);
          return (
            <NavLink
              key={path}
              to={path}
              title={isCollapsed ? label : undefined}
              className={`
                flex items-center gap-3
                px-3 py-2.5 rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${isCollapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-[var(--secondary-blue-mid)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <Icon size={18} className="flex-shrink-0" />
              {/* Label masque en mode collapsed */}
              {!isCollapsed && <span>{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* ---- Pied : Info utilisateur connecte ---- */}
      {!isCollapsed && (
        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            {/* Avatar avec initiales */}
            <div className="w-8 h-8 rounded-full bg-[var(--secondary-blue-dark)] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {user ? `${user.prenom?.[0]}${user.nom?.[0]}` : 'U'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                {user ? `${user.prenom} ${user.nom}` : 'Utilisateur'}
              </p>
              <p className="text-xs text-[var(--text-secondary)] capitalize">
                {user?.role || 'expert'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bouton d'expansion flottant en mode collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          aria-label="Agrandir la navigation"
          className="mx-auto mb-4 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--secondary-blue-mid)] hover:bg-[var(--border-color)] transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </aside>
  );
};

export default Sidebar;

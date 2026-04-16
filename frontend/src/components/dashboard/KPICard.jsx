/*
 * Fichier     : KPICard.jsx
 * Role        : Carte d'indicateur cle de performance (KPI) pour le tableau de bord
 *               Affiche une valeur, un titre, une icone et une tendance par rapport au mois precedent
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import { TrendingUp, TrendingDown, Minus, FolderOpen, AlertTriangle, Clock, Bell } from 'lucide-react';
import Card from '../ui/Card';

/* ============================================================
 * CONFIGURATION DES TYPES DE KPI
 * ============================================================ */

/* Mapping du type de KPI vers son icone et sa couleur d'accent */
const KPI_CONFIGS = {
  total: {
    Icon:      FolderOpen,
    iconBg:    'bg-blue-100   dark:bg-blue-900/30',
    iconColor: 'text-[var(--secondary-blue-mid)]',
  },
  risque: {
    Icon:      AlertTriangle,
    iconBg:    'bg-red-100    dark:bg-red-900/30',
    iconColor: 'text-[var(--color-danger)]',
  },
  encours: {
    Icon:      Clock,
    iconBg:    'bg-amber-100  dark:bg-amber-900/30',
    iconColor: 'text-[var(--color-warning)]',
  },
  alertes: {
    Icon:      Bell,
    iconBg:    'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-500',
  },
};

/* ============================================================
 * COMPOSANT KPI CARD
 * ============================================================ */

/**
 * Carte KPI avec valeur principale, titre, icone et indicateur de tendance.
 * @param {string}   title          - Intitule du KPI
 * @param {string|number} value     - Valeur a afficher
 * @param {number}   tendance       - Pourcentage de variation (positif ou negatif)
 * @param {string}   type           - Type de KPI : 'total' | 'risque' | 'encours' | 'alertes'
 * @param {boolean}  invertTendance - Si true, une tendance positive est mauvaise (ex: taux de risque)
 */
const KPICard = ({ title, value, tendance, type = 'total', invertTendance = false }) => {

  /* --- Configuration visuelle selon le type --- */
  const config = KPI_CONFIGS[type] || KPI_CONFIGS.total;
  const { Icon, iconBg, iconColor } = config;

  /* --- Determination de la couleur et icone de la tendance --- */
  const getTendanceDisplay = () => {
    if (tendance === undefined || tendance === null) return null;

    /* La tendance est consideree positive ou negative selon le contexte */
    const isPositif = invertTendance ? tendance < 0 : tendance > 0;
    const isNegatif = invertTendance ? tendance > 0 : tendance < 0;
    const isNeutre  = tendance === 0;

    if (isNeutre) {
      return (
        <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
          <Minus size={12} /> Stable
        </span>
      );
    }

    return (
      <span className={`flex items-center gap-1 text-xs font-medium ${isPositif ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>
        {isPositif ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {tendance > 0 ? '+' : ''}{tendance}% ce mois
      </span>
    );
  };

  return (
    <Card>
      <div className="flex items-start justify-between">

        {/* ---- Valeur et titre ---- */}
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-[var(--text-primary)] tabular-nums">
            {value}
          </p>
          {/* Indicateur de tendance */}
          <div className="mt-2">
            {getTendanceDisplay()}
          </div>
        </div>

        {/* ---- Icone a droite ---- */}
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
    </Card>
  );
};

export default KPICard;

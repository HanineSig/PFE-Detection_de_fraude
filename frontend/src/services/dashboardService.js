/*
 * Fichier     : dashboardService.js
 * Role        : Service de recuperation des statistiques du tableau de bord
 * Endpoints   : GET /dashboard/stats | GET /dashboard/alertes
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import api from './api';
import { USE_MOCK } from '../utils/constants';
import { mockStats, mockEvolutionFraudes, mockRepartition, mockAlertes } from './mockData/mockStats';

/* ============================================================
 * FONCTIONS DU DASHBOARD
 * ============================================================ */

/**
 * Recupere les KPIs et statistiques principales du tableau de bord.
 * @returns {Promise<Object>} { total_dossiers, pct_risque, dossiers_en_cours, alertes_actives, tendances }
 */
export const getStats = async () => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockStats;
  }

  const response = await api.get('/dashboard/stats');
  return response.data;
};

/**
 * Recupere les donnees d'evolution des fraudes par mois pour le graphique.
 * @returns {Promise<Array>} Tableau de { mois, total, fraudes, suspects }
 */
export const getEvolutionFraudes = async () => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockEvolutionFraudes;
  }

  const response = await api.get('/dashboard/evolution');
  return response.data;
};

/**
 * Recupere la repartition par niveau de risque pour le graphique camembert.
 * @returns {Promise<Array>} Tableau de { name, value, fill }
 */
export const getRepartition = async () => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockRepartition;
  }

  const response = await api.get('/dashboard/repartition');
  return response.data;
};

/**
 * Recupere les alertes actives pour le widget du dashboard.
 * @returns {Promise<Array>} Liste des alertes non traitees
 */
export const getAlertesDashboard = async () => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockAlertes;
  }

  const response = await api.get('/dashboard/alertes');
  return response.data;
};

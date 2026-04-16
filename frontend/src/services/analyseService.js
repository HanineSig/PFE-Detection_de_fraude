/*
 * Fichier     : analyseService.js
 * Role        : Service de lancement et recuperation des analyses ML
 * Endpoints   : POST /analyser/:id | GET /analyser/:id/history | POST /analyser/:id/feedback
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import api from './api';
import { USE_MOCK } from '../utils/constants';
import { getMockAnalyse } from './mockData/mockAnalyse';

/* ============================================================
 * FONCTIONS D'ANALYSE ML
 * ============================================================ */

/**
 * Lance l'analyse ML sur un dossier de sinistre.
 * Appel potentiellement long (plusieurs secondes pour le ML).
 * @param {number|string} dossierId - Identifiant du dossier a analyser
 * @returns {Promise<Object>} Resultat : { score, niveau, resume, facteurs, shap_values }
 */
export const analyserDossier = async (dossierId) => {
  if (USE_MOCK) {
    /* Simulation du temps de traitement ML (1.5 secondes) */
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return getMockAnalyse(dossierId);
  }

  const response = await api.post(`/analyser/${dossierId}`);
  return response.data;
};

/**
 * Recupere l'historique des analyses precedentes d'un dossier.
 * @param {number|string} dossierId - Identifiant du dossier
 * @returns {Promise<Array>} Liste des analyses passees
 */
export const getAnalyseHistory = async (dossierId) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    /* Retourne une liste vide - pas d'historique dans les mocks */
    return [];
  }

  const response = await api.get(`/analyser/${dossierId}/history`);
  return response.data;
};

/**
 * Soumet le feedback de l'expert sur un resultat d'analyse.
 * Le feedback sert a ameliorer le modele ML (reinforcement learning).
 * @param {number|string} dossierId - Identifiant du dossier
 * @param {Object} feedback         - { decision: 'FRAUDE'|'LEGITIME', commentaire: string }
 * @returns {Promise<{success: boolean}>}
 */
export const soumettreRetour = async (dossierId, feedback) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true };
  }

  const response = await api.post(`/analyser/${dossierId}/feedback`, feedback);
  return response.data;
};

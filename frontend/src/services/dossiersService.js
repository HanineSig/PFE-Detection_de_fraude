/*
 * Fichier     : dossiersService.js
 * Role        : Service de gestion des dossiers de sinistres
 *               CRUD + recherche + pagination
 * Endpoints   : GET /dossiers | GET /dossiers/:id | GET /dossiers/search
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import api from './api';
import { USE_MOCK, DEFAULT_PAGE_SIZE } from '../utils/constants';
import { mockDossiers, getMockDossierById } from './mockData/mockDossiers';

/* ============================================================
 * FONCTIONS DE GESTION DES DOSSIERS
 * ============================================================ */

/**
 * Recupere la liste paginee des dossiers de sinistres.
 * @param {Object} params - Parametres de filtrage
 * @param {number} params.page     - Numero de page (defaut : 1)
 * @param {number} params.limit    - Nombre de resultats par page
 * @param {string} params.statut   - Filtre par statut
 * @param {string} params.niveau   - Filtre par niveau de risque
 * @returns {Promise<{data: Array, total: number, page: number}>}
 */
export const getDossiers = async (params = {}) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { page = 1, limit = DEFAULT_PAGE_SIZE, statut, niveau } = params;

    /* Filtrage local sur les donnees fictives */
    let filtered = [...mockDossiers];
    if (statut)  filtered = filtered.filter((d) => d.statut === statut);
    if (niveau)  filtered = filtered.filter((d) => d.niveau_risque === niveau);

    /* Pagination simulee */
    const start = (page - 1) * limit;
    const data  = filtered.slice(start, start + limit);

    return { data, total: filtered.length, page };
  }

  const response = await api.get('/dossiers', { params });
  return response.data;
};

/**
 * Recupere les details complets d'un dossier par son identifiant.
 * @param {number|string} id - Identifiant du dossier
 * @returns {Promise<Object>} Dossier complet avec assure et vehicule
 */
export const getDossierById = async (id) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const dossier = getMockDossierById(id);
    if (!dossier) throw new Error(`Dossier ${id} introuvable`);
    return dossier;
  }

  const response = await api.get(`/dossiers/${id}`);
  return response.data;
};

/**
 * Recherche des dossiers par terme (numero de police, nom assure...).
 * @param {string} terme - Terme de recherche
 * @returns {Promise<Array>} Liste des resultats correspondants
 */
export const searchDossiers = async (terme) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    /* Recherche insensible a la casse sur le numero de police */
    const lower = terme.toLowerCase();
    return mockDossiers.filter(
      (d) => d.num_police.toLowerCase().includes(lower)
           || d.assure.nom.toLowerCase().includes(lower)
           || d.assure.prenom.toLowerCase().includes(lower)
    );
  }

  const response = await api.get('/dossiers/search', { params: { q: terme } });
  return response.data;
};

/*
 * Fichier     : api.js
 * Role        : Instance Axios partagee - configuration de base et intercepteurs JWT
 *               Toutes les requetes API passent par cette instance
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import axios from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

/* ============================================================
 * CREATION DE L'INSTANCE AXIOS
 * ============================================================ */

/**
 * Instance Axios configuree avec :
 * - L'URL de base de l'API backend
 * - Un timeout de 30 secondes (les analyses ML peuvent prendre du temps)
 * - Les headers par defaut en JSON
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ============================================================
 * INTERCEPTEUR DE REQUETE - Ajout du token JWT
 * Execute avant chaque requete envoyee au backend
 * ============================================================ */
api.interceptors.request.use(
  (config) => {
    /* Lecture du token depuis le localStorage */
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    /* Si un token existe, on l'ajoute dans le header Authorization */
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    /* Erreur de configuration de la requete */
    return Promise.reject(error);
  }
);

/* ============================================================
 * INTERCEPTEUR DE REPONSE - Gestion globale des erreurs
 * Execute apres chaque reponse recue du backend
 * ============================================================ */
api.interceptors.response.use(
  (response) => {
    /* Reponse reussie - on la retourne telle quelle */
    return response;
  },
  (error) => {
    /* Erreur 401 : token expire ou invalide -> deconnexion automatique */
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      /* Redirection vers la page de connexion */
      window.location.href = '/login';
    }

    /* Erreur 403 : acces refuse (role insuffisant) */
    if (error.response?.status === 403) {
      console.warn('Acces refuse : permissions insuffisantes');
    }

    return Promise.reject(error);
  }
);

export default api;

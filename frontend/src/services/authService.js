/*
 * Fichier     : authService.js
 * Role        : Service d'authentification - login, inscription, Google OAuth, logout
 *               Utilise des donnees fictives si VITE_USE_MOCK=true
 * Endpoints   : POST /auth/login | POST /auth/register | POST /auth/google | POST /auth/logout
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import api from './api';
import { USE_MOCK } from '../utils/constants';

/* ============================================================
 * DONNEES FICTIVES D'AUTHENTIFICATION (mode mock)
 * ============================================================ */

/* Utilisateur fictif expert */
const MOCK_EXPERT = {
  id:     1,
  nom:    'Boudiaf',
  prenom: 'Yassine',
  email:  'expert@ciar.dz',
  role:   'expert',
};

/* Utilisateur fictif admin */
const MOCK_ADMIN = {
  id:     2,
  nom:    'Admin',
  prenom: 'CIAR',
  email:  'admin@ciar.dz',
  role:   'admin',
};

/* Token fictif pour les sessions de developpement */
const MOCK_TOKEN = 'mock_jwt_token_ciar_dev_2026';

/* ============================================================
 * FONCTIONS D'AUTHENTIFICATION
 * ============================================================ */

/**
 * Connecte un utilisateur avec email et mot de passe.
 * En mode mock, accepte n'importe quel email/mot de passe.
 * @param {string} email    - Email de l'utilisateur
 * @param {string} password - Mot de passe
 * @returns {Promise<{token: string, user: Object}>}
 */
export const login = async (email, password) => {
  if (USE_MOCK) {
    /* Simulation d'un delai reseau de 800ms */
    await new Promise((resolve) => setTimeout(resolve, 800));

    /* Retourne le role admin si l'email contient 'admin' */
    const user = email.includes('admin') ? MOCK_ADMIN : MOCK_EXPERT;
    return { token: MOCK_TOKEN, user };
  }

  /* Appel reel a l'API backend */
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Inscrit un nouvel utilisateur.
 * @param {Object} formData - Donnees du formulaire d'inscription
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const register = async (formData) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: 'Compte cree avec succes. En attente de validation.' };
  }

  const response = await api.post('/auth/register', formData);
  return response.data;
};

/**
 * Connecte un utilisateur via Google OAuth.
 * Envoie le credential Google au backend pour validation.
 * @param {string} googleCredential - Token credential retourne par Google
 * @returns {Promise<{token: string, user: Object}>}
 */
export const loginWithGoogle = async (googleCredential) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { token: MOCK_TOKEN, user: MOCK_EXPERT };
  }

  const response = await api.post('/auth/google', { credential: googleCredential });
  return response.data;
};

/**
 * Deconnecte l'utilisateur cote serveur.
 * La deconnexion cote client est geree par AuthContext.
 * @returns {Promise<{success: boolean}>}
 */
export const logout = async () => {
  if (USE_MOCK) {
    return { success: true };
  }

  const response = await api.post('/auth/logout');
  return response.data;
};

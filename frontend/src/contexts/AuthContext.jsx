/*
 * Fichier     : AuthContext.jsx
 * Role        : Gestion globale de l'etat d'authentification
 *               Stocke l'utilisateur connecte, le token JWT et le role
 *               Persiste la session dans le localStorage
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

/* ============================================================
 * CREATION DU CONTEXTE
 * ============================================================ */
const AuthContext = createContext(null);

/* ============================================================
 * PROVIDER - COMPOSANT FOURNISSEUR DE L'AUTHENTIFICATION
 * ============================================================ */

/**
 * AuthProvider enveloppe l'application et expose l'etat d'auth global.
 * Au demarrage, recharge la session depuis le localStorage si elle existe.
 */
export const AuthProvider = ({ children }) => {

  /* --- Etat de l'utilisateur connecte : null si non connecte --- */
  const [user, setUser] = useState(null);

  /* --- Token JWT de la session courante --- */
  const [token, setToken] = useState(null);

  /* --- Indicateur de chargement initial (lecture localStorage) --- */
  const [isLoading, setIsLoading] = useState(true);

  /* --- Effet : recharge la session persistee au montage du composant --- */
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedUser  = localStorage.getItem(STORAGE_KEYS.USER);

    if (savedToken && savedUser) {
      try {
        /* Parse les donnees utilisateur sauvegardees */
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        /* Donnees corrompues - on nettoie le localStorage */
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    /* Fin du chargement initial */
    setIsLoading(false);
  }, []);

  /* ============================================================
   * FONCTIONS D'AUTHENTIFICATION
   * ============================================================ */

  /**
   * Connecte un utilisateur - sauvegarde token et donnees utilisateur.
   * Appele apres un login reussi (email/password ou Google OAuth).
   * @param {string} jwtToken - Token JWT retourne par l'API
   * @param {Object} userData - Donnees utilisateur { id, nom, prenom, email, role }
   */
  const login = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData);
    /* Persistance dans le localStorage pour survivre au rechargement */
    localStorage.setItem(STORAGE_KEYS.TOKEN, jwtToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  };

  /**
   * Deconnecte l'utilisateur - nettoie l'etat et le localStorage.
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  /* --- Calculs derives de l'etat --- */
  const isAuthenticated = !!token && !!user;
  const isAdmin  = user?.role === 'admin';
  const isExpert = user?.role === 'expert' || isAdmin;

  /* --- Valeurs exposees au contexte --- */
  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    isAdmin,
    isExpert,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* ============================================================
 * HOOK PERSONNALISE - useAuth
 * ============================================================ */

/**
 * Hook pour consommer le AuthContext dans n'importe quel composant.
 * @returns {{ user, token, isLoading, isAuthenticated, isAdmin, login, logout }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit etre utilise a l\'interieur d\'un AuthProvider');
  }
  return context;
};

export default AuthContext;

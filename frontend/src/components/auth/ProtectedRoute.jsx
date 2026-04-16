/*
 * Fichier     : ProtectedRoute.jsx
 * Role        : Composant de garde des routes privees
 *               Redirige vers /login si l'utilisateur n'est pas authentifie
 *               Attend la fin du chargement initial avant de decider
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/* ============================================================
 * COMPOSANT PROTECTED ROUTE
 * ============================================================ */

/**
 * Enveloppe les routes qui necessitent une authentification.
 * Si l'utilisateur n'est pas connecte -> redirection vers /login.
 * Pendant le chargement initial (lecture localStorage) -> rien n'est affiche.
 *
 * @param {React.ReactNode} children - Le composant de page a proteger
 */
const ProtectedRoute = ({ children }) => {

  /* Lecture de l'etat d'authentification depuis le contexte global */
  const { isAuthenticated, isLoading } = useAuth();

  /* Pendant le chargement initial, on ne rend rien pour eviter un flash */
  if (isLoading) {
    return null;
  }

  /* Si l'utilisateur n'est pas connecte, redirection vers la page de connexion */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* Utilisateur authentifie -> affichage du contenu protege */
  return children;
};

export default ProtectedRoute;

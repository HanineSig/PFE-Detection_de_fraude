/*
 * Fichier     : AppRouter.jsx
 * Role        : Configuration de toutes les routes de l'application
 *               Gere l'acces public/prive via ProtectedRoute
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

/* Pages publiques */
import AuthPage  from '../pages/AuthPage';
import NotFound  from '../pages/NotFound';

/* Pages protegees (necessite d'etre connecte) */
import Dashboard       from '../pages/Dashboard';
import AnalyseDossier  from '../pages/AnalyseDossier';
import GestionAlertes  from '../pages/GestionAlertes';
import Profil          from '../pages/Profil';

/* Layout principal avec sidebar et topbar */
import AppLayout from '../components/layout/AppLayout';

/* Composant de protection des routes privees */
import ProtectedRoute from '../components/auth/ProtectedRoute';

/* ============================================================
 * CONTENEUR PERSISTANT POUR L'AUTHENTIFICATION
 * Garantit que AuthPage ne se démonte jamais lors des transitions
 * ============================================================ */
const RouterInner = () => {
  const location = useLocation();
  const isAuth = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <div className={`h-full w-full absolute inset-0 z-50 ${isAuth ? 'block' : 'hidden'}`}>
        {/* On force le rendu permanent pour éviter les flash blancs React Router */}
        <AuthPage />
      </div>

      <div className={`h-full w-full absolute inset-0 z-0 ${!isAuth ? 'block' : 'hidden'}`}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/analyse/:id" element={<ProtectedRoute><AppLayout><AnalyseDossier /></AppLayout></ProtectedRoute>} />
          <Route path="/alertes" element={<ProtectedRoute><AppLayout><GestionAlertes /></AppLayout></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><AppLayout><Profil /></AppLayout></ProtectedRoute>} />
          {/* Fallback */}
          <Route path="*" element={!isAuth ? <NotFound /> : null} />
        </Routes>
      </div>
    </>
  );
};

/* ============================================================
 * CONFIGURATION DES ROUTES
 * ============================================================ */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterInner />
    </BrowserRouter>
  );
};

export default AppRouter;

/*
 * Fichier     : AppRouter.jsx
 * Role        : Configuration de toutes les routes de l'application
 *               Gere l'acces public/prive via ProtectedRoute
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* Pages publiques */
import SignUp    from '../pages/SignUp';
import Login     from '../pages/Login';
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
 * CONFIGURATION DES ROUTES
 * ============================================================ */

/**
 * AppRouter definit l'arborescence complete des routes de l'application.
 *
 * Structure :
 * - Routes publiques : /login, /signup -> accessibles sans connexion
 * - Routes protegees : / , /analyse/:id , /alertes , /profil
 *   -> redirige vers /login si non authentifie
 *   -> enveloppees dans AppLayout (sidebar + topbar)
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ----------------------------------------
         * ROUTES PUBLIQUES
         * Accessibles sans etre connecte
         * ---------------------------------------- */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Redirection de / vers /login si non connecte */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* ----------------------------------------
         * ROUTES PROTEGEES - Tableau de bord et fonctionnalites
         * Redirige vers /login si non authentifie
         * ---------------------------------------- */}
        <Route
          path="/analyse/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnalyseDossier />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/alertes"
          element={
            <ProtectedRoute>
              <AppLayout>
                <GestionAlertes />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Profil />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* ----------------------------------------
         * PAGE 404 - Toute route inconnue
         * ---------------------------------------- */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

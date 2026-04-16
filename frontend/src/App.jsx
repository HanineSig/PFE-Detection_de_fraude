/*
 * Fichier     : App.jsx
 * Role        : Composant racine de l'application - monte les providers globaux
 *               et le systeme de routage principal
 * Dependances : AppRouter, AuthContext, ThemeContext
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import AppRouter from './router/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';
import './styles/animations.css';

/* ============================================================
 * COMPOSANT RACINE
 * L'ordre des providers est important :
 * ThemeProvider en dehors pour que le theme soit disponible partout
 * AuthProvider a l'interieur pour gerer l'etat d'authentification
 * ============================================================ */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        {/* AppRouter contient toutes les routes de l'application */}
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

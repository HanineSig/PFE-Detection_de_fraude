/*
 * Fichier     : NotFound.jsx
 * Role        : Page 404 - affichee pour toute route inconnue
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

/* ============================================================
 * PAGE NOT FOUND
 * ============================================================ */

/**
 * Page d'erreur 404 affichee quand une route n'existe pas.
 * Propose un bouton de retour au tableau de bord.
 */
const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] px-6 text-center">

      {/* Icone decorative */}
      <div className="w-24 h-24 rounded-full bg-[var(--border-color)] flex items-center justify-center mb-8">
        <Search size={40} className="text-[var(--text-secondary)]" />
      </div>

      {/* Numero d'erreur */}
      <h1 className="text-8xl font-extrabold text-[var(--secondary-blue-mid)] mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
        Page introuvable
      </h2>
      <p className="text-[var(--text-secondary)] mb-8 max-w-md">
        La page que vous recherchez n'existe pas ou a ete deplacee.
      </p>

      {/* Bouton de retour */}
      <Button
        onClick={() => navigate('/')}
        leftIcon={<ArrowLeft size={16} />}
      >
        Retour au tableau de bord
      </Button>
    </div>
  );
};

export default NotFound;

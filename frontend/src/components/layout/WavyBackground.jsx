/*
 * Fichier     : WavyBackground.jsx
 * Role        : Panneau gauche decoratif des pages d'authentification (Login/SignUp)
 *               Affiche le logo CIAR, un titre, et un effet de vague graphique
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';

/* ============================================================
 * CONSTANTES
 * ============================================================ */

/* Statistiques affichees dans le panneau gauche */
const STATS = [
  { label: 'Dossiers analyses',  value: '12 000+' },
  { label: 'Taux de detection',  value: '94%'      },
  { label: 'Experts assistés',   value: '47'        },
];

/* ============================================================
 * COMPOSANT WAVY BACKGROUND
 * ============================================================ */

/**
 * Panneau gauche des pages d'authentification.
 * Occupe la moitie gauche de l'ecran (visible uniquement sur grands ecrans).
 * Applique un degrade et un effet de vague SVG en clip-path.
 */
const WavyBackground = () => {
  return (
    <div
      className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0A1931 0%, #1A3D63 50%, #4A7FA7 100%)',
        /* La vague est creee avec un clip-path SVG sur le bord droit du panneau */
        clipPath: 'polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)',
      }}
    >
      {/* ---- Cercles decoratifs en arriere-plan ---- */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        {/* Grand cercle en haut a droite */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-5" />
        {/* Cercle moyen en bas a gauche */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white opacity-5" />
      </div>

      {/* ---- En-tete : Logo + Nom du systeme ---- */}
      <div className="relative z-10">
        {/* Logo CIAR - rond avec initiales */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-tight">CI</span>
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">CIAR</p>
            <p className="text-[#B3CFE5] text-xs">Fraud Detection</p>
          </div>
        </div>

        {/* Titre principal */}
        <h1 className="text-white font-bold text-4xl leading-tight mb-4">
          Systeme d'Aide
          <br />
          a la Decision
        </h1>

        {/* Sous-titre */}
        <p className="text-[#B3CFE5] text-base leading-relaxed max-w-xs">
          Detectez les fraudes a l'assurance avec la puissance du Machine Learning
          et l'explicabilite SHAP.
        </p>
      </div>

      {/* ---- Statistiques ---- */}
      <div className="relative z-10 flex flex-col gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl px-4 py-3"
          >
            <span className="text-white font-bold text-2xl min-w-16">{stat.value}</span>
            <span className="text-[#B3CFE5] text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ---- Pied : info version ---- */}
      <div className="relative z-10">
        <p className="text-[#B3CFE5] text-xs opacity-60">
          CIAR Fraud Detection v1.0 — PFE M2 ISI 2025/2026
        </p>
      </div>
    </div>
  );
};

export default WavyBackground;

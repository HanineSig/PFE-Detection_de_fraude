import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname.includes('login');
  
  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden font-sans relative">
      
      {/* ================= BACKGROUNDS ANIMÉS ================= */}
      {/* Zone Blanche (Formulaire) */}
      <div 
        className="absolute top-0 h-full w-full lg:w-[55%] bg-[var(--bg-primary)] transition-all duration-700 ease-in-out z-0"
        style={{ left: isLogin ? '0%' : '45%' }}
      ></div>
      {/* Zone Bleue (Textes) */}
      <div 
        className="hidden lg:block absolute top-0 h-full w-[45%] bg-[var(--primary-dark)] transition-all duration-700 ease-in-out z-0"
        style={{ left: isLogin ? '55%' : '0%' }}
      ></div>

      {/* ================= WAVE SVG ANIMÉ ================= */}
      {/* La ligne directrice se déplace de 45% à 55% et se retourne (scaleX(-1)) pour inverser la vague ! */}
      <svg 
        className="hidden lg:block absolute top-0 w-[120px] xl:w-[150px] h-full z-0 transition-all duration-700 ease-in-out" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ 
           left: isLogin ? '55%' : '45%',
           transform: `translateX(-50%) ${isLogin ? 'scaleX(-1)' : 'scaleX(1)'}` 
        }}
      >
        {/* Courbe bleue (gauche) */}
        <path d="M50,0 Q 80,25 50,50 T 50,100 L0,100 L0,0 Z" fill="var(--primary-dark)" />
        {/* Courbe couleur de fond (droite) */}
        <path d="M50,0 Q 80,25 50,50 T 50,100 L100,100 L100,0 Z" fill="var(--bg-primary)" />
      </svg>

      {/* ================= COLONNE DE TEXTE ANIMÉE ================= */}
      <div 
        className="hidden lg:flex absolute top-0 h-full w-[45%] items-center justify-center z-10 transition-all duration-700 ease-in-out pointer-events-none"
        style={{ left: isLogin ? '55%' : '0%' }}
      >
        <div className="text-center px-8 -translate-y-8 animate-fade-in-up">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl border border-white/20">
            <ShieldCheck size={56} className="text-[var(--secondary-blue-light)]" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6 drop-shadow-lg">CIAR Fraud API</h1>
          {/* Transition fluide du texte */}
          <div className="relative h-8">
            <p className={`absolute w-full text-center text-[var(--secondary-blue-light)] text-xl font-semibold transition-all duration-500 ease-out ${isLogin ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Bon retour parmi nous.
            </p>
            <p className={`absolute w-full text-center text-[var(--secondary-blue-light)] text-xl font-semibold transition-all duration-500 ease-out ${!isLogin ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Sécurisez l'avenir de l'assurance.
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENEUR DES FORMULAIRES (OUTLET) ================= */}
      <div 
        className="absolute top-0 h-full w-full lg:w-[55%] z-10 transition-all duration-700 ease-in-out"
        style={{ left: isLogin ? '0%' : '45%' }}
      >
         <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;

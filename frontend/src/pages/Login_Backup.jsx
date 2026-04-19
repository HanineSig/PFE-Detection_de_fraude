import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import DarkModeToggle from '../components/ui/DarkModeToggle';

/* Icone Google Manuelle */
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrorMessage(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await new Promise(res => setTimeout(res, 800));
      if (formData.email && formData.password) {
        login('mock_jwt', { email: formData.email, role: 'expert' });
        navigate('/');
      } else {
        setErrorMessage("Identifiants incorrects.");
      }
    } catch (err) {
      setErrorMessage("Service indisponible.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    login('mock_jwt_google', { email: 'expert@google.com', role: 'expert' });
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden font-sans relative animate-auth-bg">

      {/* ================= BACKGROUNDS STATIQUES ================= */}
      <div className="hidden lg:flex absolute inset-0 z-0">
        <div className="w-[55%] h-full bg-[var(--bg-primary)]"></div>
        <div className="w-[45%] h-full bg-[var(--primary-dark)]"></div>
      </div>

      {/* ================= WAVE SVG STATIQUE (Inversée pour Login) ================= */}
      <svg
        className="hidden lg:block absolute top-0 left-[55%] w-[120px] xl:w-[150px] h-full -translate-x-1/2 z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Courbe couleur de fond (à gauche) */}
        <path d="M50,0 Q 150,20 50,50 T 50,100 L0,100 L0,0 Z" fill="var(--bg-primary)" />
        {/* Courbe bleue (à droite, pointant vers la gauche) */}
        <path d="M50,0 Q 130,20 50,50 T 50,100 L100,100 L100,0 Z" fill="var(--primary-dark)" />
      </svg>

      {/* ================= COLONNE GAUCHE (55%) : FORMULAIRE ================= */}
      <div className="w-full lg:w-[55%] flex flex-col relative justify-center py-12 sm:py-12 z-10 bg-[var(--bg-primary)] lg:bg-transparent">

        {/* Top Header : Dark Mode */}
        <div className="absolute top-8 left-8 lg:left-12 flex items-center z-50 animate-auth-form">
          <DarkModeToggle />
        </div>

        <div className="w-full z-10 animate-auth-form">
          <div className="w-full max-w-[400px] px-6 sm:px-12 mx-auto">
            <h2 className="text-3xl font-black text-[var(--text-primary)] mb-6 tracking-tight">Bon retour !</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-5">

              <Input
                id="email" type="email" placeholder="Adresse Email"
                value={formData.email} onChange={handleChange}
                leftIcon={<Mail size={18} />} required
              />

              <div className="space-y-3 mt-4">
                <Input
                  id="password" type={showPassword ? 'text' : 'password'} placeholder="Mot de passe"
                  value={formData.password} onChange={handleChange}
                  leftIcon={<Lock size={18} />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-[var(--primary-dark)] transition-colors focus:outline-none">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  required
                />
              </div>

              {errorMessage && <Alert type="error" message={errorMessage} className="mt-4" />}

              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                isLoading={isLoading}
                className="w-full bg-[var(--primary-dark)] text-white hover:bg-[var(--secondary-blue-dark)] py-3 text-base font-bold !mt-8 shadow-lg shadow-[var(--primary-dark)]/20 rounded-full"
              >
                Se connecter
              </Button>

              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-[var(--border-color)] absolute w-full" />
                <span className="bg-[var(--bg-primary)] px-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider relative z-10">
                  OU VIA
                </span>
              </div>

            </form>
          </div>

          {/* Ligne des boutons d'encastrement sur la gauche */}
          <div className="w-full relative px-0 flex justify-center items-center h-14 mt-2">

            {/* Bouton Créer un compte encastré à GAUCHE */}
            <div className="absolute left-0 top-0 bottom-0 flex items-center z-50">
              <NavLink to="/signup">
                <button className="flex flex-row-reverse items-center gap-2 bg-[var(--bg-card)] border-y-2 border-r-2 border-l-0 border-[var(--border-color)] text-[var(--primary-dark)] dark:text-white font-bold py-2 sm:py-3 pl-4 pr-4 sm:pr-6 rounded-r-full hover:bg-[var(--secondary-blue-light)] hover:text-white transition-all shadow-md">
                  <span className="hidden sm:inline">Créer un compte</span> <ArrowRight size={18} className="rotate-180" />
                </button>
              </NavLink>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[var(--border-color)] bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--secondary-blue-mid)] relative z-10"
            >
              <GoogleIcon />
            </button>

          </div>
        </div>

      </div>

      {/* ================= COLONNE DROITE (45%) : TEXTES ================= */}
      <div className="hidden lg:flex w-[45%] relative items-center justify-center z-10">
        <div className="text-center px-8 -translate-y-8 animate-auth-form">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl border border-white/20">
            <ShieldCheck size={56} className="text-[var(--secondary-blue-light)]" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6 drop-shadow-lg">CIAR Fraud API</h1>
          <p className="text-[var(--secondary-blue-light)] text-xl font-semibold opacity-90">Bon retour parmi nous.</p>
        </div>
      </div>

    </div>
  );
};

export default Login;

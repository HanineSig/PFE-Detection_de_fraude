import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { register } from '../services/authService';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
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

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', password: '', confirmPassword: '' });
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  /* Règles de mots de passe */
  const passwordRules = [
    { label: '8 caractères', valid: formData.password.length >= 8 },
    { label: 'Majuscule', valid: /[A-Z]/.test(formData.password) },
    { label: 'Spécial/Chiffre', valid: /[0-9!@#$%^&*()[\]_+-=\\{};':"|,.<>/?]/.test(formData.password) },
  ];

  const isPasswordValid = passwordRules.every((r) => r.valid);
  const isFormValid = Object.values(formData).every((v) => v.trim() !== '') && isPasswordValid && (formData.password === formData.confirmPassword);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrorMessage(null);
  };

  const handleGoogleLogin = () => {
    login('mock_jwt_google', { nom: 'Google', prenom: 'User', role: 'expert' });
    navigate('/');
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await register(formData);
      if (response.success) {
        setStep(2);
      } else {
        setErrorMessage(response.message || "Echec de l'inscription.");
      }
    } catch (err) {
      setErrorMessage("Une erreur réseau est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    if (value !== '' && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otpCode.join('');
    if (code.length !== 6) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await new Promise(res => setTimeout(res, 800));
      if (code === '123456') {
        login('mock_jwt', { nom: formData.nom, prenom: formData.prenom, role: 'expert' });
        navigate('/');
      } else {
        setErrorMessage("Le code est incorrect. Réessayez.");
      }
    } catch (error) {
      setErrorMessage("Une erreur réseau est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep2 = () => (
    <div className="w-full max-w-[420px] px-8 mx-auto animate-fade-in text-center mt-8">
      <div className="w-16 h-16 mx-auto mb-6 bg-[var(--primary-dark)] text-white rounded-full flex items-center justify-center shadow-lg">
        <Mail size={28} />
      </div>
      <h2 className="text-[32px] font-black text-[var(--text-primary)] mb-2 tracking-tight">Vérifiez vos emails</h2>
      <p className="text-[var(--text-secondary)] text-[15px] mb-10 font-medium leading-relaxed">
        Nous venons d'envoyer un code de sécurité à <br />
        <strong className="text-[var(--primary-dark)] dark:text-white">{formData.email}</strong>
      </p>

      <form onSubmit={handleOtpSubmit} className="space-y-8">
        <div className="flex justify-center gap-3">
          {otpCode.map((digit, index) => (
            <input
              key={index} id={`otp-${index}`} type="text" maxLength="1" value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !digit && index > 0) {
                  document.getElementById(`otp-${index - 1}`).focus();
                }
              }}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] focus:border-[var(--primary-dark)] focus:ring-4 focus:ring-[var(--primary-dark)]/10 outline-none transition-all dark:text-white shadow-sm"
              required
            />
          ))}
        </div>

        {errorMessage && <Alert type="error" message={errorMessage} className="text-left" />}

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={otpCode.join('').length !== 6 || isLoading}
          className="w-full bg-[var(--primary-dark)] py-[14px] text-base font-bold text-white hover:bg-[var(--secondary-blue-dark)] rounded-full shadow-lg shadow-[var(--primary-dark)]/20"
        >
          {isLoading ? "Vérification..." : "Vérifier l'email"}
        </Button>
      </form>
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden font-sans relative animate-auth-bg">

      {/* ================= BACKGROUNDS STATIQUES ================= */}
      <div className="hidden lg:flex absolute inset-0 z-0">
        <div className="w-[45%] h-full bg-[var(--primary-dark)]"></div>
        <div className="w-[55%] h-full bg-[var(--bg-primary)]"></div>
      </div>

      {/* ================= WAVE SVG STATIQUE ================= */}
      <svg
        className="hidden lg:block absolute top-0 left-[45%] w-[120px] xl:w-[150px] h-full -translate-x-1/2 z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M50,0 Q 150,25 50,50 T 50,100 L0,100 L0,0 Z" fill="var(--primary-dark)" />
        <path d="M50,0 Q 130,25 50,50 T 50,100 L100,100 L100,0 Z" fill="var(--bg-primary)" />
      </svg>

      {/* ================= COLONNE DE TEXTE (45% GAUCHE) ================= */}
      <div className="hidden lg:flex w-[45%] relative items-center justify-center z-10">
        <div className="text-center px-8 -translate-y-8 animate-auth-form">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl border border-white/20">
            <ShieldCheck size={56} className="text-[var(--secondary-blue-light)]" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6 drop-shadow-lg">CIAR Fraud API</h1>
          <p className="text-[var(--secondary-blue-light)] text-xl font-semibold opacity-90">Sécurisez l'avenir de l'assurance.</p>
        </div>
      </div>

      {/* ================= COLONNE DROITE (55%) : FORMULAIRE ================= */}
      <div className="w-full lg:w-[55%] flex flex-col relative justify-center py-12 sm:py-12 z-10 bg-[var(--bg-primary)] lg:bg-transparent">

        {/* Top Header : Dark Mode */}
        <div className="absolute top-8 right-8 lg:right-12 flex items-center z-50 animate-auth-form">
          <DarkModeToggle />
        </div>

        <div className="w-full z-10 animate-auth-form">
          {step === 1 ? (
            <div className="w-full">
              <div className="w-full max-w-[440px] px-6 sm:px-12 mx-auto">
                <h2 className="text-3xl font-black text-[var(--text-primary)] mb-6 tracking-tight">Créer un compte</h2>
                <form onSubmit={handleSignUpSubmit} className="space-y-4">

                  {/* Noms et Prénoms */}
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Input
                      id="prenom" placeholder="Prénom"
                      value={formData.prenom} onChange={handleChange}
                      leftIcon={<User size={18} />} required
                      className="flex-1"
                    />
                    <Input
                      id="nom" placeholder="Nom"
                      value={formData.nom} onChange={handleChange}
                      required
                      className="flex-1"
                    />
                  </div>

                  {/* Email */}
                  <Input
                    id="email" type="email" placeholder="Adresse Email"
                    value={formData.email} onChange={handleChange}
                    leftIcon={<Mail size={18} />} required
                  />

                  {/* Mot de passe */}
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

                    {/* Règles de mot de passe */}
                    <div className="pt-2 px-2">
                      <p className="text-xs font-bold text-[var(--text-secondary)] mb-3">Le mot de passe doit contenir :</p>
                      <div className="flex flex-wrap gap-y-2 gap-x-4">
                        {passwordRules.map((rule, idx) => (
                          <span
                            key={idx}
                            className={`flex items-center gap-1.5 text-xs font-semibold transition-all duration-500 ease-out ${rule.valid
                              ? "text-[var(--color-success)] translate-x-1"
                              : "text-gray-400 dark:text-gray-500"
                              }`}
                          >
                            <CheckCircle2 size={15} className={`transition-all duration-500 ${rule.valid ? "scale-110 opacity-100 drop-shadow-sm" : "opacity-30 grayscale"}`} />
                            {rule.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Confirmation du mot de passe */}
                  <Input
                    id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmer le mot de passe"
                    value={formData.confirmPassword} onChange={handleChange}
                    leftIcon={<Lock size={18} />}
                    rightIcon={
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="hover:text-[var(--primary-dark)] transition-colors focus:outline-none">
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    error={formData.confirmPassword && formData.password !== formData.confirmPassword ? "Mots de passe différents" : null}
                    required
                  />

                  {errorMessage && <Alert type="error" message={errorMessage} />}

                  {/* BOUTON SOUMISSION */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    isLoading={isLoading}
                    className="w-full bg-[var(--primary-dark)] text-white hover:bg-[var(--secondary-blue-dark)] py-3 text-base font-bold !mt-6 shadow-lg shadow-[var(--primary-dark)]/20 rounded-full"
                  >
                    Créer mon compte
                  </Button>

                  {/* Séparateur pour Google */}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="border-t border-[var(--border-color)] absolute w-full" />
                    <span className="bg-[var(--bg-primary)] px-4 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider relative z-10">
                      OU VIA
                    </span>
                  </div>

                </form>
              </div>

              {/* Ligne des boutons d'encastrement sur la droite */}
              <div className="w-full relative px-0 mt-2 flex justify-center items-center h-14">

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[var(--border-color)] bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--secondary-blue-mid)] relative z-10"
                >
                  <GoogleIcon />
                </button>

                {/* Bouton Se connecter encastré à DROITE */}
                <div className="absolute right-0 top-0 bottom-0 flex items-center z-50">
                  <NavLink to="/login">
                    <button className="flex items-center gap-2 bg-[var(--bg-card)] border-y-2 border-l-2 border-r-0 border-[var(--border-color)] text-[var(--primary-dark)] dark:text-white font-bold py-2 sm:py-3 pr-4 pl-4 sm:pl-6 rounded-l-full hover:bg-[var(--secondary-blue-light)] hover:text-white transition-all shadow-md">
                      <span className="hidden sm:inline">Se connecter</span> <ArrowRight size={18} />
                    </button>
                  </NavLink>
                </div>

              </div>
            </div>
          ) : renderStep2()}
        </div>

      </div>

    </div>
  );
};

export default SignUp;

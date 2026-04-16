/*
 * Fichier     : validators.js
 * Role        : Fonctions de validation des formulaires - utilisees dans SignUp et Login
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * VALIDATION DE L'EMAIL
 * ============================================================ */

/**
 * Verifie si une adresse email est valide.
 * @param {string} email - Email a valider
 * @returns {string|null} Message d'erreur ou null si valide
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return "L'email est obligatoire.";
  }
  /* Expression reguliere standard de validation d'email */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "L'email n'est pas valide.";
  }
  return null;
};

/* ============================================================
 * VALIDATION DU MOT DE PASSE
 * ============================================================ */

/**
 * Verifie si un mot de passe respecte les regles de securite.
 * Regles : minimum 8 caracteres, une majuscule, un chiffre
 * @param {string} password - Mot de passe a valider
 * @returns {string|null} Message d'erreur ou null si valide
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Le mot de passe est obligatoire.';
  }
  if (password.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caracteres.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une majuscule.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre.';
  }
  return null;
};

/**
 * Verifie que la confirmation de mot de passe correspond.
 * @param {string} password        - Mot de passe original
 * @param {string} confirmPassword - Confirmation a comparer
 * @returns {string|null} Message d'erreur ou null si correspondance
 */
export const validatePasswordConfirm = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return 'La confirmation du mot de passe est obligatoire.';
  }
  if (password !== confirmPassword) {
    return 'Les mots de passe ne correspondent pas.';
  }
  return null;
};

/* ============================================================
 * VALIDATION DES CHAMPS TEXTE
 * ============================================================ */

/**
 * Verifie qu'un champ obligatoire n'est pas vide.
 * @param {string} value     - Valeur a verifier
 * @param {string} fieldName - Nom du champ pour le message d'erreur
 * @returns {string|null} Message d'erreur ou null si valide
 */
export const validateRequired = (value, fieldName = 'Ce champ') => {
  if (!value || value.trim() === '') {
    return `${fieldName} est obligatoire.`;
  }
  return null;
};

/**
 * Verifie la longueur minimale d'un champ texte.
 * @param {string} value     - Valeur a verifier
 * @param {number} minLen    - Longueur minimale requise
 * @param {string} fieldName - Nom du champ pour le message d'erreur
 * @returns {string|null} Message d'erreur ou null si valide
 */
export const validateMinLength = (value, minLen, fieldName = 'Ce champ') => {
  if (!value || value.trim().length < minLen) {
    return `${fieldName} doit contenir au moins ${minLen} caracteres.`;
  }
  return null;
};

/* ============================================================
 * VALIDATION DU FORMULAIRE D'INSCRIPTION COMPLET
 * ============================================================ */

/**
 * Valide l'ensemble du formulaire d'inscription.
 * Retourne un objet contenant tous les messages d'erreur
 * @param {Object} formData - Donnees du formulaire
 * @returns {Object} Objet d'erreurs { champ: message | null }
 */
export const validateSignUpForm = (formData) => {
  return {
    nom:             validateRequired(formData.nom, 'Le nom'),
    prenom:          validateRequired(formData.prenom, 'Le prenom'),
    email:           validateEmail(formData.email),
    password:        validatePassword(formData.password),
    confirmPassword: validatePasswordConfirm(formData.password, formData.confirmPassword),
    role:            validateRequired(formData.role, 'Le role'),
  };
};

/**
 * Verifie si un objet d'erreurs contient au moins une erreur.
 * Utilise pour bloquer la soumission d'un formulaire invalide.
 * @param {Object} errors - Objet retourne par une fonction validateXxxForm
 * @returns {boolean} true si au moins une erreur existe
 */
export const hasErrors = (errors) => {
  return Object.values(errors).some((erreur) => erreur !== null);
};

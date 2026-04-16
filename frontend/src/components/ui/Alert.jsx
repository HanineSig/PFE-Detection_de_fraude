/*
 * Fichier     : Alert.jsx
 * Role        : Composant d'alerte/notification - messages de succes, erreur, info, warning
 *               Utilise dans les formulaires et pour les retours d'action utilisateur
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

/* ============================================================
 * CONSTANTES DE STYLE
 * ============================================================ */

/* Configuration visuelle par type d'alerte */
const ALERT_CONFIGS = {
  success: {
    classes: 'bg-green-50  border-green-200  text-green-800  dark:bg-green-900/20 dark:border-green-700 dark:text-green-300',
    Icon:    CheckCircle,
  },
  error: {
    classes: 'bg-red-50    border-red-200    text-red-800    dark:bg-red-900/20   dark:border-red-700   dark:text-red-300',
    Icon:    AlertCircle,
  },
  warning: {
    classes: 'bg-amber-50  border-amber-200  text-amber-800  dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-300',
    Icon:    AlertTriangle,
  },
  info: {
    classes: 'bg-blue-50   border-blue-200   text-blue-800   dark:bg-blue-900/20  dark:border-blue-700  dark:text-blue-300',
    Icon:    Info,
  },
};

/* ============================================================
 * COMPOSANT ALERT
 * ============================================================ */

/**
 * Affiche un message d'alerte contextuel avec icone et bouton de fermeture.
 * @param {string}   type      - Type : 'success' | 'error' | 'warning' | 'info'
 * @param {string}   message   - Message principal a afficher
 * @param {string}   title     - Titre optionnel (en gras)
 * @param {boolean}  dismissible - Affiche un bouton de fermeture si true
 * @param {Function} onDismiss - Callback appele lors de la fermeture
 * @param {string}   className - Classes supplementaires
 */
const Alert = ({
  type        = 'info',
  message,
  title,
  dismissible = false,
  onDismiss,
  className   = '',
}) => {

  /* --- Configuration selon le type d'alerte --- */
  const config = ALERT_CONFIGS[type] || ALERT_CONFIGS.info;
  const { classes, Icon } = config;

  /* Ne rien afficher si pas de message */
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3
        p-4 rounded-lg border
        text-sm
        animate-fade-in
        ${classes}
        ${className}
      `}
    >
      {/* Icone du type d'alerte */}
      <Icon size={18} className="flex-shrink-0 mt-0.5" />

      {/* Contenu textuel */}
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <p>{message}</p>
      </div>

      {/* Bouton de fermeture - visible seulement si dismissible=true */}
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Fermer cette alerte"
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;

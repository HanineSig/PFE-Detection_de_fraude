/*
 * Fichier     : mockStats.js
 * Role        : Donnees fictives de statistiques pour le tableau de bord
 *               Simule les reponses de GET /api/dashboard/stats et /api/dashboard/alertes
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * STATISTIQUES PRINCIPALES DU DASHBOARD
 * KPIs affiches dans les cartes en haut du tableau de bord
 * ============================================================ */
export const mockStats = {
  /* Total des dossiers de sinistres en base */
  total_dossiers: 1247,

  /* Pourcentage de dossiers suspects (score > SEUIL_MOYEN) */
  pct_risque: 18.4,

  /* Dossiers actuellement en cours de traitement */
  dossiers_en_cours: 84,

  /* Alertes ouvertes non traitees */
  alertes_actives: 29,

  /* Comparaison avec le mois precedent (en pourcentage) */
  tendances: {
    total_dossiers:   +5.2,   /* +5.2% par rapport au mois precedent */
    pct_risque:       -2.1,   /* -2.1% (amelioration) */
    dossiers_en_cours: +12.0,
    alertes_actives:  -8.3,   /* -8.3% (amelioration) */
  },
};

/* ============================================================
 * EVOLUTION DES FRAUDES PAR MOIS - pour le graphique LineChart
 * Donnees des 12 derniers mois
 * ============================================================ */
export const mockEvolutionFraudes = [
  { mois: 'Jan',  total: 98,  fraudes: 14, suspects: 22 },
  { mois: 'Fev',  total: 112, fraudes: 18, suspects: 28 },
  { mois: 'Mar',  total: 89,  fraudes: 11, suspects: 19 },
  { mois: 'Avr',  total: 134, fraudes: 24, suspects: 31 },
  { mois: 'Mai',  total: 121, fraudes: 19, suspects: 25 },
  { mois: 'Jun',  total: 145, fraudes: 31, suspects: 38 },
  { mois: 'Jul',  total: 103, fraudes: 15, suspects: 21 },
  { mois: 'Aou',  total: 97,  fraudes: 12, suspects: 18 },
  { mois: 'Sep',  total: 118, fraudes: 22, suspects: 29 },
  { mois: 'Oct',  total: 142, fraudes: 28, suspects: 35 },
  { mois: 'Nov',  total: 156, fraudes: 33, suspects: 42 },
  { mois: 'Dec',  total: 131, fraudes: 26, suspects: 37 },
];

/* ============================================================
 * REPARTITION PAR NIVEAU - pour le graphique PieChart
 * ============================================================ */
export const mockRepartition = [
  { name: 'Faible',  value: 68, fill: '#22C55E' },
  { name: 'Moyen',   value: 24, fill: '#F59E0B' },
  { name: 'Eleve',   value: 8,  fill: '#EF4444' },
];

/* ============================================================
 * ALERTES ACTIVES - pour le widget alertes du dashboard
 * ============================================================ */
export const mockAlertes = [
  {
    id:         1,
    id_dossier: 4,
    num_police: 'POL-2025-0203',
    assure:     'Ziani Farida',
    score:      0.91,
    niveau:     'ELEVE',
    statut:     'non_traite',
    created_at: '2025-09-30T10:22:00Z',
  },
  {
    id:         2,
    id_dossier: 1,
    num_police: 'POL-2025-0042',
    assure:     'Benali Karim',
    score:      0.82,
    niveau:     'ELEVE',
    statut:     'en_cours',
    created_at: '2025-11-18T14:05:00Z',
  },
  {
    id:         3,
    id_dossier: 2,
    num_police: 'POL-2025-0078',
    assure:     'Meziane Sara',
    score:      0.45,
    niveau:     'MOYEN',
    statut:     'non_traite',
    created_at: '2025-12-02T09:30:00Z',
  },
];

/*
 * Fichier     : mockAnalyse.js
 * Role        : Donnees fictives de resultats d'analyse ML
 *               Simule la reponse de POST /api/analyser/:id
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * RESULTAT D'ANALYSE ML FICTIF
 * Simule le retour complet d'une analyse XGBoost + regles metier + SHAP
 * ============================================================ */

/**
 * Retourne un resultat d'analyse fictif pour un dossier donne.
 * Le score varie selon l'id pour tester les differentes configurations visuelles.
 * @param {number} dossierId - Identifiant du dossier
 * @returns {Object} Resultat d'analyse simule
 */
export const getMockAnalyse = (dossierId) => ({
  id_dossier: dossierId,
  score:      0.82,
  niveau:     'ELEVE',

  /* Resume textuel de l'analyse - affiche a l'expert */
  resume: 'Ce dossier presente plusieurs indicateurs suspects.'
    + ' Le delai de declaration anormalement long (8 jours),'
    + ' combine a l\'historique de sinistres de l\'assure (4 precedents)'
    + ' et la valeur declaree proche du plafond du vehicule,'
    + ' suggerent un risque eleve de fraude.',

  /* ----------------------------------------------------------------
   * FACTEURS DE RISQUE IDENTIFIES
   * list de facteurs avec leur contribution au score (poids)
   * poids positif = augmente le risque | poids negatif = diminue le risque
   * ---------------------------------------------------------------- */
  facteurs: [
    {
      code:        'DELAI_DECLARATION',
      label:       'Delai de declaration anormal',
      description: 'Declaration effectuee 8 jours apres le sinistre (seuil : 7 jours)',
      contribution: +0.28,
      type:        'ALERTE',
    },
    {
      code:        'HISTORIQUE_SINISTRES',
      label:       'Historique de sinistres eleve',
      description: '4 sinistres declares au cours des 3 dernieres annees',
      contribution: +0.21,
      type:        'ALERTE',
    },
    {
      code:        'MONTANT_PROCHE_VALEUR',
      label:       'Montant proche de la valeur assuree',
      description: 'Montant declare represent 70% de la valeur du vehicule',
      contribution: +0.18,
      type:        'ALERTE',
    },
    {
      code:        'LIEU_INCOHERENCE',
      label:       'Incoherence lieu sinistre',
      description: 'Le lieu declare est eloigne du domicile et du lieu de travail de l\'assure',
      contribution: +0.15,
      type:        'ALERTE',
    },
    {
      code:        'CONTRAT_RECENT',
      label:       'Sinistre peu apres souscription',
      description: 'Le sinistre s\'est produit 4 mois apres la souscription du contrat',
      contribution: +0.10,
      type:        'ALERTE',
    },
    {
      code:        'VEHICULE_RECENT',
      label:       'Vehicule recent et bien entretenu',
      description: 'Le vehicule a ete achete il y a moins de 2 ans, aucun antecedent',
      contribution: -0.08,
      type:        'FACTEUR_FAVORABLE',
    },
  ],

  /* ----------------------------------------------------------------
   * VALEURS SHAP - Contributions par feature pour le graphique SHAP
   * Represente l'importance de chaque variable dans la prediction
   * ---------------------------------------------------------------- */
  shap_values: [
    { feature: 'Delai declaration (jours)',         valeur:  0.28 },
    { feature: 'Nb sinistres historique',            valeur:  0.21 },
    { feature: 'Ratio montant / valeur vehicule',   valeur:  0.18 },
    { feature: 'Distance domicile - sinistre (km)', valeur:  0.15 },
    { feature: 'Anciennete contrat (mois)',          valeur:  0.10 },
    { feature: 'Type sinistre : accident',           valeur:  0.06 },
    { feature: 'Age vehicule (annees)',              valeur: -0.08 },
  ],

  /* Contribution des regles metier vs modele ML au score final */
  decomposition_score: {
    regles_metier: 0.24,  /* 30% du score final */
    modele_ml:     0.58,  /* 70% du score final */
  },

  /* Date de l'analyse */
  created_at: new Date().toISOString(),
});

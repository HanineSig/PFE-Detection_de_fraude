/*
 * Fichier     : mockDossiers.js
 * Role        : Donnees fictives de dossiers de sinistres pour le developpement frontend
 *               Permet de travailler sans backend. Remplace par les vrais appels API
 *               quand VITE_USE_MOCK=false dans .env
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * LISTE DES DOSSIERS FICTIFS
 * Represente des sinistres automobiles avec diverses configurations
 * pour tester tous les cas d'affichage
 * ============================================================ */
export const mockDossiers = [
  {
    id:               1,
    num_police:       'POL-2025-0042',
    type_sinistre:    'Accident materiel',
    date_sinistre:    '2025-11-10',
    date_declaration: '2025-11-18',
    lieu_sinistre:    'Alger - Route nationale 1',
    montant_declare:  850000,
    statut:           'en_cours',
    score_fraude:     0.82,
    niveau_risque:    'ELEVE',
    assure: {
      id:     101,
      nom:    'Benali',
      prenom: 'Karim',
      nb_sinistres_historique: 4,
    },
    vehicule: {
      immatriculation: '16-241-01',
      marque:          'Peugeot',
      modele:          '301',
      annee:           2019,
      valeur_assurance: 1200000,
    },
  },
  {
    id:               2,
    num_police:       'POL-2025-0078',
    type_sinistre:    'Vol',
    date_sinistre:    '2025-12-01',
    date_declaration: '2025-12-02',
    lieu_sinistre:    'Oran - Centre ville',
    montant_declare:  2300000,
    statut:           'non_traite',
    score_fraude:     0.45,
    niveau_risque:    'MOYEN',
    assure: {
      id:     102,
      nom:    'Meziane',
      prenom: 'Sara',
      nb_sinistres_historique: 1,
    },
    vehicule: {
      immatriculation: '31-088-02',
      marque:          'Renault',
      modele:          'Symbol',
      annee:           2021,
      valeur_assurance: 2500000,
    },
  },
  {
    id:               3,
    num_police:       'POL-2025-0115',
    type_sinistre:    'Accident corporel',
    date_sinistre:    '2025-10-22',
    date_declaration: '2025-10-23',
    lieu_sinistre:    'Constantine - Boulevard du 1er Novembre',
    montant_declare:  320000,
    statut:           'valide',
    score_fraude:     0.12,
    niveau_risque:    'FAIBLE',
    assure: {
      id:     103,
      nom:    'Hamidi',
      prenom: 'Mohamed',
      nb_sinistres_historique: 0,
    },
    vehicule: {
      immatriculation: '25-017-03',
      marque:          'Toyota',
      modele:          'Corolla',
      annee:           2020,
      valeur_assurance: 3200000,
    },
  },
  {
    id:               4,
    num_police:       'POL-2025-0203',
    type_sinistre:    'Incendie',
    date_sinistre:    '2025-09-15',
    date_declaration: '2025-09-30',
    lieu_sinistre:    'Annaba - Zone industrielle',
    montant_declare:  5600000,
    statut:           'en_cours',
    score_fraude:     0.91,
    niveau_risque:    'ELEVE',
    assure: {
      id:     104,
      nom:    'Ziani',
      prenom: 'Farida',
      nb_sinistres_historique: 6,
    },
    vehicule: {
      immatriculation: '23-054-04',
      marque:          'Mercedes',
      modele:          'C200',
      annee:           2018,
      valeur_assurance: 6500000,
    },
  },
  {
    id:               5,
    num_police:       'POL-2025-0267',
    type_sinistre:    'Accident materiel',
    date_sinistre:    '2025-12-10',
    date_declaration: '2025-12-11',
    lieu_sinistre:    'Blida - Autoroute Est-Ouest',
    montant_declare:  180000,
    statut:           'valide',
    score_fraude:     0.08,
    niveau_risque:    'FAIBLE',
    assure: {
      id:     105,
      nom:    'Rahmani',
      prenom: 'Ahmed',
      nb_sinistres_historique: 1,
    },
    vehicule: {
      immatriculation: '09-122-05',
      marque:          'Volkswagen',
      modele:          'Polo',
      annee:           2022,
      valeur_assurance: 2100000,
    },
  },
];

/**
 * Recherche un dossier par son identifiant.
 * Simule l'appel GET /api/dossiers/:id
 * @param {number} id - Identifiant du dossier
 * @returns {Object|undefined} Le dossier trouve ou undefined
 */
export const getMockDossierById = (id) => {
  const numId = parseInt(id, 10);
  return mockDossiers.find((d) => d.id === numId);
};

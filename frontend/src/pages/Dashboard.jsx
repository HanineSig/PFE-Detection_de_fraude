/*
 * Fichier     : Dashboard.jsx
 * Role        : Page principale du tableau de bord
 *               Affiche les KPIs, graphiques d'evolution et tableau des dossiers recents
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React, { useEffect, useState } from 'react';
import Loader from '../components/ui/Loader';
import Alert  from '../components/ui/Alert';
import { getStats, getEvolutionFraudes, getRepartition, getAlertesDashboard } from '../services/dashboardService';
import { getDossiers } from '../services/dossiersService';

/* Composants du dashboard */
import KPICard              from '../components/dashboard/KPICard';
import FraudChart           from '../components/dashboard/FraudChart';
import RepartitionChart     from '../components/dashboard/RepartitionChart';
import RecentDossiersTable  from '../components/dashboard/RecentDossiersTable';

/* ============================================================
 * PAGE DASHBOARD
 * ============================================================ */

/**
 * Tableau de bord principal.
 * Charge en parallele les KPIs, les donnees de graphiques et les dossiers recents.
 */
const Dashboard = () => {

  /* --- Etats des donnees --- */
  const [stats,     setStats]     = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [repartition, setRepartition] = useState([]);
  const [dossiers,  setDossiers]  = useState([]);

  /* --- Etats UI --- */
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState(null);

  /* --- Chargement de toutes les donnees au montage --- */
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        /* Chargement en parallele pour optimiser les temps de reponse */
        const [statsData, evolutionData, repartitionData, dossiersData] = await Promise.all([
          getStats(),
          getEvolutionFraudes(),
          getRepartition(),
          getDossiers({ limit: 10 }),
        ]);

        setStats(statsData);
        setEvolution(evolutionData);
        setRepartition(repartitionData);
        setDossiers(dossiersData.data || dossiersData);

      } catch (err) {
        setError('Impossible de charger les donnees du tableau de bord.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  /* --- Affichage pendant le chargement --- */
  if (isLoading) {
    return <Loader message="Chargement du tableau de bord..." fullPage />;
  }

  /* --- Affichage en cas d'erreur --- */
  if (error) {
    return (
      <div className="p-6">
        <Alert type="error" message={error} title="Erreur de chargement" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">

      {/* ---- Titre de section ---- */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Tableau de bord
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Vue d'ensemble de l'activite de detection de fraude
        </p>
      </div>

      {/* ---- KPIs : 4 cartes en grille ---- */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard
            title="Total dossiers"
            value={stats.total_dossiers}
            tendance={stats.tendances.total_dossiers}
            type="total"
          />
          <KPICard
            title="Taux de risque"
            value={`${stats.pct_risque}%`}
            tendance={stats.tendances.pct_risque}
            type="risque"
            invertTendance
          />
          <KPICard
            title="Dossiers en cours"
            value={stats.dossiers_en_cours}
            tendance={stats.tendances.dossiers_en_cours}
            type="encours"
          />
          <KPICard
            title="Alertes actives"
            value={stats.alertes_actives}
            tendance={stats.tendances.alertes_actives}
            type="alertes"
            invertTendance
          />
        </div>
      )}

      {/* ---- Graphiques : evolution + repartition ---- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Graphique d'evolution sur 12 mois (prend 2/3 de la largeur) */}
        <div className="xl:col-span-2">
          <FraudChart data={evolution} />
        </div>

        {/* Graphique de repartition (prend 1/3 de la largeur) */}
        <div className="xl:col-span-1">
          <RepartitionChart data={repartition} />
        </div>
      </div>

      {/* ---- Tableau des dossiers recents ---- */}
      <RecentDossiersTable dossiers={dossiers} />

    </div>
  );
};

export default Dashboard;

/*
 * Fichier     : FraudChart.jsx
 * Role        : Graphique d'evolution des fraudes detectees sur 12 mois
 *               Utilise Recharts LineChart - affiche 3 series : total, fraudes, suspects
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';

/* ============================================================
 * COMPOSANT INFOBULLE PERSONNALISEE
 * ============================================================ */

/**
 * Infobulle personnalisee affichee au survol du graphique.
 * Remplace le tooltip par defaut de Recharts.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 shadow-[var(--shadow-md)] text-sm">
      <p className="font-semibold text-[var(--text-primary)] mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-[var(--text-secondary)]">{entry.name} :</span>
          <span className="font-semibold text-[var(--text-primary)]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

/* ============================================================
 * COMPOSANT FRAUD CHART
 * ============================================================ */

/**
 * Graphique en courbes de l'evolution des dossiers sur 12 mois.
 * @param {Array} data - Tableau de { mois, total, fraudes, suspects }
 */
const FraudChart = ({ data = [] }) => {
  return (
    <Card className="h-full">
      <Card.Header title="Evolution des fraudes (12 mois)" />

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>

          {/* Grille de fond */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            vertical={false}
          />

          {/* Axe horizontal - mois */}
          <XAxis
            dataKey="mois"
            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
            axisLine={false}
            tickLine={false}
          />

          {/* Axe vertical - nombre de dossiers */}
          <YAxis
            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
            axisLine={false}
            tickLine={false}
          />

          {/* Infobulle personnalisee */}
          <Tooltip content={<CustomTooltip />} />

          {/* Legende */}
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
          />

          {/* Courbe du total des dossiers */}
          <Line
            type="monotone"
            dataKey="total"
            name="Total dossiers"
            stroke="#4A7FA7"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />

          {/* Courbe des fraudes detectees */}
          <Line
            type="monotone"
            dataKey="fraudes"
            name="Fraudes detectees"
            stroke="#EF4444"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />

          {/* Courbe des dossiers suspects */}
          <Line
            type="monotone"
            dataKey="suspects"
            name="Dossiers suspects"
            stroke="#F59E0B"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default FraudChart;

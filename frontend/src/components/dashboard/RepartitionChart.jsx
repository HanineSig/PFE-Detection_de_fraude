/*
 * Fichier     : RepartitionChart.jsx
 * Role        : Graphique en camembert de la repartition des dossiers par niveau de risque
 *               Utilise Recharts PieChart - 3 segments : Faible / Moyen / Eleve
 * Auteur      : PFE CIAR - M2 ISI 2025/2026
 */

/* ============================================================
 * IMPORTS
 * ============================================================ */
import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import Card from '../ui/Card';

/* ============================================================
 * COMPOSANT INFOBULLE PERSONNALISEE
 * ============================================================ */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 shadow-[var(--shadow-md)] text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.payload.fill }} />
        <span className="font-semibold text-[var(--text-primary)]">{item.name}</span>
        <span className="text-[var(--text-secondary)]">: {item.value}%</span>
      </div>
    </div>
  );
};

/* ============================================================
 * COMPOSANT REPARTITION CHART
 * ============================================================ */

/**
 * Camembert de repartition par niveau de risque.
 * @param {Array} data - Tableau de { name, value, fill }
 */
const RepartitionChart = ({ data = [] }) => {
  return (
    <Card className="h-full">
      <Card.Header title="Repartition par niveau" />

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}     /* Donut chart - trou au centre */
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legende manuelle sous le graphique */}
      <div className="flex flex-col gap-2 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.fill }} />
              <span className="text-[var(--text-secondary)]">{item.name}</span>
            </div>
            <span className="font-semibold text-[var(--text-primary)]">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RepartitionChart;

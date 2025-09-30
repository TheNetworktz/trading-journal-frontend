// frontend/src/components/StatsDashboard.js

import React from 'react';
import './StatsDashboard.css'; // We will create this CSS file next

// This component receives the 'stats' object as a prop
function StatsDashboard({ stats }) {
  return (
    <div className="stats-container">
      <h2>Overall Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Net R</h3>
          <p className={stats.net_r >= 0 ? 'positive' : 'negative'}>
            {stats.net_r}
          </p>
        </div>
        <div className="stat-card">
          <h3>Win Rate</h3>
          <p>{stats.win_rate}%</p>
        </div>
        <div className="stat-card">
          <h3>Total Trades</h3>
          <p>{stats.total_trades}</p>
        </div>
        <div className="stat-card">
          <h3>Avg. R/Trade</h3>
          <p className={stats.average_r_per_trade >= 0 ? 'positive' : 'negative'}>
            {stats.average_r_per_trade}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;

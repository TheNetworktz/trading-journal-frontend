// frontend/src/pages/TraderPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StatsDashboard from '../components/StatsDashboard';
import PerformanceChart from '../components/PerformanceChart';
import TradesTable from '../components/TradesTable';

function TraderPage() {
  const { groupId, traderId } = useParams();
  const location = useLocation();
  const traderName = location.state?.traderName || 'Trader';

  const [traderData, setTraderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupId || !traderId) return;

    const apiUrl = `https://trading-journal-backend-kem0.onrender.com/api/groups/${groupId}/traders/${traderId}/data`;

    fetch(apiUrl )
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTraderData(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      });
  }, [groupId, traderId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!traderData) {
    return <div>Loading trading data...</div>;
  }

  return (
    <div>
      <h2>{traderName}'s Performance</h2>
      <StatsDashboard stats={traderData.stats} />

      {/* Check if there are any trades before showing the chart and table */}
      {traderData.trades.length > 0 ? (
        <>
          <PerformanceChart trades={traderData.trades} />
          <TradesTable trades={traderData.trades} />
        </>
      ) : (
        // If no trades, show a helpful message
        <div style={{ textAlign: 'center', fontStyle: 'italic', padding: '40px', backgroundColor: '#1e1e1e', marginTop: '40px', borderRadius: '8px' }}>
          <h3>No Trade Data Available</h3>
          <p>This trader has not logged any valid trades yet.</p>
        </div>
      )}
    </div>
  );
}

export default TraderPage;

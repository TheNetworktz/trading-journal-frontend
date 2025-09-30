// frontend/src/pages/GroupPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatsDashboard from '../components/StatsDashboard';
import './GroupPage.css';

function GroupPage() {
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupId) return;

    // --- THIS IS THE FIX ---
    // The URL now correctly includes the full path to the API endpoint.
    const apiUrl = `https://trading-journal-backend-kem0.onrender.com/api/groups/${groupId}`;

    fetch(apiUrl )
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGroupData(data);
      })
      .catch(error => {
        console.error("Error fetching group data:", error);
        setError(error.message);
      });
  }, [groupId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!groupData) {
    return <div>Loading group data...</div>;
  }

  return (
    <div>
      <div className="affiliate-header">
        <h2>{groupData.group_info.name}</h2>
        <p>Affiliate Code: <strong>{groupData.group_info.affiliate_code}</strong></p>
        <a href={groupData.group_info.affiliate_url} target="_blank" rel="noopener noreferrer" className="join-now-btn">
          Join Now
        </a>
      </div>
      <h3>Group Aggregate Performance</h3>
      <StatsDashboard stats={groupData.group_stats} />
      <div style={{ marginTop: '40px' }}>
        <h3>Trader Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Net R</th>
              <th>Win Rate</th>
              <th>Total Trades</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {groupData.trader_leaderboard.length > 0 ? (
              groupData.trader_leaderboard.map((trader, index) => (
                <tr key={trader.id}>
                  <td>{index + 1}</td>
                  <td>{trader.name}</td>
                  <td style={{ color: trader.net_r >= 0 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                    {trader.net_r}
                  </td>
                  <td>{trader.win_rate}%</td>
                  <td>{trader.total_trades}</td>
                  <td>
                    <Link to={`/groups/${groupId}/traders/${trader.id}`} state={{ traderName: trader.name }}>Details</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', fontStyle: 'italic', padding: '20px' }}>
                  This group has no traders with valid trade data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupPage;

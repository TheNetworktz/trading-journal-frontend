// frontend/src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://trading-journal-backend-kem0.onrender.com/api/groups';

    // FIX: Removed extra space from fetch(apiUrl )
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGroups(data);
      })
      .catch(error => {
        console.error("Error fetching groups:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (groups.length === 0) {
    return <div>Loading groups...</div>;
  }

  return (
    <div>
      <h1>Trading Groups</h1>
      <div className="groups-grid">
        {groups.map(group => (
          <Link to={`/groups/${group.id}`} key={group.id} className="group-card">
            <h3>{group.name}</h3>
            <p>{group.trader_count} Trader(s)</p>
            <span className="view-group-btn">View Group</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

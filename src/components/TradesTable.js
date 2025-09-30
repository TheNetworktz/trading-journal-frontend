// frontend/src/components/TradesTable.js

import React from 'react';

// This component receives the 'trades' array as a prop
function TradesTable({ trades }) {
  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Trade Log</h2>
      <table>
        <thead>
          <tr>
            <th>Entry Date</th>
            <th>Direction</th>
            <th>Model</th>
            <th>R</th>
            <th>Rating</th>
            <th>Snapshot</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the trades array and create a table row for each trade */}
          {trades.map((trade, index) => (
            <tr key={index}>
              <td>{trade['Entry Date']}</td>
              <td style={{ color: trade.R >= 0 ? '#28a745' : '#dc3545' }}>
                {trade.Direction}
              </td>
              <td>{trade.Model}</td>
              <td style={{ fontWeight: 'bold', color: trade.R >= 0 ? '#28a745' : '#dc3545' }}>
                {trade.R}
              </td>
              <td>{trade.Rating}</td>
              <td>
                {/* Make the snapshot a clickable link that opens in a new tab */}
                <a href={trade['TradingView Snapshot']} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TradesTable;

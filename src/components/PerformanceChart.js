// frontend/src/components/PerformanceChart.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PerformanceChart({ trades }) {
  // --- THE FIX IS HERE ---
  // We create a reversed copy of the trades array BEFORE mapping.
  // This ensures we process from oldest trade to newest trade.
  const chronologicalTrades = [...trades].reverse();

  let cumulativeR = 0;
  const chartData = chronologicalTrades.map((trade, index) => {
    cumulativeR += trade.R;
    return {
      tradeNumber: index + 1, // X-axis will be the trade number (1, 2, 3...)
      R: trade.R,             // The R-value of the individual trade
      cumulativeR: cumulativeR, // The running total of R
    };
  }); // No .reverse() needed here anymore.

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Cumulative R Performance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="tradeNumber" stroke="#e0e0e0" />
          <YAxis stroke="#e0e0e0" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }} 
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="cumulativeR" 
            name="Cumulative R" 
            stroke="#007bff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;

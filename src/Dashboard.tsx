import React, { useEffect, useState } from 'react';

interface FeatureUsage {
  feature: string;
  users: number;
  lastWeek: number;
}

interface Recommendation {
  action: string;
  feature: string;
  reason: string;
}

export const Dashboard: React.FC = () => {
  const [usage, setUsage] = useState<FeatureUsage[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    // Simulated adoption data
    const mockUsage: FeatureUsage[] = [
      { feature: 'API Versioning', users: 45, lastWeek: 12 },
      { feature: 'Cache Layer', users: 32, lastWeek: 8 },
      { feature: 'Rate Limiting', users: 28, lastWeek: 3 },
      { feature: 'Legacy Logger', users: 5, lastWeek: 0 },
    ];
    setUsage(mockUsage);

    // Recommendation: improve Cache Layer (growing), retire Legacy Logger (unused)
    setRecommendation({
      action: 'Improve',
      feature: 'Cache Layer',
      reason: 'Growing adoption (32 users, +8 last week)',
    });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Platform Adoption Metrics</h1>

      <h2>Feature Usage</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Feature</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Users</th>
            <th style={{ textAlign: 'right', padding: '8px' }}>Last Week</th>
          </tr>
        </thead>
        <tbody>
          {usage.map((f) => (
            <tr key={f.feature} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{f.feature}</td>
              <td style={{ textAlign: 'right', padding: '8px' }}>{f.users}</td>
              <td style={{ textAlign: 'right', padding: '8px' }}>+{f.lastWeek}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {recommendation && (
        <div style={{ marginTop: '20px', padding: '12px', background: '#e3f2fd', borderRadius: '4px' }}>
          <h3>Recommendation</h3>
          <p>{recommendation.action} <strong>{recommendation.feature}</strong>: {recommendation.reason}</p>
        </div>
      )}
    </div>
  );
};

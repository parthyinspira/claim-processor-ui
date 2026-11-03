import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchClaims } from '../api/claims';
import { StatusBadge } from '../components/StatusBadge';

export function ClaimsDashboard() {
  const { data: claims, isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: () => fetchClaims(),
  });

  if (isLoading) return <p>Loading claims...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Claims Dashboard</h1>
        <Link to="/claims/new">
          <button>Submit New Claim</button>
        </Link>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr style={{ background: '#F3F4F6' }}>
            <th style={th}>Claim #</th>
            <th style={th}>Member</th>
            <th style={th}>Provider</th>
            <th style={th}>Service Date</th>
            <th style={th}>Billed</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims?.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={td}>{c.claimNumber}</td>
              <td style={td}>{c.memberName}</td>
              <td style={td}>{c.providerName}</td>
              <td style={td}>{c.serviceFromDate}</td>
              <td style={td}>${c.billedAmount.toFixed(2)}</td>
              <td style={td}><StatusBadge status={c.status} /></td>
              <td style={td}><Link to={`/claims/${c.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 600 };
const td: React.CSSProperties = { padding: '8px 12px' };

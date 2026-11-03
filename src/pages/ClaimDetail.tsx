import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchClaim } from '../api/claims';
import { StatusBadge } from '../components/StatusBadge';

export function ClaimDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: claim, isLoading } = useQuery({
    queryKey: ['claims', id],
    queryFn: () => fetchClaim(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!claim) return <p>Claim not found.</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Claim {claim.claimNumber}</h1>
      <StatusBadge status={claim.status} />
      <dl style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '200px 1fr', gap: '8px 16px' }}>
        <dt>Member</dt><dd>{claim.memberName} ({claim.memberId})</dd>
        <dt>Provider</dt><dd>{claim.providerName} ({claim.providerId})</dd>
        <dt>Service Dates</dt><dd>{claim.serviceFromDate} – {claim.serviceToDate}</dd>
        <dt>Billed Amount</dt><dd>${claim.billedAmount.toFixed(2)}</dd>
        {claim.allowedAmount != null && <><dt>Allowed Amount</dt><dd>${claim.allowedAmount.toFixed(2)}</dd></>}
        {claim.paidAmount != null && <><dt>Paid Amount</dt><dd>${claim.paidAmount.toFixed(2)}</dd></>}
      </dl>
      <h2 style={{ marginTop: 24 }}>Claim Lines</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#F3F4F6' }}>
            <th style={th}>#</th><th style={th}>Procedure</th><th style={th}>Diagnosis</th>
            <th style={th}>Date</th><th style={th}>Units</th><th style={th}>Billed</th>
          </tr>
        </thead>
        <tbody>
          {claim.lines.map((l) => (
            <tr key={l.lineNumber} style={{ borderBottom: '1px solid #E5E7EB' }}>
              <td style={td}>{l.lineNumber}</td>
              <td style={td}>{l.procedureCode}{l.modifier ? `-${l.modifier}` : ''}</td>
              <td style={td}>{l.diagnosisCode}</td>
              <td style={td}>{l.serviceDate}</td>
              <td style={td}>{l.units}</td>
              <td style={td}>${l.billedAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = { padding: '8px 12px', textAlign: 'left', fontWeight: 600 };
const td: React.CSSProperties = { padding: '8px 12px' };

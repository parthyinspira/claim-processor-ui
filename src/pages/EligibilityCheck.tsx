import { useState } from 'react';
import { checkEligibility } from '../api/claims';
import type { EligibilityResponse } from '../types/claim';

export function EligibilityCheck() {
  const [memberId, setMemberId] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceType, setServiceType] = useState('30');
  const [result, setResult] = useState<EligibilityResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await checkEligibility({ memberId, serviceDate, serviceType });
      setResult(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Eligibility Check</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>Member ID<input value={memberId} onChange={e => setMemberId(e.target.value)} required style={input} /></label>
        <label>Service Date<input type="date" value={serviceDate} onChange={e => setServiceDate(e.target.value)} required style={input} /></label>
        <label>Service Type Code
          <select value={serviceType} onChange={e => setServiceType(e.target.value)} style={input}>
            <option value="30">Health Benefit Plan Coverage</option>
            <option value="1">Medical</option>
            <option value="23">Emergency Services</option>
            <option value="88">Pharmacy</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Checking...' : 'Check Eligibility'}</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 16 }}>{error}</p>}
      {result && (
        <div style={{ marginTop: 24, padding: 16, background: result.isEligible ? '#ECFDF5' : '#FEF2F2', borderRadius: 8 }}>
          <h2 style={{ color: result.isEligible ? '#065F46' : '#991B1B' }}>
            {result.isEligible ? 'Eligible' : 'Not Eligible'}
          </h2>
          <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '6px 12px' }}>
            <dt>Member</dt><dd>{result.memberName}</dd>
            <dt>Plan</dt><dd>{result.planName}</dd>
            <dt>Coverage Period</dt><dd>{result.eligibleFrom} – {result.eligibleTo}</dd>
            {result.copay != null && <><dt>Copay</dt><dd>${result.copay}</dd></>}
            {result.deductible != null && <><dt>Deductible</dt><dd>${result.deductibleMet} / ${result.deductible}</dd></>}
          </dl>
        </div>
      )}
    </div>
  );
}

const input: React.CSSProperties = { display: 'block', width: '100%', padding: '6px 10px', marginTop: 4, border: '1px solid #D1D5DB', borderRadius: 4 };

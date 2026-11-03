import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ClaimsDashboard } from './pages/ClaimsDashboard';
import { ClaimDetail } from './pages/ClaimDetail';
import { EligibilityCheck } from './pages/EligibilityCheck';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav style={{ background: '#1E3A5F', padding: '12px 24px', display: 'flex', gap: 24 }}>
          <span style={{ color: '#fff', fontWeight: 700, marginRight: 24 }}>Claim Processor</span>
          {[
            { to: '/', label: 'Dashboard' },
            { to: '/eligibility', label: 'Eligibility' },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              color: isActive ? '#93C5FD' : '#fff', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
            })}>
              {label}
            </NavLink>
          ))}
        </nav>
        <Routes>
          <Route path="/" element={<ClaimsDashboard />} />
          <Route path="/claims/:id" element={<ClaimDetail />} />
          <Route path="/eligibility" element={<EligibilityCheck />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

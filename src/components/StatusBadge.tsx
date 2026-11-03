import type { ClaimStatus } from '../types/claim';

const COLOR_MAP: Record<ClaimStatus, string> = {
  SUBMITTED: '#6B7280',
  PENDING:   '#D97706',
  IN_REVIEW: '#2563EB',
  APPROVED:  '#059669',
  DENIED:    '#DC2626',
  PARTIAL:   '#7C3AED',
  PAID:      '#065F46',
};

interface Props { status: ClaimStatus }

export function StatusBadge({ status }: Props) {
  return (
    <span style={{
      backgroundColor: COLOR_MAP[status],
      color: '#fff',
      padding: '2px 10px',
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
    }}>
      {status}
    </span>
  );
}

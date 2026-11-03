export type ClaimStatus =
  | 'SUBMITTED'
  | 'PENDING'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'DENIED'
  | 'PARTIAL'
  | 'PAID';

export type ClaimType = 'PROFESSIONAL' | 'INSTITUTIONAL' | 'DENTAL';

export interface ClaimLine {
  lineNumber: number;
  procedureCode: string;
  diagnosisCode: string;
  serviceDate: string;
  billedAmount: number;
  allowedAmount?: number;
  units: number;
  modifier?: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  type: ClaimType;
  status: ClaimStatus;
  memberId: string;
  memberName: string;
  providerId: string;
  providerName: string;
  serviceFromDate: string;
  serviceToDate: string;
  billedAmount: number;
  allowedAmount?: number;
  paidAmount?: number;
  submittedAt: string;
  updatedAt: string;
  lines: ClaimLine[];
}

export interface EligibilityRequest {
  memberId: string;
  serviceDate: string;
  serviceType: string;
}

export interface EligibilityResponse {
  memberId: string;
  memberName: string;
  planId: string;
  planName: string;
  eligibleFrom: string;
  eligibleTo: string;
  copay?: number;
  deductible?: number;
  deductibleMet?: number;
  outOfPocketMax?: number;
  outOfPocketMet?: number;
  isEligible: boolean;
}

export interface ClaimSubmitRequest {
  type: ClaimType;
  memberId: string;
  providerId: string;
  serviceFromDate: string;
  serviceToDate: string;
  lines: Omit<ClaimLine, 'lineNumber'>[];
}

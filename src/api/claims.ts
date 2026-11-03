import { apiClient } from './client';
import type { Claim, ClaimSubmitRequest, EligibilityRequest, EligibilityResponse } from '../types/claim';

export async function fetchClaims(params?: { status?: string; memberId?: string }): Promise<Claim[]> {
  const { data } = await apiClient.get('/claims', { params });
  return data;
}

export async function fetchClaim(id: string): Promise<Claim> {
  const { data } = await apiClient.get(`/claims/${id}`);
  return data;
}

export async function submitClaim(payload: ClaimSubmitRequest): Promise<Claim> {
  const { data } = await apiClient.post('/claims', payload);
  return data;
}

export async function checkEligibility(req: EligibilityRequest): Promise<EligibilityResponse> {
  const { data } = await apiClient.post('/eligibility/check', req);
  return data;
}

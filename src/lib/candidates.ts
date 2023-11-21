import { db } from '@/db';

import { Candidates, CandidatesStatus, candidateStatus, candidates, companies, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export type candidateStatus = {
  candidate_status_id: number;
  candidate_id: number;
  candidate_name: string;
  candidate_email: string;
  candidate_phone_number: string;
  candidate_profile_share_date: string | null;
  candidate_status: string;
  candidate_round_completed: number | null;
  candidate_reject_reason: string | null;
};


export async function getAllCandStat(): Promise<candidateStatus[]> {
  const result: candidateStatus[] = await db.select({
    candidate_status_id: candidateStatus.id,
    candidate_id: candidates.id,
    candidate_name: candidates.name,
    candidate_email: candidates.email,
    candidate_phone_number: candidates.phNum,
    candidate_profile_share_date: candidateStatus.profileShrDate,
    candidate_status: candidateStatus.status,
    candidate_round_completed: candidateStatus.roundDone,
    candidate_reject_reason: candidateStatus.reasonReject
  })
  .from(candidateStatus)
  .innerJoin(candidates, eq(candidates.id, candidateStatus.candidateId));
  
  return result;
};
export type candidates = {
  candidate_id: number;
  candidate_name: string;
  key_points: unknown | null;
  profile_pic: string | null;
  social: string | null;
  company_id: number | null;
  company_name: string | null;
  role_id: number | null;
  role_name: string | null;
  email: string;
  current_position: string | null;
  current_location: string | null;
  experience: string | null;
  phone_number: string | null;
  fixed_lpa: string | null;
  variable_lpa: string | null;
  expected_ctc: string | null;
  notice_period: string | null;
  description: string | null;
  achievement: unknown | null;
  gender: string | null;
  current_company: string | null;
  esop_rsu: string | null;
  candidate_profile_share_date: string | null;
  candidate_status: string | null;
  candidate_round_completed: number | null;
  candidate_reject_reason: string | null;
  created_at: string;
};

export default async function getAllCandidatesWStatus(): Promise<candidates[]> {
  const result: candidates[] = await db.select({
    candidate_id: candidates.id,
    candidate_name: candidates.name,
    key_points: candidates.keyPoints,
    profile_pic: candidates.profilePic,
    social: candidates.social,
    company_id: candidates.companyId,
    company_name: companies.name,
    role_id: candidates.roleId,
    role_name: roles.name,
    email: candidates.email,
    current_position:candidates.currPos,
    current_location: candidates.currLoc,
    experience: candidates.experience,
    phone_number: candidates.phNum,
    fixed_lpa: candidates.fixedLpa,
    variable_lpa: candidates.varLpa,
    expected_ctc: candidates.expectedCtc,
    notice_period: candidates.noticePeriod,
    description: candidates.description,
    achievement: candidates.achievement,
    gender: candidates.gender,
    current_company: candidates.currCmp,
    esop_rsu: candidates.esopRsu,
    candidate_profile_share_date: candidateStatus.profileShrDate,
    candidate_status: candidateStatus.status,
    candidate_round_completed: candidateStatus.roundDone,
    candidate_reject_reason: candidateStatus.reasonReject,
    created_at: candidates.createdAt
  })
  .from(candidates)
  .leftJoin(companies, eq(candidates.companyId, companies.id))
  .leftJoin(roles, eq(candidates.roleId, roles.id))
  .leftJoin(candidateStatus, eq(candidateStatus.candidateId, candidates.id));

  return result;
};

export async function getCandidate(id: number): Promise<candidates[]> {
  
  const result: candidates[] = await db.select({
    candidate_id: candidates.id,
    candidate_name: candidates.name,
    key_points: candidates.keyPoints,
    profile_pic: candidates.profilePic,
    social: candidates.social,
    company_id: candidates.companyId,
    company_name: companies.name,
    role_id: candidates.roleId,
    role_name: roles.name,
    email: candidates.email,
    current_position:candidates.currPos,
    current_location: candidates.currLoc,
    experience: candidates.experience,
    phone_number: candidates.phNum,
    fixed_lpa: candidates.fixedLpa,
    variable_lpa: candidates.varLpa,
    expected_ctc: candidates.expectedCtc,
    notice_period: candidates.noticePeriod,
    description: candidates.description,
    achievement: candidates.achievement,
    gender: candidates.gender,
    current_company: candidates.currCmp,
    esop_rsu: candidates.esopRsu,
    candidate_profile_share_date: candidateStatus.profileShrDate,
    candidate_status: candidateStatus.status,
    candidate_round_completed: candidateStatus.roundDone,
    candidate_reject_reason: candidateStatus.reasonReject,
    created_at: candidates.createdAt
  })
  .from(candidates)
  .leftJoin(companies, eq(candidates.companyId, companies.id))
  .leftJoin(roles, eq(candidates.roleId, roles.id))
  .leftJoin(candidateStatus, eq(candidateStatus.candidateId, candidates.id))
  .where(eq(candidates.id, id));

  return result;
};

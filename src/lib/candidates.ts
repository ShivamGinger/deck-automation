import { db } from '@/db';

import { Candidates, CandidatesStatus, candidateStatus, candidates, companies, parameterScores, parameters, quotientScores, quotients, roles, statusHistory } from '@/db/schema';
import { and, eq, like } from 'drizzle-orm';
import { getCompanyRoleCandidate } from './roles';

export type CandidateStatusType = "yet_to_share" | "joined" | "negotiation" | "in_process" | "on_hold" | "feedback_pending" | "dropped_out" | "rejected"

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
export type candidateStatusHistory = {
  candidate_status_history_id: number;
  candidate_name: string;
  candidate_profile_share_date: string | null;
  candidate_status: string;
  candidate_round_completed: number | null;
  candidate_reject_reason: string | null;
  status_updated_at: string | null;
};

export async function getCandidateStatusHistory(candidate_id: number): Promise<candidateStatusHistory[]> {
  const result: candidateStatusHistory[] = await db.select({
    candidate_status_history_id: statusHistory.id,
    candidate_name: candidates.name,
    candidate_profile_share_date: statusHistory.profileShrDate,
    candidate_status: statusHistory.status,
    candidate_round_completed: statusHistory.roundDone,
    candidate_reject_reason: statusHistory.reasonReject,
    status_updated_at: statusHistory.updatedAt
  })
    .from(statusHistory)
    .innerJoin(candidates, eq(candidates.id, statusHistory.candidateId))
    .where(eq(statusHistory.candidateId, candidate_id));

  return result;
};
export async function getCandidateStatus(candidate_id: number): Promise<candidateStatus[]> {
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
    .innerJoin(candidates, eq(candidates.id, candidateStatus.candidateId))
    .where(eq(candidateStatus.candidateId, candidate_id));

  return result;
};
export type candidate = {
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
  phone_number: string;
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

export default async function getAllCandidatesWStatus(): Promise<candidate[]> {
  const result: candidate[] = await db.select({
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
    current_position: candidates.currPos,
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

export async function getCandidate(id: number): Promise<candidate[]> {

  const result: candidate[] = await db.select({
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
    current_position: candidates.currPos,
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

export type scoreExist = {
  score_id: number;
  candidate_id: number;
};

export async function candidateParamScoreExist(candidate_id: number): Promise<scoreExist[]> {
  const paramScore: scoreExist[] = await db.select({
    score_id: parameterScores.id,
    candidate_id: parameterScores.candidateId
  })
    .from(parameterScores)
    .where(eq(parameterScores.candidateId, candidate_id));

  return paramScore;
};

export async function candidateQuoScoreExist(candidate_id: number): Promise<scoreExist[]> {
  const quoScore: scoreExist[] = await db.select({
    score_id: quotientScores.id,
    candidate_id: quotientScores.candidateId
  })
    .from(quotientScores)
    .where(eq(quotientScores.candidateId, candidate_id));

  return quoScore;
};

export type paramScoreList = {
  parameter_score_id: number;
  parameter_id: number;
  parameter_name: string;
  parameter_score: number;
};

export async function candidateParamScoreList(candidate_id: number): Promise<paramScoreList[]> {
  const score: paramScoreList[] = await db.select({
    quotient_name: quotients.quotient,
    parameter_score_id: parameterScores.id,
    parameter_id: parameterScores.parameterId,
    parameter_name: parameters.parameter,
    parameter_score: parameterScores.score,
  })
    .from(parameterScores)
    .innerJoin(parameters, eq(parameters.id, parameterScores.parameterId))
    .innerJoin(quotients, eq(quotients.id, parameters.quotientId))
    .where(eq(parameterScores.candidateId, candidate_id));

  return score;
};

export type quoScoreList = {
  quotient_score_id: number;
  quotient_id: number;
  quotient_name: string;
  quotient_score: string;
};

export async function candidateQuoScoreList(candidate_id: number): Promise<quoScoreList[]> {
  const score: quoScoreList[] = await db.select({
    quotient_score_id: quotientScores.id,
    quotient_id: quotientScores.quotientId,
    quotient_name: quotients.quotient,
    quotient_score: quotientScores.totalScore,
  })
    .from(quotientScores)
    .innerJoin(quotients, eq(quotients.id, quotientScores.quotientId))
    .where(eq(quotientScores.candidateId, candidate_id));

  return score;
};

export const processCandidatePDF = async (company_id: number, role_id: number, candidate_id: number) => {
  const rolesCandidate = await getCompanyRoleCandidate(company_id, role_id, candidate_id);

  if (rolesCandidate.length === 0) {
    return { error: "No candidates under this role", status: 404 };
  }

  const paramScoreExists = await candidateParamScoreExist(candidate_id);
  const quoScoreExists = await candidateQuoScoreExist(candidate_id);

  if (paramScoreExists.length === 0 && quoScoreExists.length === 0) {
    return { error: "Scores do not exist", status: 404 };
  }

  const candidateParamScore = await candidateParamScoreList(candidate_id);
  const candidateQuoScore = await candidateQuoScoreList(candidate_id);

  const top5Attributes = candidateParamScore.sort((a, b) => b.parameter_score - a.parameter_score).slice(0, 5).map((obj, index) => ({
    id: index + 1,
    title: obj.parameter_name,
    value: obj.parameter_score
  }));

  const quotientScores = candidateQuoScore.map(obj => {
    let title;

    switch (obj.quotient_name) {
      case 'Adversity Factor':
        title = 'AQ';
        break;
      case 'Emotional Factor':
        title = 'EQ';
        break;
      case 'Intelligence Factor':
        title = 'IQ';
        break;
      case 'Social Factor':
        title = 'SQ';
        break;
    }

    return {
      id: obj.quotient_score_id,
      title,
      value: obj.quotient_score
    };
  });

  const candidateName = rolesCandidate[0]?.candidate_name;
  const profilePic = rolesCandidate[0]?.profile_pic;
  const keyPointsString = JSON.stringify(rolesCandidate[0].key_points);
  const social = rolesCandidate[0]?.social;
  const email = rolesCandidate[0]?.email;
  const gpScore = rolesCandidate[0]?.gp_score;
  const achivementsString = JSON.stringify(rolesCandidate[0].achievement);
  const description = rolesCandidate[0]?.description;
  const gender = rolesCandidate[0]?.gender;
  const experience = rolesCandidate[0]?.experience;
  const fixedLpa = rolesCandidate[0]?.fixed_lpa;
  const phoneNumber = rolesCandidate[0]?.phone_number;
  const top5AttributesString = JSON.stringify(top5Attributes);
  const quotientScoresString = JSON.stringify(quotientScores);

  return {
    candidateName,
    profilePic,
    keyPointsString,
    social,
    email,
    gpScore,
    achivementsString,
    description,
    gender,
    experience,
    fixedLpa,
    phoneNumber,
    top5AttributesString,
    quotientScoresString
  };
};

export async function getCandidateWStatusWQuery(query: string): Promise<candidate[]> {
  const result: candidate[] = await db.select({
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
    current_position: candidates.currPos,
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
    .where(like(candidates.name, `%${query}%`));

  return result;
};
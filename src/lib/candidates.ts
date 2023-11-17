import { db } from '@/db';

import { Candidates, CandidatesStatus, candidateStatus, candidates, companies, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllCandStat(): Promise<CandidatesStatus[]> {
  const result: CandidatesStatus[] = await db.select({
    id: candidateStatus.id,
    candidateId: candidates.id,
    name: candidates.name,
    email: candidates.email,
    phNum: candidates.phNum,
    profileShrDate: candidateStatus.profileShrDate,
    status: candidateStatus.status,
    roundDone: candidateStatus.roundDone,
    reasonReject: candidateStatus.reasonReject
  })
  .from(candidateStatus)
  .innerJoin(candidates, eq(candidates.id, candidateStatus.candidateId));

  return result;
};

export default async function getAllCandidatesWStatus(): Promise<Candidates[]> {
  const result: Candidates[] = await db.select({
    id: candidates.id,
    name: candidates.name,
    keyPoints: candidates.keyPoints,
    profilePic: candidates.profilePic,
    social: candidates.social,
    companyId: candidates.companyId,
    company: companies.name,
    roleId: candidates.roleId,
    role: roles.name,
    email: candidates.email,
    currPos:candidates.currPos,
    currLoc: candidates.currLoc,
    experience: candidates.experience,
    phNum: candidates.phNum,
    fixedLpa: candidates.fixedLpa,
    varLpa: candidates.varLpa,
    expectedCtc: candidates.expectedCtc,
    noticePeriod: candidates.noticePeriod,
    description: candidates.description,
    achievement: candidates.achievement,
    gender: candidates.gender,
    currCmp: candidates.currCmp,
    esopRsu: candidates.esopRsu,
    profileShrDate: candidateStatus.profileShrDate,
    status: candidateStatus.status,
    roundDone: candidateStatus.roundDone,
    reasonReject: candidateStatus.reasonReject,
    createdAt: candidates.createdAt
  })
  .from(candidates)
  .leftJoin(companies, eq(candidates.companyId, companies.id))
  .leftJoin(roles, eq(candidates.roleId, roles.id))
  .leftJoin(candidateStatus, eq(candidateStatus.candidateId, candidates.id));

  return result;
};

export async function getCandidate(id: number): Promise<Candidates[]> {
  
  const result: Candidates[] = await db.select({
    id: candidates.id,
    name: candidates.name,
    email: candidates.email,
    phNum: candidates.phNum,
    companyId: candidates.companyId,
    company: companies.name,
    roleId: candidates.roleId,
    role: roles.name,
    keyPoints: candidates.keyPoints,
    profilePic: candidates.profilePic,
    social: candidates.social,
    experience: candidates.experience,
    currPos:candidates.currPos,
    currLoc: candidates.currLoc,
    fixedLpa: candidates.fixedLpa,
    varLpa: candidates.varLpa,
    expectedCtc: candidates.expectedCtc,
    noticePeriod: candidates.noticePeriod,
    description: candidates.description,
    achievement: candidates.achievement,
    gender: candidates.gender,
    currCmp: candidates.currCmp,
    esopRsu: candidates.esopRsu,
    profileShrDate: candidateStatus.profileShrDate,
    status: candidateStatus.status,
    roundDone: candidateStatus.roundDone,
    reasonReject: candidateStatus.reasonReject,
    createdAt: candidates.createdAt
  })
  .from(candidates)
  .leftJoin(companies, eq(candidates.companyId, companies.id))
  .leftJoin(roles, eq(candidates.roleId, roles.id))
  .leftJoin(candidateStatus, eq(candidateStatus.candidateId, candidates.id))
  .where(eq(candidates.id, id));

  return result;
};

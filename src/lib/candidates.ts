import { db } from '@/db';

import { Candidates, candidates, companies, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getAllCandidates(): Promise<Candidates[]> {

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
    createdAt: candidates.createdAt
  })
  .from(candidates)
  .leftJoin(companies, eq(candidates.companyId, companies.id))
  .leftJoin(roles, eq(candidates.roleId, roles.id))

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
    createdAt: candidates.createdAt
  })
  .from(candidates)
  .leftJoin(companies, eq(candidates.companyId, companies.id))
  .leftJoin(roles, eq(candidates.roleId, roles.id))
  .where(eq(candidates.id, id));

  return result;
};

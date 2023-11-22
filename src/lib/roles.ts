import { db } from "@/db";
import { Role, candidates, companies, parameterScores, parameters, quotientScores, quotientWeightages, roles } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

export type companyRoles = {
  role_id: number;
  role_name: string;
  company_id: number;
  company_name: string;
  created_at: string | null;
};

export async function getCompanyRoles(companyid: number): Promise<companyRoles[]> {
  const companyRoles: companyRoles[] = await db
  .select({
    role_id: roles.id,
    role_name: roles.name,
    company_id: roles.companyId,
    company_name: companies.name,
    created_at: roles.createdAt
  })
  .from(roles)
  .innerJoin(companies, eq(companies.id, roles.companyId))
  .where(eq(roles.companyId, companyid));

  return companyRoles;
};

export type roleCandidates = {
  candidate_id: number;
  candidate_name: string;
  profile_pic: string | null;
  role_id: number;
  role_name: string;
  company_id: number;
  company_name: string;
  description: string | null;
  gp_score: string | null;
};

export async function getCompanyRoleCandidates(companyid: number, roleid: number): Promise<roleCandidates[]> {
  const qScoreSum = db.select({
    candidateId: quotientScores.candidateId,
    gp_score: sql<number>`sum(${quotientScores.totalScore} * ${quotientWeightages.qWeightage})`.mapWith(quotientScores.totalScore).as('gp_score')
  })
  .from(quotientScores)
  .innerJoin(quotientWeightages, eq(quotientWeightages.quotientId, quotientScores.quotientId))
  .where(and(eq(quotientWeightages.companyId, companyid), eq(quotientWeightages.roleId, roleid)))
  .groupBy(quotientScores.candidateId)
  .as('qScoreSum');
    
    const companyRole: roleCandidates[] = await db.select({
    candidate_id: candidates.id,
    candidate_name: candidates.name,
    profile_pic: candidates.profilePic,
    role_id: roles.id,
    role_name: roles.name,
    company_id: companies.id,
    company_name: companies.name,
    description: candidates.description,
    gp_score: qScoreSum.gp_score
  })
  .from(candidates)
  .innerJoin(companies, eq(companies.id, candidates.companyId))
  .innerJoin(roles, eq(roles.id, candidates.roleId))
  .leftJoin(qScoreSum, eq(qScoreSum.candidateId, candidates.id))
  .where(and(eq(candidates.companyId, companyid), eq(candidates.roleId, roleid)));

  return companyRole;
};

export async function getCompanyRoleCandidate(companyid: number, roleid: number, candidate_id: number): Promise<roleCandidates[]> {
  const qScoreSum = db.select({
    candidateId: quotientScores.candidateId,
    gp_score: sql<number>`sum(${quotientScores.totalScore} * ${quotientWeightages.qWeightage})`.mapWith(quotientScores.totalScore).as('gp_score')
  })
  .from(quotientScores)
  .innerJoin(quotientWeightages, eq(quotientWeightages.quotientId, quotientScores.quotientId))
  .where(and(eq(quotientWeightages.companyId, companyid), eq(quotientWeightages.roleId, roleid)))
  .groupBy(quotientScores.candidateId)
  .as('qScoreSum');
    
    const companyRole: roleCandidates[] = await db.select({
    candidate_id: candidates.id,
    candidate_name: candidates.name,
    key_points: candidates.keyPoints,
    profile_pic: candidates.profilePic,
    social: candidates.social,
    company_id: companies.id,
    company_name: companies.name,
    role_id: roles.id,
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
    gp_score: qScoreSum.gp_score
  })
  .from(candidates)
  .innerJoin(companies, eq(companies.id, candidates.companyId))
  .innerJoin(roles, eq(roles.id, candidates.roleId))
  .leftJoin(qScoreSum, eq(qScoreSum.candidateId, candidates.id))
  .where(and(eq(candidates.companyId, companyid), eq(candidates.roleId, roleid), eq(candidates.id, candidate_id)));

  return companyRole;
};

export async function getRole(cid: number, rid: number): Promise<companyRoles[]> {
  const role: companyRoles[] = await db.select(
    {
      role_id: roles.id,
      role_name: roles.name,
      company_id: roles.companyId,
      company_name: companies.name,
      created_at: roles.createdAt
    }
  )
  .from(roles)
  .innerJoin(companies, eq(companies.id, roles.companyId))
  .where(and(eq(roles.companyId, cid), eq(roles.id, rid)));

  return role;
};

export async function getRoleByName(cid: number, rname: string): Promise<Role[]> {
  const roleE: Role[] = await db.select().from(roles).where(and(eq(roles.companyId, cid), eq(roles.name, rname)));

  return roleE;
};
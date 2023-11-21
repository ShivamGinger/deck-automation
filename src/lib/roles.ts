import { db } from "@/db";
import { Role, candidates, companies, parameterScores, parameters, quotientScores, roles } from "@/db/schema";
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

export type roleCandidate = {
  candidate_id: number;
  candidate_name: string;
  profile_pic: string | null;
  role_id: number;
  role_name: string;
  company_id: number;
  company_name: string;
  key_points: unknown | null;
  gp_score: string | null;
};

export async function getCompanyRoleCandidate(companyid: number, roleid: number): Promise<roleCandidate[]> {
  const qScoreSum = db.select({ 
    candidateId: quotientScores.candidateId,
    gp_score: sql<number>`sum(${quotientScores.totalScore})`.mapWith(quotientScores.totalScore).as('totalScore')
  }).from(quotientScores).groupBy(quotientScores.candidateId).as('qScoreSum');
    
    const companyRole: roleCandidate[] = await db.select({
    candidate_id: candidates.id,
    candidate_name: candidates.name,
    profile_pic: candidates.profilePic,
    role_id: roles.id,
    role_name: roles.name,
    company_id: companies.id,
    company_name: companies.name,
    key_points: candidates.keyPoints,
    gp_score: qScoreSum.gp_score
  })
  .from(candidates)
  .innerJoin(companies, eq(companies.id, candidates.companyId))
  .innerJoin(roles, eq(roles.id, candidates.roleId))
  .leftJoin(qScoreSum, eq(qScoreSum.candidateId, candidates.id))
  .where(and(eq(candidates.companyId, companyid), eq(candidates.roleId, roleid)));

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
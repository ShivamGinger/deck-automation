import { db } from "@/db";
import { Role, candidates, companies, parameterScores, parameters, quotientScores, roles } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

export async function getCompanyRoles(companyid: number): Promise<Role[]> {
  const companyRoles: Role[] = await db
  .select({
    id: roles.id,
    name: roles.name,
    companyId: roles.companyId,
    cname: companies.name,
    createdAt: roles.createdAt
  })
  .from(roles)
  .innerJoin(companies, eq(companies.id, roles.companyId))
  .where(eq(roles.companyId, companyid));

  return companyRoles;
};

export type roleCandidate = {
  id: number;
  candidateName: string;
  profilePic: string | null;
  rid: number;
  rname: string;
  cid: number;
  cname: string;
  keyPoints: unknown | null;
  totalScore: number | null;
};

export async function getCompanyRoleCandidate(companyid: number, roleid: number): Promise<roleCandidate[]> {
  const qScoreSum = db.select({ 
    candidateId: quotientScores.candidateId,
    totalScore: sql<number>`sum(${quotientScores.totalScore})`.as('totalScore')
  }).from(quotientScores).groupBy(quotientScores.candidateId).as('qScoreSum');
    
    const companyRole: roleCandidate[] = await db.select({
    id: candidates.id,
    candidateName: candidates.name,
    profilePic: candidates.profilePic,
    rid: roles.id,
    rname: roles.name,
    cid: companies.id,
    cname: companies.name,
    keyPoints: candidates.keyPoints,
    totalScore: qScoreSum.totalScore
  })
  .from(candidates)
  .innerJoin(companies, eq(companies.id, candidates.companyId))
  .innerJoin(roles, eq(roles.id, candidates.roleId))
  .leftJoin(qScoreSum, eq(qScoreSum.candidateId, candidates.id))
  .where(and(eq(candidates.companyId, companyid), eq(candidates.roleId, roleid)));

  return companyRole;
};

export type role = {
  id: number;
  name: string;
  companyId: number;
  companyName: string;
};

export async function getRole(cid: number, rid: number): Promise<role[]> {
  const role: role[] = await db.select(
    {
      id: roles.id,
      name: roles.name,
      companyId: companies.id,
      companyName: companies.name,
      createdAt: roles.createdAt
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
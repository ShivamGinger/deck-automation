import { db } from "@/db";
import { Role, candidates, companies, quotientScores, roles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCompanyRoles(companyid: number): Promise<Role[]> {
  const companyRoles: Role[] = await db.select().from(roles).where(eq(roles.companyId, companyid));

  return companyRoles;
};

export type roleCandidate = {
  id: number;
  rname: string;
  cname: string;
  profilePic: string | null;
  description: string | null;
  achievement: unknown | null;
  totalScore: string | null;
}

export async function getCompanyRoleCandidate(companyid: number, roleid: number): Promise<roleCandidate[]> {
  const companyRole: roleCandidate[] = await db.select({
    id: candidates.id,
    rname: roles.name,
    cname: candidates.name,
    profilePic: candidates.profilePic,
    description: candidates.description,
    achievement: candidates.achievement,
    totalScore: quotientScores.totalScore
  })
  .from(candidates)
  .innerJoin(roles, eq(roles.id, candidates.roleId))
  .leftJoin(quotientScores, eq(quotientScores.candidateId, candidates.id))
  .where(eq(roles.companyId, companyid))
  .where(eq(roles.id, roleid));

  return companyRole;
};

export async function getRoleByName(rname: string): Promise<Role[]> {
  const roleE: Role[] = await db.select().from(roles).where(eq(roles.name, rname));

  return roleE;
};
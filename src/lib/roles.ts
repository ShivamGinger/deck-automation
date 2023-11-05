import { db } from "@/db";
import { Role } from "@/db/schema";

export default async function getAllRolesUnderCompany(companyID: string | string[]): Promise<Role[]> {
  // TODO: Fetch and return all the roles under the company with 'ID = companyID'
  const result: Role[] = await db.query.roles.findMany();

  return result;
};
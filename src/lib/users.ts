import { db } from "@/db";
import { groups, userGroups, users } from "@/db/schema";
import { and, eq, isNull, not } from "drizzle-orm";

export type user = {
  email: string,
  first_name: string | null,
  last_name: string | null,
};

export async function getAllUsers(): Promise<user[]> {
  const userAll = await db.select({
    email: users.email,
    first_name: users.firstName,
    last_name: users.lastName,
  }).from(users);

  return userAll;
};

export async function getUsersNotInGroup(grpId: number): Promise<user[]> {
  const userNotInGrp: user[] = await db.select({
    user_id: users.id,
    first_name: users.firstName,
    last_name: users.lastName,
    email: users.email
  })
    .from(users)
    .leftJoin(userGroups, and(eq(userGroups.userId, users.id), eq(userGroups.groupId, grpId)))
    .where(isNull(userGroups.userId));

  return userNotInGrp;
};
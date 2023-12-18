import { db } from "@/db";
import { userGroups, users } from "@/db/schema";
import { and, eq, isNull, not } from "drizzle-orm";

export interface user {
  user_id: number,
  email: string,
  first_name: string | null,
  last_name: string | null,
};

interface UserGroup extends user {
  candidate_tracking_can_read: number | null,
  candidate_tracking_can_edit: number | null,
  candidate_tracking_can_create: number | null,
  deck_automation_can_read: number | null,
  deck_automation_can_edit: number | null,
  deck_automation_can_create: number | null,
  all_quotients_can_read: number | null,
  all_quotients_can_edit: number | null,
  all_quotients_can_create: number | null,
  users_can_read: number | null,
  users_can_create: number | null,
  users_can_delete: number | null,
  groups_can_read: number | null,
  groups_can_edit: number | null,
  groups_can_create: number | null,
  groups_can_delete: number | null,
};

export async function getAllUsers(): Promise<user[]> {
  const userAll = await db.select({
    user_id: users.id,
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

export function hasPermission(userGroup: UserGroup[], permission: string) {
  return userGroup.some(user => user[permission as keyof UserGroup] === 1);
};
import { db } from "@/db";
import { Groups, groups, userGroups, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type grp = {
    group_id: number,
    group_name: string,
    can_read: number | null,
    can_create: number | null,
    can_edit: number | null,
    can_delete: number | null,
    created_at: string
};

export type grpUsers = {
    group_id: number,
    group_name: string,
    user_id: number,
    first_name: string | null,
    last_name: string | null,
    email: string
};

export async function getAllGroups(): Promise<grp[]> {
    const groupsAll: grp[] = await db.select({
        group_id: groups.id,
        group_name: groups.groupName,
        can_read: groups.canRead,
        can_create: groups.canCreate,
        can_edit: groups.canEdit,
        can_delete: groups.canDelete,
        created_at: groups.createdAt
    }).from(groups);

    return groupsAll;
}

export async function getGroupByName(name: string): Promise<grp[]> {
    const group: grp[] = await db.select({
        group_id: groups.id,
        group_name: groups.groupName,
        can_read: groups.canRead,
        can_create: groups.canCreate,
        can_edit: groups.canEdit,
        can_delete: groups.canDelete,
        created_at: groups.createdAt
    }).from(groups).where(eq(groups.groupName, name));

    return group;
};

export async function getGroup(grpId: number): Promise<grp[]> {
    const group: grp[] = await db.select({
        group_id: groups.id,
        group_name: groups.groupName,
        can_read: groups.canRead,
        can_create: groups.canCreate,
        can_edit: groups.canEdit,
        can_delete: groups.canDelete,
        created_at: groups.createdAt
    }).from(groups).where(eq(groups.id, grpId));

    return group;
};

export async function getGroupUsers(grpId: number): Promise<grpUsers[]> {
    const groupUsers: grpUsers[] = await db.select({
        group_id: groups.id,
        group_name: groups.groupName,
        user_id: users.id,
        first_name: users.firstName,
        last_name: users.lastName,
        email: users.email
    })
    .from(userGroups)
    .innerJoin(users, eq(users.id, userGroups.userId))
    .innerJoin(groups, eq(groups.id, userGroups.groupId))
    .where(eq(userGroups.groupId, grpId));

    return groupUsers;
};

export async function getGroupUser(grpId: number, userId: number): Promise<grpUsers[]> {
    const groupUser: grpUsers[] = await db.select({
        group_id: groups.id,
        group_name: groups.groupName,
        user_id: users.id,
        first_name: users.firstName,
        last_name: users.lastName,
        email: users.email
    })
    .from(userGroups)
    .innerJoin(users, eq(users.id, userGroups.userId))
    .innerJoin(groups, eq(groups.id, userGroups.groupId))
    .where(and(eq(userGroups.groupId, grpId), eq(userGroups.userId, userId)));

    return groupUser;
};


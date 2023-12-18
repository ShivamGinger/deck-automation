import { db } from "@/db";
import { Groups, groups, userGroups, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type grp = {
    group_id: number,
    group_name: string,
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
        candidate_tracking_can_read: groups.candidateTrackingCanRead,
        candidate_tracking_can_edit: groups.candidateTrackingCanEdit,
        candidate_tracking_can_create: groups.candidateTrackingCanCreate,
        deck_automation_can_read: groups.deckAutomationCanRead,
        deck_automation_can_edit: groups.deckAutomationCanEdit,
        deck_automation_can_create: groups.deckAutomationCanCreate,
        all_quotients_can_read: groups.allQuotientsCanRead,
        all_quotients_can_edit: groups.allQuotientsCanEdit,
        all_quotients_can_create: groups.allQuotientsCanCreate,
        users_can_read: groups.usersCanRead,
        users_can_create: groups.usersCanCreate,
        users_can_delete: groups.usersCanDelete,
        groups_can_read: groups.groupsCanRead,
        groups_can_edit: groups.groupsCanEdit,
        groups_can_create: groups.groupsCanCreate,
        groups_can_delete: groups.groupsCanDelete,
        created_at: groups.createdAt
    }).from(groups);

    return groupsAll;
}

export async function getGroupByName(name: string): Promise<grp[]> {
    const group: grp[] = await db.select({
        group_id: groups.id,
        group_name: groups.groupName,
        candidate_tracking_can_read: groups.candidateTrackingCanRead,
        candidate_tracking_can_edit: groups.candidateTrackingCanEdit,
        candidate_tracking_can_create: groups.candidateTrackingCanCreate,
        deck_automation_can_read: groups.deckAutomationCanRead,
        deck_automation_can_edit: groups.deckAutomationCanEdit,
        deck_automation_can_create: groups.deckAutomationCanCreate,
        all_quotients_can_read: groups.allQuotientsCanRead,
        all_quotients_can_edit: groups.allQuotientsCanEdit,
        all_quotients_can_create: groups.allQuotientsCanCreate,
        users_can_read: groups.usersCanRead,
        users_can_create: groups.usersCanCreate,
        users_can_delete: groups.usersCanDelete,
        groups_can_read: groups.groupsCanRead,
        groups_can_edit: groups.groupsCanEdit,
        groups_can_create: groups.groupsCanCreate,
        groups_can_delete: groups.groupsCanDelete,
        created_at: groups.createdAt
    }).from(groups).where(eq(groups.groupName, name));

    return group;
};

export async function getGroup(grpId: number): Promise<grp[]> {
    const group: grp[] = await db.select({
        group_id: groups.id,
        group_name: groups.groupName,
        candidate_tracking_can_read: groups.candidateTrackingCanRead,
        candidate_tracking_can_edit: groups.candidateTrackingCanEdit,
        candidate_tracking_can_create: groups.candidateTrackingCanCreate,
        deck_automation_can_read: groups.deckAutomationCanRead,
        deck_automation_can_edit: groups.deckAutomationCanEdit,
        deck_automation_can_create: groups.deckAutomationCanCreate,
        all_quotients_can_read: groups.allQuotientsCanRead,
        all_quotients_can_edit: groups.allQuotientsCanEdit,
        all_quotients_can_create: groups.allQuotientsCanCreate,
        users_can_read: groups.usersCanRead,
        users_can_create: groups.usersCanCreate,
        users_can_delete: groups.usersCanDelete,
        groups_can_read: groups.groupsCanRead,
        groups_can_edit: groups.groupsCanEdit,
        groups_can_create: groups.groupsCanCreate,
        groups_can_delete: groups.groupsCanDelete,
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


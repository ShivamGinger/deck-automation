import { db } from "@/db";
import { User, groups, userGroups, users } from "@/db/schema";
import { getGroup, getGroupUser, getGroupUsers, grp, grpUsers } from "@/lib/groups";
import { getUsersNotInGroup, user } from "@/lib/users";
import { addUserToGroupSchema, updateGroupSchema, updateUserGroupSchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { group_id: number } }) {
  try {
    const grpSlug = params.group_id;

    const group: grp[] = await getGroup(grpSlug);
    if (group.length === 0) {
      return NextResponse.json({ error: 'Group does not exist' }, { status: 404 });
    };

    const users: user[] = await getUsersNotInGroup(grpSlug);
    if (users.length === 0) {
      return NextResponse.json({ error: 'No users found' }, { status: 404 });
    };

    return NextResponse.json({ data: users }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching user under group:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};

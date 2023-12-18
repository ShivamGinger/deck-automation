import { db } from "@/db";
import { User, groups, userGroups, users } from "@/db/schema";
import { getGroup, getGroupUser, getGroupUsers, grp, grpUsers } from "@/lib/groups";
import { addUserToGroupSchema, updateGroupSchema, updateUserGroupSchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { user_id: number } }) {
  try {
    const userSlug = params.user_id;

    const user: User[] = await db.select().from(users).where(eq(users.id, userSlug));
    if (user.length === 0) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    };

    db.transaction(async (txn) => {
      await txn.delete(userGroups).where(eq(userGroups.userId, userSlug));
      await txn.delete(users).where(eq(users.id, userSlug));
    });

    return NextResponse.json({ status: 204 });

  } catch (error: any) {
    console.error('Error deleting Group:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
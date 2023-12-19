import { db } from "@/db";
import { User, groups, userGroups, users } from "@/db/schema";
import { getGroup, getGroupUser, getGroupUsers, grp, grpUsers } from "@/lib/groups";
import { addUserToGroupSchema, updateGroupSchema, updateUserDetailsSchema, updateUserGroupSchema } from "@/utils/bodyValidationSchemas";
import bcrypt from 'bcrypt';
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

export async function PUT(request: NextRequest, { params }: { params: { user_id: number } }) {
  try {
    const userSlug = params.user_id;
    const user: User | undefined = await db.query.users.findFirst({
      where: (eq(users.id, userSlug))
    });
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
    };

    const requestData = await request.json();
    const parsedData = updateUserDetailsSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ error: "Validation Error" }, { status: 400 });
    };

    const isPasswordCorrect = await bcrypt.compare(parsedData.data.old_password, user.password);

    if (isPasswordCorrect) {
      if (parsedData.data.new_password === parsedData.data.confirm_new_password) {
        const hashedPassword = await bcrypt.hash(parsedData.data.new_password, 10);

        await db.update(users).set({
          firstName: parsedData.data.first_name,
          lastName: parsedData.data.last_name,
          password: hashedPassword
        }).where(eq(users.id, userSlug));

        return NextResponse.json({ status: 204 });

      } else {
        return NextResponse.json({ error: "Password and confirm password does not match" }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Invalid Password!" }, { status: 400 });
  } catch (error: any) {
    console.error('Error deleting Group:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
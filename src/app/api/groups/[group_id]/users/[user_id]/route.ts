import { db } from "@/db";
import { User, groups, userGroups, users } from "@/db/schema";
import { getGroup, getGroupUser, getGroupUsers, grp, grpUsers } from "@/lib/groups";
import { addUserToGroupSchema, updateGroupSchema, updateUserGroupSchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { group_id: number, user_id: number }}){
    try {
        const grpSlug = params.group_id;
        const userSlug = params.user_id;
        const group: grp[] = await getGroup(grpSlug);
        const user: User[] = await db.select().from(users).where(eq(users.id, userSlug));
        if (group.length === 0) {
          return NextResponse.json({ error: 'Group does not exist' }, { status: 404 });
        }
        else if (user.length === 0) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        };
        const groupUser: grpUsers[] = await getGroupUser(grpSlug, userSlug);
        
        if (groupUser.length === 0) {
            return NextResponse.json({ error: `No User with Id ${userSlug} exist under this group` }, { status: 404 });
        }

        return NextResponse.json({ data: groupUser }, { status: 200 });
    
    } catch (error: any) {
        console.error('Error fetching user under group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function PUT(request: NextRequest, { params }: { params: { user_id: number }}) {
    try {
        const requestData = await request.json();
        const userSlug = params.user_id;
        const parsedData = updateUserGroupSchema.safeParse(requestData);
        if (!parsedData.success) {
            return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
        };

        await db.update(userGroups).set({
            groupId: parsedData.data.group_id,
            userId: userSlug
        });

        return NextResponse.json({ status: 201 });

    } catch (error: any) {
        console.error('Error adding user to group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
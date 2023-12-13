import { db } from "@/db";
import { groups, userGroups } from "@/db/schema";
import { getGroup, getGroupUsers, grp, grpUsers } from "@/lib/groups";
import { addUserToGroupSchema, updateGroupSchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { group_id: number }}){
    try {
        const grpSlug = params.group_id;
        const groupUsers: grpUsers[] = await getGroupUsers(grpSlug);
        
        return NextResponse.json({ data: groupUsers }, { status: 200 });
    
    } catch (error: any) {
        console.error('Error fetching group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function POST(request: NextRequest, { params }: { params: { group_id: number }}) {
    try {
        const requestData = await request.json();
        const parsedData = addUserToGroupSchema.safeParse(requestData);
        const grpSlug = params.group_id;
        
        if (!parsedData.success) {
            return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
        };
        // const checkGrp = await userInGroup(parsedData.data.group_name);
        // if (checkGrp.length !== 0) {
        //     return NextResponse.json({ error: "Group already exists" }, { status: 409 });
        // };

        const groupUserValues: MySqlInsertValue<typeof userGroups> = {
            groupId: grpSlug,
            userId: parsedData.data.user_id
        };

        await db.insert(userGroups).values(groupUserValues);

        return NextResponse.json({ status: 201 });

    } catch (error: any) {
        console.error('Error adding user to group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

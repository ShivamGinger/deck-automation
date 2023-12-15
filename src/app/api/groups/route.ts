import { db } from "@/db";
import { Groups, groups } from "@/db/schema";
import { getAllGroups, getGroupByName, grp } from "@/lib/groups";
import { createGroupSchema } from "@/utils/bodyValidationSchemas";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const groups: grp[] = await getAllGroups();
        return NextResponse.json({
            data: groups.map(group => ({
                ...group,
                can_create: group.can_create === 1 ? true : false,
                can_delete: group.can_delete === 1 ? true : false,
                can_edit: group.can_edit === 1 ? true : false,
                can_read: group.can_read === 1 ? true : false,
            }))
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error fetching groups:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function POST(request: NextRequest) {
    try {
        const requestData = await request.json();
        const parsedData = createGroupSchema.safeParse(requestData);
        if (!parsedData.success) {
            return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
        };
        const checkGrp = await getGroupByName(parsedData.data.group_name);
        if (checkGrp.length !== 0) {
            return NextResponse.json({ error: "Group already exists" }, { status: 409 });
        };

        const groupValues: MySqlInsertValue<typeof groups> = {
            groupName: parsedData.data.group_name,
            canRead: parsedData.data.can_read,
            canCreate: parsedData.data.can_create,
            canEdit: parsedData.data.can_edit,
            canDelete: parsedData.data.can_delete,
        };

        await db.insert(groups).values(groupValues);

        return NextResponse.json({ status: 201 });

    } catch (error: any) {
        console.error('Error creating group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
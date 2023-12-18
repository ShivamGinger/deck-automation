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
                candidate_tracking_can_read: group.candidate_tracking_can_read === 1 ? true : false,
                candidate_tracking_can_edit: group.candidate_tracking_can_edit === 1 ? true : false,
                candidate_tracking_can_create: group.candidate_tracking_can_create === 1 ? true : false,
                deck_automation_can_read: group.deck_automation_can_read === 1 ? true : false,
                deck_automation_can_edit: group.deck_automation_can_edit === 1 ? true : false,
                deck_automation_can_create: group.deck_automation_can_create === 1 ? true : false,
                all_quotients_can_read: group.all_quotients_can_read === 1 ? true : false,
                all_quotients_can_edit: group.all_quotients_can_edit === 1 ? true : false,
                all_quotients_can_create: group.all_quotients_can_create === 1 ? true : false,
                users_can_read: group.users_can_read === 1 ? true : false,
                users_can_create: group.users_can_create === 1 ? true : false,
                users_can_delete: group.users_can_delete === 1 ? true : false,
                groups_can_read: group.groups_can_read === 1 ? true : false,
                groups_can_edit: group.groups_can_edit === 1 ? true : false,
                groups_can_create: group.groups_can_create === 1 ? true : false,
                groups_can_delete: group.groups_can_delete === 1 ? true : false,
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
            candidateTrackingCanRead: parsedData.data.candidate_tracking_can_read,
            candidateTrackingCanEdit: parsedData.data.candidate_tracking_can_edit,
            candidateTrackingCanCreate: parsedData.data.candidate_tracking_can_create,
            deckAutomationCanRead: parsedData.data.deck_automation_can_read,
            deckAutomationCanEdit: parsedData.data.deck_automation_can_edit,
            deckAutomationCanCreate: parsedData.data.deck_automation_can_create,
            allQuotientsCanRead: parsedData.data.all_quotients_can_read,
            allQuotientsCanEdit: parsedData.data.all_quotients_can_edit,
            allQuotientsCanCreate: parsedData.data.all_quotients_can_create,
            usersCanRead: parsedData.data.users_can_read,
            usersCanCreate: parsedData.data.users_can_create,
            usersCanDelete: parsedData.data.users_can_delete,
            groupsCanRead: parsedData.data.groups_can_read,
            groupsCanEdit: parsedData.data.groups_can_edit,
            groupsCanCreate: parsedData.data.groups_can_create,
            groupsCanDelete: parsedData.data.groups_can_delete,
        };

        await db.insert(groups).values(groupValues);

        return NextResponse.json({ status: 201 });

    } catch (error: any) {
        console.error('Error creating group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
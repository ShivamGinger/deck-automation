import { db } from "@/db";
import { groups, userGroups } from "@/db/schema";
import { getGroup, grp } from "@/lib/groups";
import { updateGroupSchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { group_id: number }}){
    try {
        const grpSlug = params.group_id;
      const group: grp[] = await getGroup(grpSlug);
      if (group.length === 0) {
        return NextResponse.json({ error: 'Group does not exist' }, { status: 404 });
      }
      return NextResponse.json({ data: group }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
  };

export async function DELETE(request: Request, { params }: { params: { group_id: number }}){
    try{
      const grpSlug = params.group_id;
      const grpExist: grp[] = await getGroup(grpSlug);
      if (grpExist.length === 0) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
      };
      
      db.transaction(async (txn) => {
        await txn.delete(userGroups).where(eq(userGroups.groupId, grpSlug));
        await txn.delete(groups).where(eq(groups.id, grpSlug));
      });

      return NextResponse.json({ status: 204 });

    } catch (error: any) {
        console.error('Error deleting Group:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function PUT(request: NextRequest, { params }: { params: { group_id: number }}) {
  try {
      const requestData = await request.json();
      const grpSlug = params.group_id;
      const parsedData = updateGroupSchema.safeParse(requestData);
      if (!parsedData.success) {
          return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
      };

      await db.update(groups).set({
        groupName: parsedData.data.group_name,
        canRead: parsedData.data.can_read,
        canEdit: parsedData.data.can_edit,
        canCreate: parsedData.data.can_create,
        canDelete: parsedData.data.can_delete
      })
      .where(eq(groups.id, grpSlug));

      return NextResponse.json({status: 204});
  } catch (error: any) {
      console.error('Error updating group:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
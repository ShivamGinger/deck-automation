import { db } from "@/db";
import { roles } from "@/db/schema";
import { getRole } from "@/lib/roles";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { company_id: number, role_id: number }}){
  try {
    const company = await getRole(params.company_id, params.role_id);
    if (company.length === 0) {
      return NextResponse.json({ error: 'Role does not exist' }, { status: 404 });
    }
    return NextResponse.json({ data: company }, { status: 200 });
  } catch (error: any) {
      console.error('Error fetching role:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function DELETE(request: Request, { params }: { params: { company_id: number, role_id: number }}){
    try{
      const rslugId = params.role_id;
      const cslugId = params.company_id;

      const roleExists = await db
      .select({ id: roles.id })
      .from(roles)
      .where(and(eq(roles.id, rslugId), eq(roles.companyId, cslugId)));
      
      if (roleExists.length === 0) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    };
  
      const roleDel = await db.delete(roles).where(eq(roles.id, rslugId));      
      return NextResponse.json({ status: 204 });
    } catch (error: any) {
        console.error('Error deleting Role:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
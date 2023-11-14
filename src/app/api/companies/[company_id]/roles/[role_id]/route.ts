import { db } from "@/db";
import { roles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { company_id: number, role_id: number }}){
    try{
      const rslugId = params.role_id;
      const cslugId = params.company_id;

      const roleExists = await db
      .select({ id: roles.id })
      .from(roles)
      .where(eq(roles.id, rslugId))
      .where(eq(roles.companyId, cslugId));
      
      if (roleExists.length === 0) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    };
  
      const roleDel = await db.delete(roles).where(eq(roles.id, rslugId));      
      return NextResponse.json({ message: "Role deleted successfully" }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting Role:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
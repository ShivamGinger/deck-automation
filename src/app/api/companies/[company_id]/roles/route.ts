import { db } from "@/db";
import { Role, roles } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { getCompanyRoles, getRoleByName } from "@/lib/roles";
import { createRoleSchema } from "@/utils/bodyValidationSchemas";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextResponse, { params }: { params: { company_id: number }}) {
    try{
        const companyIdExist = await getCompany(params.company_id);
        if (companyIdExist.length === 0) {
          return NextResponse.json({ error: "Company not found" }, { status: 404 });
        };
        const roles: Role[] = await getCompanyRoles(params.company_id);
        if (roles.length === 0) {
            return NextResponse.json({ error: "No roles found for company" }, { status: 404});
        };
        return NextResponse.json({ data: roles }, { status: 200});
    } catch (error: any) {
        console.error('Error fetching company roles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function POST(request: NextRequest) {
    try {
      const requestData = await request.json();
      const parsedData = createRoleSchema.parse(requestData);
      
      const companyIdExist = await getCompany(parsedData.companyId);
      if (companyIdExist.length === 0) {
        return NextResponse.json({ error: "Company not found cannot add role" }, { status: 404 });
      };
      
      const roleExist = await getRoleByName(parsedData.companyId, parsedData.name);
      if (roleExist.length !== 0) {
        return NextResponse.json({ error: "Role already exists" }, { status: 409 });
      };
      
      const addrole = await db.insert(roles).values({
        name: parsedData.name,
        companyId: parsedData.companyId
      });
      const roleId: any = await db.execute(sql`SELECT LAST_INSERT_ID()`);
      const crtRole = await db.select().from(roles).where(eq(roles.id, roleId.rows[0]["LAST_INSERT_ID()"]))
      return NextResponse.json({ message: "Role added successfully", data: crtRole }, { status: 201});
      
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
  
        return NextResponse.json({ error: 'Validation error', details: errorDetails }, { status: 400 });
      } else {
        console.error('Error adding company:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    };
  };
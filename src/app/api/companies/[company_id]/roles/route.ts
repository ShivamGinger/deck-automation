import { db } from "@/db";
import { roles } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { companyRoles, getCompanyRoles, getRoleByName } from "@/lib/roles";
import { createRoleSchema } from "@/utils/bodyValidationSchemas";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest, { params }: { params: { company_id: number } }) {
  try {
    const companyIdExist = await getCompany(params.company_id);
    if (companyIdExist.length === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    };

    const roles: companyRoles[] = await getCompanyRoles(params.company_id);
    if (roles.length === 0) {
      return NextResponse.json({ error: "No roles found for company" }, { status: 404 });
    };

    return NextResponse.json({ data: roles }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching company roles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};

export async function POST(request: NextRequest, { params }: { params: { company_id: number } }) {
  try {
    const qSlug = params.company_id;
    const requestData = await request.json();
    const parsedData = createRoleSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
    };

    const companyIdExist = await getCompany(qSlug);
    if (companyIdExist.length === 0) {
      return NextResponse.json({ error: "Company not found cannot add role" }, { status: 404 });
    };

    const roleExist = await getRoleByName(qSlug, parsedData.data.role_name);

    if (roleExist.length !== 0) {
      return NextResponse.json({ error: "Role already exists" }, { status: 409 });
    };

    const addrole = await db.insert(roles).values({
      name: parsedData.data.role_name,
      companyId: qSlug
    });

    const roleId: any = await db.execute(sql`SELECT LAST_INSERT_ID()`);
    const crtRole = await db.select().from(roles).where(eq(roles.id, roleId.rows[0]["LAST_INSERT_ID()"]))
    return NextResponse.json({ message: "Role added successfully", data: crtRole }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding company:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
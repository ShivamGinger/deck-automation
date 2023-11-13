import { Role } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { getCompanyRoleCandidate, getCompanyRoles, roleCandidate } from "@/lib/roles";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse, { params }: { params: { company_id: number, role_id: number}}) {
    try{
        const companyIdExist = await getCompany(params.company_id);
        if (companyIdExist.length === 0) {
          return NextResponse.json({ error: "Company not found" }, { status: 404 });
        };
        const roles: roleCandidate[] = await getCompanyRoleCandidate(params.company_id, params.role_id);
        if (roles.length === 0) {
            return NextResponse.json({ error: "No roles found for company" }, { status: 404});
        };
        return NextResponse.json({ data: roles }, { status: 200});
    } catch (error: any) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
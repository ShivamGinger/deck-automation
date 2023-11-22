import { Companies, Role } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { companyRoles, getCompanyRoleCandidate, getRole, roleCandidates } from "@/lib/roles";
import { NextRequest, NextResponse } from "next/server";

//TODO: Implement DELETE,PUT methods
export async function GET(request: NextRequest, { params }: { params: { company_id: number, role_id: number, role_candidate_id: number}}) {
    try{
        const companyIdExist: Companies[] = await getCompany(params.company_id);
        if (companyIdExist.length === 0) {
          return NextResponse.json({ error: "Company not found" }, { status: 404 });
        };
        const roleIdExist: companyRoles[] = await getRole(params.company_id, params.role_id);
        if (roleIdExist.length === 0) {
            return NextResponse.json({ error: "Role not found" }, { status: 404 });
          };
        const rolesCandidate: roleCandidates[] = await getCompanyRoleCandidate(params.company_id, params.role_id, params.role_candidate_id);
        if (rolesCandidate.length === 0) {
            return NextResponse.json({ error: "No candidates under this role" }, { status: 404});
        };
        return NextResponse.json({ data: rolesCandidate }, { status: 200});
    } catch (error: any) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
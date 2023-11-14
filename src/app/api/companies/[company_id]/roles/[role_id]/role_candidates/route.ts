import { db } from "@/db";
import { Role, parameterScores, parameters } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { getCompanyRoleCandidate, getCompanyRoles, roleCandidate } from "@/lib/roles";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse, { params }: { params: { company_id: number, role_id: number}}) {
    try{
        const companyIdExist = await getCompany(params.company_id);
        if (companyIdExist.length === 0) {
          return NextResponse.json({ error: "Company not found" }, { status: 404 });
        };
        const rolesCandidate: roleCandidate[] = await getCompanyRoleCandidate(params.company_id, params.role_id);
        const pTopScores = db.select({ 
          candidateId: parameterScores.candidateId,
          paramScore: parameterScores.score,
          paramName: parameters.parameter
        })
        .from(parameterScores)
        .innerJoin(parameters, eq(parameters.id, parameterScores.parameterId))
        .orderBy(desc(parameterScores.score))
        .limit(5);
            
        if (rolesCandidate.length === 0) {
            return NextResponse.json({ error: "No candidates under this role" }, { status: 404});
        };
        return NextResponse.json({ data: rolesCandidate }, { status: 200});
    } catch (error: any) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
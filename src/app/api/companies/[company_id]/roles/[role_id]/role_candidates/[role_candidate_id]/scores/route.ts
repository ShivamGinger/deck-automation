//TODO: score retrieval for the candidate PUT, DELETE(baad mai dekh liyo iska)

import { Companies } from "@/db/schema";
import { candidateParamScoreExist, candidateParamScoreList, candidateQuoScoreExist, candidateQuoScoreList, paramScoreList, quoScoreList, scoreExist } from "@/lib/candidates";
import { getCompany } from "@/lib/companies";
import { companyRoles, getCompanyRoleCandidate, getRole, roleCandidates } from "@/lib/roles";
import { NextRequest, NextResponse } from "next/server";

//candidateQuoScoreList, quoScoreList

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
            return NextResponse.json({ error: "Candidate does not exist" }, { status: 404});
        };

        const paramScoreExists: scoreExist[] = await candidateParamScoreExist(params.role_candidate_id);
        const quoScoreExists: scoreExist[] = await candidateQuoScoreExist(params.role_candidate_id);
        if (paramScoreExists.length === 0 && quoScoreExists.length === 0) {
            return NextResponse.json({ error: "Scores do not exist" }, { status: 404});
        };

        const candidateParamScore: paramScoreList[] = await candidateParamScoreList(params.role_candidate_id);
        const candidateQuoScore: quoScoreList[] = await candidateQuoScoreList(params.role_candidate_id);

        return NextResponse.json({ "candidate_id": params.role_candidate_id, 
        "candidate_scores": {
            "quotient_scores": candidateQuoScore,
            "parameter_scores": candidateParamScore
        } 
        }, { status: 200});
    
    } catch (error: any) {
        console.error('Error fetching candidate score:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
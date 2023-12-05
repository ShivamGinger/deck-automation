import { db } from "@/db";
import { Companies, Role, candidateStatus, candidates, parameterScores, quotientScores } from "@/db/schema";
import { candidate, candidateParamScoreExist, candidateQuoScoreExist, getCandidate, scoreExist } from "@/lib/candidates";
import { getCompany } from "@/lib/companies";
import { companyRoles, getCompanyRoleCandidate, getRole, roleCandidates } from "@/lib/roles";
import { updateCandidateSchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
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

export async function DELETE(request: NextRequest, { params }: { params: { company_id: number, role_id: number, candidate_id: number }}) {
    try {
        const candidateSlug = params.candidate_id;
        const companySlug = params.company_id;
        const roleSlug = params.role_id;
        const companyExist: Companies[] = await getCompany(companySlug);
        if (companyExist.length === 0) {
          return NextResponse.json({ error: "Cannot delete candidate, Company not found" }, { status: 404 });
        };
        
        const roleExist: companyRoles[] = await getRole(companySlug, roleSlug);
        if (roleExist.length === 0) {
            return NextResponse.json({ error: "Cannot delete candidate, Role not found" }, { status: 404 });
        };

        const candidateExist: candidate[] = await getCandidate(candidateSlug);
        if (candidateExist.length === 0) {
            return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
        };

        db.transaction( async (txn) => {
            await txn.delete(parameterScores).where(eq(parameterScores.candidateId, candidateSlug));
            await txn.delete(quotientScores).where(eq(quotientScores.candidateId, candidateSlug));
            await txn.delete(candidateStatus).where(eq(candidateStatus.candidateId, candidateSlug))
            await txn.delete(candidates).where(eq(candidates.id, candidateSlug));
        });

    } catch(error: any) {
        console.error('Error deleting candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function PUT(request: NextRequest, { params }: { params: { company_id: number, role_id: number, candidate_id: number }}) {
    try {
        const requestData = await request.json();
        const candidateSlug = params.candidate_id;
        const parsedData = updateCandidateSchema.safeParse(requestData);
        if (!parsedData.success) {
            return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
        };
        
        const updatedCandidateData = parsedData.data;
        await db.update(candidates).set({
            name: updatedCandidateData.candidate_name,
            keyPoints: updatedCandidateData.key_points,
            profilePic: updatedCandidateData.profile_pic,
            social: updatedCandidateData.social,
            email: updatedCandidateData.email,
            currPos: updatedCandidateData.current_position,
            currLoc: updatedCandidateData.current_location,
            experience: updatedCandidateData.experience,
            phNum: updatedCandidateData.phone_number,
            fixedLpa: String(updatedCandidateData.fixed_lpa),
            varLpa: String(updatedCandidateData.variable_lpa),
            expectedCtc: updatedCandidateData.expected_ctc,
            noticePeriod: updatedCandidateData.notice_period,
            description: updatedCandidateData.description,
            achievement: updatedCandidateData.achievement,
            gender: updatedCandidateData.gender,
            currCmp: updatedCandidateData.current_company,
            esopRsu: String(updatedCandidateData.esop_rsu)
        }).where(eq(candidates.id, candidateSlug));

        return NextResponse.json({status: 204});
    } catch (error: any) {
        console.error('Error updating candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

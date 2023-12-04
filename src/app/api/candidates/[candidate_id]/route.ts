import { db } from "@/db";
import { candidateStatus, candidates, parameterScores, quotientScores } from "@/db/schema";
import { getCandidate, candidate, CandidateStatusType } from "@/lib/candidates";
import { updateOrphanCandidateSchema } from "@/utils/bodyValidationSchemas";
import { eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

//TODO: Implement DELETE method
export async function GET(request: NextRequest, { params }: { params: { candidate_id: number} } ) {
    try{
        const candidate: candidate[] = await getCandidate(params.candidate_id);
        if (candidate.length === 0){
            return NextResponse.json({ error: `Candidate with Id ${params.candidate_id} not found.` }, { status: 404 });
        }
    
        return NextResponse.json({ data: candidate }, { status: 200});
    } catch (error: any) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function DELETE(request: NextRequest, { params }: { params: { candidate_id: number }}) {
    try {
        const candidateSlug = params.candidate_id;
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

export async function PUT(request: NextRequest, { params }: { params: { candidate_id: number }}) {
    try {
        const requestData = await request.json();
        const candidateSlug = params.candidate_id;
        const parsedData = updateOrphanCandidateSchema.safeParse(requestData);
        if (!parsedData.success) {
            return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
        };
        const candidateStatusExist = await db.select({ candidate_id: candidateStatus.candidateId })
        .from(candidateStatus)
        .where(eq(candidateStatus.candidateId, candidateSlug));
        let cStatus = 204;

        db.transaction(async (txn) => {
            const updatedOrphanCandidateData = parsedData.data;
            await txn.update(candidates).set({
                name: updatedOrphanCandidateData.candidate_name,
                keyPoints: updatedOrphanCandidateData.key_points,
                profilePic: updatedOrphanCandidateData.profile_pic,
                companyId: updatedOrphanCandidateData.company_id,
                roleId: updatedOrphanCandidateData.role_id,
                social: updatedOrphanCandidateData.social,
                email: updatedOrphanCandidateData.email,
                currPos: updatedOrphanCandidateData.current_position,
                currLoc: updatedOrphanCandidateData.current_location,
                experience: updatedOrphanCandidateData.experience,
                phNum: updatedOrphanCandidateData.phone_number,
                fixedLpa: String(updatedOrphanCandidateData.fixed_lpa),
                varLpa: String(updatedOrphanCandidateData.variable_lpa),
                expectedCtc: updatedOrphanCandidateData.expected_ctc,
                noticePeriod: updatedOrphanCandidateData.notice_period,
                description: updatedOrphanCandidateData.description,
                achievement: updatedOrphanCandidateData.achievement,
                gender: updatedOrphanCandidateData.gender,
                currCmp: updatedOrphanCandidateData.current_company,
                esopRsu: String(updatedOrphanCandidateData.esop_rsu)
            }).where(eq(candidates.id, params.candidate_id));
            if (candidateStatusExist.length !== 0) {
                await txn.update(candidateStatus).set({
                    profileShrDate: updatedOrphanCandidateData.candidate_profile_share_date,
                    status: updatedOrphanCandidateData.candidate_status as CandidateStatusType,
                    roundDone: updatedOrphanCandidateData.candidate_round_completed,
                    reasonReject: updatedOrphanCandidateData.candidate_reject_reason
                }).where(eq(candidateStatus.candidateId, candidateSlug));

            } else {
                const candidateStatusValues: MySqlInsertValue<typeof candidateStatus> = {
                    candidateId: candidateSlug,
                    profileShrDate: updatedOrphanCandidateData.candidate_profile_share_date,
                    status: updatedOrphanCandidateData.candidate_status as CandidateStatusType,
                    roundDone: updatedOrphanCandidateData.candidate_round_completed,
                    reasonReject: updatedOrphanCandidateData.candidate_reject_reason
                  }
                await txn.insert(candidateStatus).values(candidateStatusValues);
                cStatus = 201;
            };
        });
        return NextResponse.json({status: cStatus});
    } catch (error: any) {
        console.error('Error updating candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
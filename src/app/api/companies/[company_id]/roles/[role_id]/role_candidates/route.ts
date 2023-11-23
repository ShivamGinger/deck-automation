import { db } from "@/db";
import { Companies, Role, candidateStatus, candidates, parameterScores, parameterWeightages, parameters, quotientScores } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { companyRoles, getCompanyRoleCandidates, getCompanyRoles, getRole, roleCandidates } from "@/lib/roles";
import { createCandidateSchema } from "@/utils/bodyValidationSchemas";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { paramWeightage, paramQuotientId } from "@/lib/parameters";

export async function GET(request: NextRequest, { params }: { params: { company_id: number, role_id: number}}) {
    try{
        const companyIdExist: Companies[] = await getCompany(params.company_id);
        if (companyIdExist.length === 0) {
          return NextResponse.json({ error: "Company not found" }, { status: 404 });
        };
        const roleIdExist: companyRoles[] = await getRole(params.company_id, params.role_id);
        if (roleIdExist.length === 0) {
            return NextResponse.json({ error: "Role not found" }, { status: 404 });
          };
        const rolesCandidate: roleCandidates[] = await getCompanyRoleCandidates(params.company_id, params.role_id);
        if (rolesCandidate.length === 0) {
            return NextResponse.json({ error: "No candidates under this role" }, { status: 404});
        };
        return NextResponse.json({ data: rolesCandidate }, { status: 200});
    } catch (error: any) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function POST(request: NextRequest, { params }: { params : { company_id: number, role_id: number}}) {
    try {
      const requestData = await request.json();
      const parsedData = createCandidateSchema.safeParse(requestData);
      const cSlug = params.company_id;
      const rSlug = params.role_id;
      if (!parsedData.success) {
        return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
      };
      for( const data of parsedData.data.candidate_information) {
        await db.transaction(async (txn) => {
          await txn.insert(candidates).values({
            name: data.candidate_name,
            keyPoints: data.key_points,
            profilePic: data.profile_pic,
            social: data.social,
            companyId: cSlug,
            roleId: rSlug,
            email: data.email,
            currPos: data.current_position,
            currLoc: data.current_location,
            experience: data.experience,
            phNum: data.phone_number,
            fixedLpa: data.fixed_lpa,
            varLpa: data.variable_lpa,
            expectedCtc: data.expected_ctc,
            noticePeriod: data.notice_period,
            description: data.description,
            achievement: data.achievement,
            gender: data.gender,
            currCmp: data.current_company,
            esopRsu: data.esop_rsu
          }
          );
          const candId: any = await txn.execute(sql`SELECT LAST_INSERT_ID()`);
          if (data.share_candidate_status){
            const statusData = data.candidate_status
            await txn.insert(candidateStatus).values({
              candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
              profileShrDate: statusData?.candidate_profile_share_date,
              status: statusData?.candidate_status,
              roundDone: statusData?.candidate_round_completed,
              reasonReject: statusData?.candidate_reject_reason
            });
          };
          let scoreToBeSummed = [];
          let parameter_quotient_id: paramQuotientId[] = [];
          for( const score of data.candidate_parameter_scores ) {
            await txn.insert(parameterScores).values({
              candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
              parameterId: score.parameter_id,
              score: score.parameter_score
            });
            const parameterWeightage: paramWeightage[] = await txn.select({
              parameter_weightage: parameterWeightages.pWeightage
          })
          .from(parameterWeightages)
          .where(and(eq(parameterWeightages.companyId, cSlug), eq(parameterWeightages.roleId, rSlug), eq(parameterWeightages.parameterId, score.parameter_id)));
          
          scoreToBeSummed.push((score.parameter_score * parameterWeightage[0].parameter_weightage));

          parameter_quotient_id = await txn.select(
            {
              quotient_id: parameters.quotientId
            }
          )
          .from(parameters)
          .where(eq(parameters.id, score.parameter_id));
          };
          const summedScore = scoreToBeSummed.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
          }, 0) / 100;

          await txn.insert(quotientScores).values({
            candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
            quotientId: parameter_quotient_id[0].quotient_id,
            totalScore:  String(summedScore)
          });
        });
        
      };
      return NextResponse.json({ status: 201 });
    
    } catch (error: any) {
      console.error('Error adding candidates:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
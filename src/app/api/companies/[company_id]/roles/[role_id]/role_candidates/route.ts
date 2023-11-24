import { db } from "@/db";
import { Companies, Role, candidateStatus, candidates, parameterScores, parameterWeightages, parameters, quotientScores, quotients } from "@/db/schema";
import { CandidateStatusType } from "@/lib/candidates";
import { getCompany } from "@/lib/companies";
import { paramQuotientId, paramWeightage } from "@/lib/parameters";
import { companyRoles, getCompanyRoleCandidates, getCompanyRoles, getRole, roleCandidates } from "@/lib/roles";
import { createCandidateSchema } from "@/utils/bodyValidationSchemas";
import { and, eq, sql } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { company_id: number, role_id: number } }) {
  try {
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
      return NextResponse.json({ error: "No candidates under this role" }, { status: 404 });
    };
    return NextResponse.json({ data: rolesCandidate }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching candidate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};

export async function POST(request: NextRequest, { params }: { params: { company_id: number, role_id: number } }) {
  try {
    const requestData = await request.json();
    const parsedData = createCandidateSchema.safeParse(requestData);
    const cSlug = params.company_id;
    const rSlug = params.role_id;
    if (!parsedData.success) {
      return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
    };
    for (const data of parsedData.data.candidate_information) {
      await db.transaction(async (txn) => {
        const vals: MySqlInsertValue<typeof candidates> = {
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
          fixedLpa: String(data.fixed_lpa),
          varLpa: String(data.variable_lpa),
          expectedCtc: data.expected_ctc,
          noticePeriod: data.notice_period,
          description: data.description,
          achievement: data.achievement,
          gender: data.gender,
          currCmp: data.current_company,
          esopRsu: String(data.esop_rsu)
        }

        await txn.insert(candidates).values(vals);

        const candId: any = await txn.execute(sql`SELECT LAST_INSERT_ID()`);
        if (data.share_candidate_status) {
          const statusData = data.candidate_status;

          const candidateStatusValues: MySqlInsertValue<typeof candidateStatus> = {
            candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
            profileShrDate: statusData?.candidate_profile_share_date,
            status: statusData?.candidate_status as CandidateStatusType,
            roundDone: statusData?.candidate_round_completed,
            reasonReject: statusData?.candidate_reject_reason
          };

          await txn.insert(candidateStatus).values(candidateStatusValues);
        };

        for (const score of data.candidate_parameter_scores) {
          await txn.insert(parameterScores).values({
            candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
            parameterId: score.parameter_id,
            score: score.parameter_score
          });
        };

        const totalQScore = await txn.select({
          quotient_id: quotients.id,
          total_score: sql<number>`SUM(${parameterWeightages.pWeightage} * ${parameterScores.score}) / 100`.as('total_score') //mapWith().
        })
          .from(parameterScores)
          .innerJoin(parameterWeightages, eq(parameterWeightages.parameterId, parameterScores.parameterId))
          .innerJoin(parameters, eq(parameters.id, parameterScores.parameterId))
          .innerJoin(quotients, eq(quotients.id, parameters.quotientId))
          .where(and(eq(parameterScores.candidateId, parseInt(candId.rows[0]["LAST_INSERT_ID()"])), eq(parameterWeightages.companyId, cSlug), eq(parameterWeightages.roleId, rSlug)))
          .groupBy(quotients.id)

        for (const data of totalQScore) {
          const totalScoreValues: MySqlInsertValue<typeof quotientScores> = {
            candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
            quotientId: data.quotient_id,
            totalScore: String(data.total_score)
          };

          await txn.insert(quotientScores).values(totalScoreValues);
        };
      });

    };
    return NextResponse.json({ status: 201 });

  } catch (error: any) {
    console.error('Error adding candidates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
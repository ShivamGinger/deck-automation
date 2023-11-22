import { NextRequest, NextResponse } from "next/server";

import getAllCandidatesWStatus from "@/lib/candidates";

import { db } from "@/db";
import { candidateStatus, candidates, roles } from "@/db/schema";

import { createCandidateSchema, createOrphanCandidateSchema } from "@/utils/bodyValidationSchemas";
import { eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const candidates = await getAllCandidatesWStatus();
    if (candidates.length === 0) {
      return NextResponse.json({ error: 'No candidates found' }, { status: 404 });
    }
    return NextResponse.json({ data: candidates }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching candidate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = createOrphanCandidateSchema.safeParse(requestData);
    if (!parsedData.success) {
      return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
    };

    for (const data of parsedData.data.candidate_information) {
      await db.transaction(async (txn) => {
        await txn.insert(candidates).values({
          name: data.candidate_name,
          keyPoints: data.key_points,
          profilePic: data.profile_pic,
          social: data.social,
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
        if (data.share_candidate_status) {
          const statusData = data.candidate_status
          await txn.insert(candidateStatus).values({
            candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
            profileShrDate: statusData?.candidate_profile_share_date,
            status: statusData?.candidate_status,
            roundDone: statusData?.candidate_round_completed,
            reasonReject: statusData?.candidate_reject_reason
          })
        };

      });
    };
    return NextResponse.json({ status: 201 });

  } catch (error: any) {
    console.error('Error adding candidates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
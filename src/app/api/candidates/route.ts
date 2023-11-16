import { NextRequest, NextResponse } from "next/server";

import getAllCandidates from "@/lib/candidates";

import { db } from "@/db";
import { candidateStatus, candidates, roles } from "@/db/schema";

import { createCandidateSchema } from "@/utils/bodyValidationSchemas";
import { sql, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const candidates = await getAllCandidates();
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
    const parsedData = createCandidateSchema.safeParse(requestData);
    if (!parsedData.success) {
      return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
    };
    for( const data of parsedData.data.candidateInfo) {
      await db.transaction(async (txn) => {
        await txn.insert(candidates).values({
          name: data.name,
          keyPoints: {"keyPoints": data.keyPoints},
          profilePic: data.profilePic,
          social: data.social,
          companyId: data.companyId,
          roleId: data.roleId,
          email: data.email,
          currPos: data.currPos,
          currLoc: data.currLoc,
          experience: data.experience,
          phNum: data.phNum,
          fixedLpa: data.fixedLpa,
          varLpa: data.varLpa,
          expectedCtc: data.expectedCtc,
          noticePeriod: data.noticePeriod,
          description: data.description,
          achievement: {"achievement": data.achievement},
          gender: data.gender,
          currCmp: data.currCmp,
          esopRsu: data.esopRsu
        }
        );
        const candId: any = await txn.execute(sql`SELECT LAST_INSERT_ID()`);
        if (data.shareCandidateStatus){
          const statusData = data.candidateStatus
          await txn.insert(candidateStatus).values({
            candidateId: parseInt(candId.rows[0]["LAST_INSERT_ID()"]),
            profileShrDate: statusData?.profileShrDate,
            status: statusData?.status,
            roundDone: statusData?.roundDone,
            reasonReject: statusData?.reasonReject
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
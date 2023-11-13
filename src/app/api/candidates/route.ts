import { ZodError } from "zod";

import { NextRequest, NextResponse } from "next/server";

import getAllCandidates from "@/lib/candidates";

import { db } from "@/db";
import { candidates } from "@/db/schema";

import { createCandidateSchema } from "@/utils/bodyValidationSchemas";

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
    const parsedData = createCandidateSchema.parse(requestData);
    const candidate = await db.insert(candidates).values({
      name: parsedData.name,
      email: parsedData.email,
      keyPoints: parsedData.keyPoints,
      profilePic: parsedData.profilePic,
      social: parsedData.social,
      currPos: parsedData.currPos,
      currLoc: parsedData.currLoc,
      experience: parsedData.experience,
      phNum: parsedData.phNum,
      fixedLpa: parsedData.fixedLpa,
      varLpa: parsedData.varLpa,
      expectedCtc: parsedData.expectedCtc,
      noticePeriod: parsedData.noticePeriod
    }
    );

    return NextResponse.json({ message: "Data added successfully", data: parsedData }, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      
      const errorDetails = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json({ error: "Validation error", details: errorDetails }, { status: 400 });
    }
    else {
      return NextResponse.json({ error: "Invalid request", details: error.message }, { status: 400 });
    }
  }
};
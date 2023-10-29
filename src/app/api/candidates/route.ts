import { ZodError } from "zod";

import { NextRequest, NextResponse } from "next/server";

import getAllCandidates from "@/lib/candidates";

import { db } from "@/db";
import { candidates } from "@/db/schema";

import { createCandidateSchema } from "@/utils/bodyValidationSchemas";

export async function GET(request: NextRequest) {

  const candidates = await getAllCandidates();

  return NextResponse.json(candidates);
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = createCandidateSchema.parse(requestData);

    const addCandidate = await db.insert(candidates).values(parsedData);

    if (addCandidate) {
      return NextResponse.json({ message: "Data added successfully", data: parsedData });
    } else {
      return NextResponse.json({ error: "Data insertion failed" }, { status: 500 });
    }

  } catch (error: any) {

    if (error instanceof ZodError) {

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
}
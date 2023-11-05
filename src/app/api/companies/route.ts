import { db } from "@/db";
import { companies } from "@/db/schema";
import { createCompanySchema } from "@/utils/bodyValidationSchemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = createCompanySchema.parse(requestData);

    const exsistingCompany = await db.query.companies.findFirst({
      where: eq(companies.name, parsedData.name)
    });

    if (exsistingCompany) {
      return NextResponse.json({ error: "Company Already Exsists" }, { status: 409 });
    }

    const addCompany = await db.insert(companies).values(parsedData);

    if (addCompany) {
      return NextResponse.json({ message: "Company added successfully", data: parsedData });
    } else {
      return NextResponse.json({ error: "Company insertion failed" }, { status: 500 });
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
};
import { db } from "@/db";
import { companies } from "@/db/schema";
import { createCompanySchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import getAllCompanies, { getCompany, getCompanyByName } from "@/lib/companies";

export async function GET(request: NextRequest){
  try {
    const companiesAll = await getAllCompanies();
    if (companiesAll.length === 0) {
      return NextResponse.json({ error: 'No companies found' }, { status: 404 });
    }
    return NextResponse.json({ data: companiesAll }, { status: 200 });
  } catch (error: any) {
      console.error('Error fetching companies:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const parsedData = createCompanySchema.parse(requestData);
    const companyNameExist = await getCompanyByName(parsedData.name);
    if (companyNameExist.length !== 0) {
      return NextResponse.json({ error: "Company Already Exsists" }, { status: 409 });
    }
    const addCompany = await db.insert(companies).values({
      name: parsedData.name
    });
    return NextResponse.json({ message: "Company added successfully", data: parsedData }, { status: 201});
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errorDetails = error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      return NextResponse.json({ error: 'Validation error', details: errorDetails }, { status: 400 });
    } else {
      console.error('Error adding company:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
};
import { db } from "@/db";
import { companies } from "@/db/schema";
import getAllCompanies, { companyRolesCount, getCompanyByName } from "@/lib/companies";
import { createCompanySchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const companiesAll: companyRolesCount[] = await getAllCompanies();
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
    const parsedData = createCompanySchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
    };

    const companyNameExist = await getCompanyByName(parsedData.data.company_name);
    if (companyNameExist.length !== 0) {
      return NextResponse.json({ error: "Company Already Exsists" }, { status: 409 });
    };

    const addCompany = await db.insert(companies).values({
      name: parsedData.data.company_name
    });

    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    console.error('Error adding company:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
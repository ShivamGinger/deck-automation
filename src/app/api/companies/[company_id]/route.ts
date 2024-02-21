import { db } from "@/db";
import { Companies, candidateStatus, candidates, companies, parameterScores, parameterWeightages, quotientScores, quotientWeightages, roles } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { updateCompanySchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { company_id: number }}){
    try {
      const company: Companies[] = await getCompany(params.company_id);
      if (company.length === 0) {
        return NextResponse.json({ error: 'Company does not exist' }, { status: 404 });
      }
      return NextResponse.json({ data: company }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching companies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
  };

  export async function DELETE(request: Request, { params }: { params: { company_id: number }}){
    try{
      const companySlug = params.company_id;
      
      const companyExist: Companies[] = await getCompany(companySlug);
      if (companyExist.length === 0) {
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
      };
      
      db.transaction(async (txn) => {
        const candidateIds = await txn.select({
          candidate_id: candidates.id
        })
        .from(candidates)
        .where(eq(candidates.companyId, companySlug))

        for (const data of candidateIds) {
          await txn.delete(parameterScores).where(eq(parameterScores.candidateId, data.candidate_id));
          await txn.delete(quotientScores).where(eq(quotientScores.candidateId, data.candidate_id));
          await txn.delete(candidateStatus).where(eq(candidateStatus.candidateId, data.candidate_id))
        };
        await txn.delete(candidates).where(eq(candidates.companyId, companySlug));
        await txn.delete(parameterWeightages).where(eq(parameterWeightages.companyId, companySlug));
        await txn.delete(quotientWeightages).where(eq(quotientWeightages.companyId, companySlug));
        await txn.delete(roles).where(eq(roles.companyId, companySlug));
        await txn.delete(companies).where(eq(companies.id, companySlug));
      });

      return NextResponse.json({ status: 204 });

    } catch (error: any) {
        console.error('Error deleting Company:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function PUT(request: NextRequest, { params }: { params: { company_id: number }}) {
  try {
      const requestData = await request.json();
      const parsedData = updateCompanySchema.safeParse(requestData);
      if (!parsedData.success) {
          return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
      };

      await db.update(companies).set({
        name: parsedData.data.company_name,
        companyPhoto: parsedData.data.company_logo
      })
      .where(eq(companies.id, params.company_id));

      return NextResponse.json({status: 204});
  } catch (error: any) {
      console.error('Error updating company:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
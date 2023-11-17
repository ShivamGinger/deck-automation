import { db } from "@/db";
import { companies } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { company_id: number }}){
    try {
      const company = await getCompany(params.company_id);
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
      const slugId = params.company_id;
      const companyExists = await db
      .select({ id: companies.id })
      .from(companies)
      .where(eq(companies.id, slugId));
      
      if (companyExists.length === 0) {
        return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    };
      const cmpDel = await db.delete(companies).where(eq(companies.id, slugId));      
      return NextResponse.json({ message: "Company deleted successfully" }, { status: 200 });

    } catch (error: any) {
        console.error('Error deleting company:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};
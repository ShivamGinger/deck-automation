import { db } from "@/db";
import { quotientWeightages } from "@/db/schema";
import { getCmpQuotient, quotientw } from "@/lib/quotients";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//TODO: Implement PUT endpoint here

export async function GET(request: NextRequest, { params }: {params: { company_id: number, role_id: number, quotient_id: number}}) {
    try{
        const quotient: quotientw[] = await getCmpQuotient(params.company_id, params.role_id, params.quotient_id);
        return NextResponse.json({ data: quotient }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching quotients:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function DELETE(request: NextRequest, { params }: {params: { company_id: number, role_id: number, quotient_id: number}}) {
    try{
        const quotient: quotientw[] = await getCmpQuotient(params.company_id, params.role_id, params.quotient_id);
        if(quotient.length === 0) {
            return NextResponse.json({ error: 'Weightage for the quotient does not exist' }, { status: 404 });
        };
        await db.delete(quotientWeightages).where(eq(quotientWeightages.id, quotient[0].quotient_weightage_id));
        return NextResponse.json({ status: 204});
    } catch (error: any) {
          console.error('Error deleting quotient weightage:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
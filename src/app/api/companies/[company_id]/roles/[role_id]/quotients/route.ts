import { db } from "@/db";
import { Quotients, quotientWeightages, quotients } from "@/db/schema";
import { getAllCmpQuotientsW, getCmpQuotient, getQuotientByName, quotientw } from "@/lib/quotients";
import { createQuotientWeiSchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params: { company_id: number, role_id: number}}) {
    try{
        const quotients: quotientw[] = await getAllCmpQuotientsW(params.company_id, params.role_id);
        return NextResponse.json({ data: quotients }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching quotients:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function POST(request: NextRequest, { params }: { params : { company_id: number, role_id: number }}) {
    try {
        const requestData = await request.json();
        const cSlug = params.company_id;
        const rSlug = params.role_id;
        const parsedData = createQuotientWeiSchema.safeParse(requestData);
        if(!parsedData.success) {
          return NextResponse.json({ message: 'Validation error', error: parsedData.error }, { status: 400 });
        };

        for( const data of parsedData.data.quotientW) {
            await db.transaction(async (txn) => {
                const quoWeightageExists = await getCmpQuotient(cSlug, rSlug, data.quotientId);
                if (quoWeightageExists) {
                    return NextResponse.json({ error: "Quotient weightage already exists" }, { status: 409 });
                };
                await txn.insert(quotientWeightages).values({
                    companyId: cSlug,
                    roleId: rSlug,
                    quotientId: data.quotientId,
                    qWeightage: data.weightage
                }
                );
            });
        };
        return NextResponse.json({ status: 201});
        
      } catch (error: any) {
          console.error('Error adding weightages to quotient:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
import { db } from "@/db";
import { parameterWeightages } from "@/db/schema";
import { cmpQuoParameterExist, getAllCmpQuoParameterW, getCmpQuoParameterW, parameterw } from "@/lib/parameters";
import { createParameterWeiSchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params: { company_id: number, role_id: number, quotientw_id: number}}) {
    try{
        const parameters: parameterw[] = await getAllCmpQuoParameterW(params.company_id, params.role_id, params.quotientw_id);
        return NextResponse.json({ data: parameters }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching parameters:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function POST(request: NextRequest, { params }: { params : { company_id: number, role_id: number }}) {
    try {
        const requestData = await request.json();
        const cSlug = params.company_id;
        const rSlug = params.role_id;
        const parsedData = createParameterWeiSchema.safeParse(requestData);
        if(!parsedData.success) {
          return NextResponse.json({ message: 'Validation error', error: parsedData.error }, { status: 400 });
        };

        for( const data of parsedData.data.parameterW) {
            await db.transaction(async (txn) => {
                const quoParamWeightageExists = await cmpQuoParameterExist(cSlug, rSlug, data.parameterId);
                if (quoParamWeightageExists) {
                    return NextResponse.json({ error: "Parameter weightage already exists" }, { status: 409 });
                };
                await txn.insert(parameterWeightages).values({
                    parameterId: data.parameterId,
                    companyId: cSlug,
                    roleId: rSlug,
                    pWeightage: data.weightage
                }
                );
            });
        };
        return NextResponse.json({ status: 201});
        
      } catch (error: any) {
          console.error('Error adding weightages to parameters:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
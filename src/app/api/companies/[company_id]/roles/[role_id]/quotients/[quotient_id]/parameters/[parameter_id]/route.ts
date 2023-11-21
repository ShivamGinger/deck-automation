//TODO: Implement PUT endpoint here

import { db } from "@/db";
import { parameterWeightages } from "@/db/schema";
import { getCmpQuoParameterW, parameterw } from "@/lib/parameters";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {params: { company_id: number, role_id: number, quotient_id: number, parameter_id: number}}) {
    try{
        const parameters: parameterw[] = await getCmpQuoParameterW(params.company_id, params.role_id, params.quotient_id, params.parameter_id);
        return NextResponse.json({ data: parameters }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching parameters:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function DELETE(request: NextRequest, { params }: {params: { company_id: number, role_id: number, quotient_id: number, parameter_id: number}}) {
    try{
        const parameter: parameterw[] = await getCmpQuoParameterW(params.company_id, params.role_id, params.quotient_id, params.parameter_id);
        if(parameter.length === 0) {
            return NextResponse.json({ error: 'Weightage for the parameter does not exist' }, { status: 404 });
        };
        await db.delete(parameterWeightages).where(eq(parameterWeightages.id, parameter[0].parameter_weightage_id));
        return NextResponse.json({ status: 204});
    } catch (error: any) {
          console.error('Error deleting parameter weightage:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
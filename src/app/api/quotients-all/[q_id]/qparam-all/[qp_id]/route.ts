import { db } from "@/db";
import { parameterScores, parameterWeightages, parameters } from "@/db/schema";
import { getParameterById } from "@/lib/parameters";
import { updateParameterSchema } from "@/utils/bodyValidationSchemas";
import { eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { q_id: number, qp_id: number }}) {
    try{
        const qSlug = params.q_id;
        const pSlug = params.qp_id;
        const qparameter = await getParameterById(qSlug, pSlug);
        if (qparameter.length === 0) {
            return NextResponse.json({ error: "Parameter does not exist" }, { status: 404 });
        };
        return NextResponse.json({ data: qparameter }, { status: 200});

    } catch (error: any) {
          console.error('Error fetching parameters:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function DELETE(request: NextRequest, { param }: { param: { qp_id: number }}) {
    try{
        const pSlug = param.qp_id;
        const parameter = await db.select({ id: parameters.id }).from(parameters).where(eq(parameters.id, pSlug));
        if (parameter.length == 0){
            return NextResponse.json({ error: `Parameter not found.` }, { status: 404 });
        }
        
        db.transaction(async (txn) => {
            await txn.delete(parameterWeightages).where(eq(parameterWeightages.parameterId, pSlug));
            await txn.delete(parameterScores).where(eq(parameterScores.parameterId, pSlug));
            await txn.delete(parameters).where(eq(parameters.quotientId, pSlug));            
        });
        return NextResponse.json({ status: 204});
        
    } catch (error: any) {
          console.error('Error deleting parameter:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function PUT(request: NextRequest, { params }: { params: { qp_id: number }}) {
  try {
      const requestData = await request.json();
      const parsedData = updateParameterSchema.safeParse(requestData);
      if (!parsedData.success) {
          return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
      };

      await db.update(parameters).set({
        parameter: parsedData.data.parameter_name
      })
      .where(eq(parameters.id, params.qp_id));

      return NextResponse.json({status: 204});
  } catch (error: any) {
      console.error('Error updating parameter:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
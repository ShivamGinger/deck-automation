import { db } from "@/db";
import { parameterScores, parameterWeightages, parameters, quotientScores, quotientWeightages, quotients } from "@/db/schema";
import { getQuotientById } from "@/lib/quotients";
import { updateQuotientSchema } from "@/utils/bodyValidationSchemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { q_id: number }}) {
    try{
        const qSlug = params.q_id;
        const quotient = await getQuotientById(qSlug);
        if (quotient.length === 0) {
            return NextResponse.json({ error: "Quotient does not exist" }, { status: 404 });
        };
        return NextResponse.json({ data: quotient }, { status: 200});

    } catch (error: any) {
          console.error('Error fetching parameters:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function DELETE(request: NextRequest, { param }: { param: { q_id: number }}) {
    try{
        const qSlug = param.q_id;
        const quotient = await db.select({ id: quotients.id }).from(quotients).where(eq(quotients.id, qSlug));
        if (quotient.length == 0){
            return NextResponse.json({ error: `Quotient not found.` }, { status: 404 });
        }
        
        db.transaction(async (txn) => {
            const parameterIds = await txn.select({
                parameters_id: parameters.id
              })
              .from(parameters)
              .where(eq(parameters.quotientId, qSlug));
      
            for (const pdata of parameterIds) {
                await txn.delete(parameterWeightages).where(eq(parameterWeightages.parameterId, pdata.parameters_id));
                await txn.delete(parameterScores).where(eq(parameterScores.parameterId, pdata.parameters_id));
            }; 
            
            await txn.delete(parameters).where(eq(parameters.quotientId, qSlug));            
            await txn.delete(quotientWeightages).where(eq(quotientWeightages.quotientId, qSlug));
            await txn.delete(quotientScores).where(eq(quotientScores.quotientId, qSlug));
            await txn.delete(quotients).where(eq(quotients.id, qSlug));

        });        
        return NextResponse.json({ status: 204});
        
    } catch (error: any) {
          console.error('Error deleting quotient:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function PUT(request: NextRequest, { params }: { params: { q_id: number }}) {
  try {
      const requestData = await request.json();
      const parsedData = updateQuotientSchema.safeParse(requestData);
      if (!parsedData.success) {
          return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
      };

      await db.update(quotients).set({
        quotient: parsedData.data.quotient_name
      })
      .where(eq(quotients.id, params.q_id));
      
      return NextResponse.json({status: 204});
  } catch (error: any) {
      console.error('Error updating quotient:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
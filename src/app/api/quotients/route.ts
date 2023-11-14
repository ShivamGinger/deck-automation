import { db } from "@/db";
import { Quotients, quotients } from "@/db/schema";
import { getAllQuotients, getQuotientByName, quotientPCount } from "@/lib/quotients";
import { createQuotientSchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
    try{
        const quotients: quotientPCount[] = await getAllQuotients();
        if (quotients.length === 0){
            return NextResponse.json({ error: `Quotients not found.` }, { status: 404 });
        }
    
        return NextResponse.json({ data: quotients }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching quotients:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function POST(request: NextRequest) {
    try {
        const requestData = await request.json();
        const parsedData = createQuotientSchema.safeParse(requestData);
        if(!parsedData.success) {
          return NextResponse.json({ message: 'Validation error', error: parsedData.error }, { status: 400 });
        };

        const quotientExist = await getQuotientByName(parsedData.data.quotient);
        if (quotientExist.length !== 0) {
          return NextResponse.json({ error: "Quotient already exists" }, { status: 409 });
        };
        
        const addquotient = await db.insert(quotients).values(parsedData.data);
        return NextResponse.json({ status: 201});
        
      } catch (error: any) {
          console.error('Error adding quotient:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
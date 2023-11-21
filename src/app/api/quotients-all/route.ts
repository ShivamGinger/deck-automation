import { db } from "@/db";
import { quotients } from "@/db/schema";
import { getQuotientAll, getQuotientByName, quotientPCount } from "@/lib/quotients";
import { createQuotientSchema } from "@/utils/bodyValidationSchemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try{
        const quotient: quotientPCount[] = await getQuotientAll();
        if (quotient.length == 0){
            return NextResponse.json({ error: `Quotients not found.` }, { status: 404 });
        }
    
        return NextResponse.json({ data: quotient }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching quotients:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function POST(request: NextRequest) {
    try{
        const requestData = await request.json();
        const parsedData = createQuotientSchema.safeParse(requestData);
        
        if (!parsedData.success) {
            return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
        };
        const checkQuo = await getQuotientByName(parsedData.data.quotient);
        if (checkQuo.length !== 0) {
            return NextResponse.json({ error: "Quotient already exists" }, { status: 409 });
        };

        const crtParam = await db.insert(quotients).values(parsedData.data);

        return NextResponse.json({ status: 201 });
    
    } catch (error: any) {
        console.error('Error adding parameter:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
}
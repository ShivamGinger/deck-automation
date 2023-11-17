import { db } from "@/db";
import { quotients } from "@/db/schema";
import { getQuotientAll, quotientPCount } from "@/lib/quotients";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

//Show weightage of GET-done, DELETE-done
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
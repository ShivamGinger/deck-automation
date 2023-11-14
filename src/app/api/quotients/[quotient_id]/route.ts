import { db } from "@/db";
import { quotients } from "@/db/schema";
import { getQuotientById, quoWDispSchema } from "@/lib/quotients";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


//Show weightage of quotient, change it and delete it (TO BE IMPLEMENTED)
export async function GET(request: NextRequest, { param }: { param: { quotient_id: number }}) {
    try{
        const qSlug = param.quotient_id;
        const quotient: quoWDispSchema[] = await getQuotientById(qSlug);
        if (quotient.length == 0){
            return NextResponse.json({ error: `Quotient not found.` }, { status: 404 });
        }
    
        return NextResponse.json({ data: quotient }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching quotient:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};

export async function DELETE(request: NextRequest, { param }: { param: { quotient_id: number }}) {
    try{
        const qSlug = param.quotient_id;
        const quotient = await db.select({ id: quotients.id }).from(quotients).where(eq(quotients.id, param.quotient_id));
        if (quotient.length == 0){
            return NextResponse.json({ error: `Quotient not found.` }, { status: 404 });
        }
        
        const delQ = await db.delete(quotients).where(eq(quotients.id, param.quotient_id));
        return NextResponse.json({ status: 204});
        
    } catch (error: any) {
          console.error('Error fetching quotient:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
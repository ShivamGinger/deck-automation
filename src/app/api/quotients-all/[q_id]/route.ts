import { db } from "@/db";
import { quotients } from "@/db/schema";
import { getQuotientById } from "@/lib/quotients";
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

export async function DELETE(request: NextRequest, { param }: { param: { quotient_id: number }}) {
    try{
        const qSlug = param.quotient_id;
        const quotient = await db.select({ id: quotients.id }).from(quotients).where(eq(quotients.id, qSlug));
        if (quotient.length == 0){
            return NextResponse.json({ error: `Quotient not found.` }, { status: 404 });
        }
        
        const delQ = await db.delete(quotients).where(eq(quotients.id, qSlug));
        return NextResponse.json({ status: 204});
        
    } catch (error: any) {
          console.error('Error fetching quotient:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
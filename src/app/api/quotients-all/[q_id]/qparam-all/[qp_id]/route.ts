import { db } from "@/db";
import { parameters } from "@/db/schema";
import { getParameterById } from "@/lib/parameters";
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

export async function DELETE(request: NextRequest, { param }: { param: { q_id: number, qp_id: number }}) {
    try{
        const qSlug = param.q_id;
        const pSlug = param.qp_id;
        const paramExist = await getParameterById(qSlug, pSlug);
        if (paramExist.length !== 0) {
            return NextResponse.json({ error: "Parameter Already Exists" }, { status: 409 });
        };
        
        const delQ = await db.delete(parameters).where(eq(parameters.id, qSlug));
        return NextResponse.json({ status: 204});
        
    } catch (error: any) {
          console.error('Error fetching quotient:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
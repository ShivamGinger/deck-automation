import { getAllQuotientParams, qParams } from "@/lib/parameters";
import { NextRequest, NextResponse } from "next/server";


//TODO: add a function, route to display the weightages of different parameters and quotients based on company and their roles.

export async function GET(request: NextRequest, { param }: { param: { quotient_id: number }}) {
    try{
        const qSlug = param.quotient_id;
        const params: qParams[] = await getAllQuotientParams(qSlug);
        if (params.length == 0){
            return NextResponse.json({ error: `Parameters not found.` }, { status: 404 });
        }
    
        return NextResponse.json({ data: params }, { status: 200});
    } catch (error: any) {
          console.error('Error fetching parameters:', error);
          return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
import { Candidates } from "@/db/schema";
import { getCandidate } from "@/lib/candidates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { candidate_id: number} } ) {
    try{
        const candidate: Candidates[] = await getCandidate(params.candidate_id);
        if (candidate.length === 0){
            return NextResponse.json({ error: `Candidate with Id ${params.candidate_id} not found.` }, { status: 404 });
        }
    
        return NextResponse.json({ data: candidate }, { status: 200});
    } catch (error: any) {
        console.error('Error fetching candidate:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      };
};
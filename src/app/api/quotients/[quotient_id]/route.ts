import { NextRequest, NextResponse } from "next/server";


//Show weightage of quotient, change it and delete it (TO BE IMPLEMENTED)
// export async function GET(request: NextRequest, { param }: { param: { quotient_id: number }}) {
//     try{
//         const qSlug = param.quotient_id;
//         const params: quotientPCount[] = await getAllQuotientParams(qSlug);
//         if (quotients.length == 0){
//             return NextResponse.json({ error: `Quotients not found.` }, { status: 404 });
//         }
    
//         return NextResponse.json({ data: quotients }, { status: 200});
//     } catch (error: any) {
//           console.error('Error fetching quotients:', error);
//           return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//       };
// };
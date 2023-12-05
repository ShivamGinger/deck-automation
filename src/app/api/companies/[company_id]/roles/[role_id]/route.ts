import { db } from "@/db";
import { Companies, candidateStatus, candidates, parameterScores, parameterWeightages, quotientScores, quotientWeightages, roles } from "@/db/schema";
import { getCompany } from "@/lib/companies";
import { getRole } from "@/lib/roles";
import { updateRoleSchema } from "@/utils/bodyValidationSchemas";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { company_id: number, role_id: number }}){
  try {
    const company = await getRole(params.company_id, params.role_id);
    if (company.length === 0) {
      return NextResponse.json({ error: 'Role does not exist' }, { status: 404 });
    }
    return NextResponse.json({ data: company }, { status: 200 });
  } catch (error: any) {
      console.error('Error fetching role:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
  };
  
export async function DELETE(request: NextRequest, { params }: { params: { company_id: number, role_id: number }}){
    try{
      const roleSlug = params.role_id;
      const companySlug = params.company_id;
      
      const companyExist: Companies[] = await getCompany(companySlug);
      if (companyExist.length === 0) {
        return NextResponse.json({ error: "Cannot delete role, Company not found" }, { status: 404 });
      };

      const roleExists = await db
      .select({ id: roles.id })
      .from(roles)
      .where(and(eq(roles.id, roleSlug), eq(roles.companyId, companySlug)));
      
      if (roleExists.length === 0) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 });
      };

      db.transaction(async (txn) => {
        const candidateIds = await txn.select({
          candidate_id: candidates.id
        })
        .from(candidates)
        .where(eq(candidates.roleId, roleSlug))

        for (const data of candidateIds) {
          await txn.delete(parameterScores).where(eq(parameterScores.candidateId, data.candidate_id));
          await txn.delete(quotientScores).where(eq(quotientScores.candidateId, data.candidate_id));
          await txn.delete(candidateStatus).where(eq(candidateStatus.candidateId, data.candidate_id))
        };
        await txn.delete(candidates).where(eq(candidates.roleId, roleSlug));
        await txn.delete(parameterWeightages).where(eq(parameterWeightages.roleId, roleSlug));
        await txn.delete(quotientWeightages).where(eq(quotientWeightages.roleId, roleSlug));
        await txn.delete(roles).where(eq(roles.id, roleSlug));
      });
      return NextResponse.json({ status: 204 });

    } catch (error: any) {
        console.error('Error deleting Role:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function PUT(request: NextRequest, { params }: { params: { company_id: number, role_id: number }}) {
  try {
      const requestData = await request.json();
      const parsedData = updateRoleSchema.safeParse(requestData);
      if (!parsedData.success) {
          return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
      };

      await db.update(roles).set({
        name: parsedData.data.role_name
      })
      .where(eq(roles.id, params.role_id));

      return NextResponse.json({status: 204});
  } catch (error: any) {
      console.error('Error updating role:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};
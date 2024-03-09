import { db } from "@/db";
import { SkillSet, candidateSkillSet, skillSet } from "@/db/schema";
import { getSkillById, getSkillByName, getSkills } from "@/lib/skill";
import { createSkill } from "@/utils/bodyValidationSchemas";
import { eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { skill_id: number } }
) {
  try {
    const skillSlug = params.skill_id;
    const skillExist: SkillSet[] = await getSkillById(skillSlug);
    if (skillExist.length === 0) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    db.transaction(async (txn) => {
      await txn
        .delete(candidateSkillSet)
        .where(eq(candidateSkillSet.skill_id, skillSlug));
      await txn.delete(skillSet).where(eq(skillSet.id, skillSlug));
    });

    return NextResponse.json({ status: 204 });
  } catch (error: any) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { skill_id: number } }
) {
  try {
    const requestData = await request.json();
    const skillSlug = params.skill_id;
    const parsedData = createSkill.safeParse(requestData);
    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Validation Error", error: `${parsedData.error}` },
        { status: 400 }
      );
    }

    for(const skil of parsedData.data.skill){
      db.update(skillSet)
        .set({
          skill: skil.skill_name,
          isActive: skil.is_active
        })
        .where(eq(skillSet.id, skillSlug));
    }
    return NextResponse.json({ status: 204 });
  } catch (error: any) {
    console.error("Error updating group:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

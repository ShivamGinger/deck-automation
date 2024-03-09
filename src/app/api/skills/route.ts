import { db } from "@/db";
import { SkillSet, skillSet } from "@/db/schema";
import { getSkillByName, getSkills } from "@/lib/skill";
import { createSkill } from "@/utils/bodyValidationSchemas";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const skillSet: SkillSet[] = await getSkills();
    return NextResponse.json({ data: skillSet }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching group:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const parsedData = createSkill.safeParse(requestData);
    if (!parsedData.success) {
      return NextResponse.json(
        { message: "Validation Error", error: `${parsedData.error}` },
        { status: 400 }
      );
    }
    for(const skil of parsedData.data.skill){
      const skill: SkillSet[] = await getSkillByName(skil.skill_name);
      if (skill.length !== 0) {
        return NextResponse.json(
          { error: "Skill already exists" },
          { status: 409 }
        );
      }
    // }

    // for(const skil in parsedData.data.skill){
      const skillValues: MySqlInsertValue<typeof skillSet> = {
        skill: skil.skill_name,
      };
      await db.insert(skillSet).values(skillValues);
    }

    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

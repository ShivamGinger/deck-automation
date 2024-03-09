import { db } from "@/db";
import { SkillSet, skillSet } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export async function getSkills(): Promise<SkillSet[]> {
  const skills: SkillSet[] = await db.select().from(skillSet);

  return skills;
}

export async function getSkillByName(name: string): Promise<SkillSet[]> {
  const skill: SkillSet[] = await db
    .select()
    .from(skillSet)
    .where(eq(skillSet.skill, name));

  return skill;
}

export async function getSkillById(skillId: number): Promise<SkillSet[]> {
  const skill: SkillSet[] = await db
    .select()
    .from(skillSet)
    .where(eq(skillSet.id, skillId));

  return skill;
}


import { db } from '@/db';

import { Candidates } from '@/db/schema';

export default async function getAllCandidates(): Promise<Candidates[]> {

  const result: Candidates[] = await db.query.candidates.findMany();

  return result;
}
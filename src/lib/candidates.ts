import { db } from '@/db';

import { candidates } from '@/db/schema';

export default async function getAllCandidates(): Promise<candidates[]> {

  const result: candidates[] = await db.query.candidates.findMany();

  return result;
}
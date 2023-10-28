import { db } from '@/db';

import { candidates } from '@/db/schema';

export default async function getAllCandidates(): Promise<candidates[]> {

  const result = db.query.candidates.findMany();

  return result;
}
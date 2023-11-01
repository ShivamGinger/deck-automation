import { db } from '@/db';
import { Companies } from '@/db/schema';

export default async function getAllCompanies(): Promise<Companies[]> {
    const result: Companies[] = await db.query.companies.findMany();
  
    return result;
}
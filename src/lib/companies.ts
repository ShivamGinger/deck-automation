import { db } from '@/db';
import { companies } from '@/db/schema';

export default async function getAllCompanies(): Promise<companies[]> {
    const result: companies[] = await db.query.companies.findMany();
  
    return result;
}
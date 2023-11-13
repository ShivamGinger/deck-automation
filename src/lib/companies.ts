import { db } from '@/db';
import { Companies, companies } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getAllCompanies(): Promise<Companies[]> {
    const companiesAll: Companies[] = await db.query.companies.findMany();

    return companiesAll;
}

export async function getCompany(id: number): Promise<Companies[]> {
    const company: Companies[] = await db.select().from(companies).where(eq(companies.id, id));
    
    return company;
};

export async function getCompanyByName(name: string): Promise<Companies[]> {
    const company: Companies[] = await db.select().from(companies).where(eq(companies.name, name));
    
    return company;
};
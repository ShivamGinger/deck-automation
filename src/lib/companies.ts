import { db } from '@/db';
import { Companies, companies, roles } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export type crc = {
    id: number;
    name: string;
    count: number;
};

export default async function getAllCompanies(): Promise<crc[]> {
    const rcount = db.select({
        cid: roles.companyId,
        count: sql<number>`count(${roles.id})`.as('count'),
    }).from(roles).groupBy(roles.companyId).as('rcount');
    const companiesAll: crc[] = await db.select({
        id: companies.id,
        name: companies.name,
        count: rcount.count
    })
    .from(companies)
    .leftJoin(rcount, eq(rcount.cid, companies.id));
    return companiesAll;
};

export async function getCompany(cid: number): Promise<Companies[]> {
    const company: Companies[] = await db.select().from(companies).where(eq(companies.id, cid));
    
    return company;
};

export async function getCompanyByName(name: string): Promise<Companies[]> {
    const company: Companies[] = await db.select().from(companies).where(eq(companies.name, name));
    
    return company;
};
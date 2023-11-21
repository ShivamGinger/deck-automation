import { db } from '@/db';
import { Companies, companies, roles } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export type companyRolesCount = {
    company_id: number;
    company_name: string;
    roles_count: number;
};

export default async function getAllCompanies(): Promise<companyRolesCount[]> {
    const rcount = db.select({
        company_id: roles.companyId,
        roles_count: sql<number>`count(${roles.id})`.as('count'),
    }).from(roles).groupBy(roles.companyId).as('rcount');
    const companiesAll: companyRolesCount[] = await db.select({
        company_id: companies.id,
        company_name: companies.name,
        roles_count: rcount.roles_count
    })
    .from(companies)
    .leftJoin(rcount, eq(rcount.company_id, companies.id));
    return companiesAll;
};

export async function getCompany(cid: number): Promise<Companies[]> {
    const company: Companies[] = await db.select().from(companies).where(eq(companies.id, cid));
    
    return company;
};

export async function getCompanyByName(cname: string): Promise<Companies[]> {
    const company: Companies[] = await db.select().from(companies).where(eq(companies.name, cname));
    
    return company;
};
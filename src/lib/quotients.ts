import { db } from "@/db";
import { Quotients, companies, parameters, quotientWeightages, quotients, roles } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export type quotientPCount = {
    id: number;
    name: string;
    count: number;
};

export async function getAllQuotients(): Promise<quotientPCount[]> {
    const pcount = db.select({
        qid: parameters.quotientId,
        count: sql<number>`count(${parameters.id})`.as('count'),
    }).from(parameters).groupBy(parameters.quotientId).as('pcount');
    
    const quotientsAll: quotientPCount[] = await db.select({
        id: quotients.id,
        name: quotients.quotient,
        count: pcount.count
    })
    .from(quotients)
    .leftJoin(pcount, eq(pcount.qid, quotients.id));
    
    return quotientsAll;
};

export async function getQuotientByName(qname: string): Promise<Quotients[]> {
    const quotient: Quotients[] = await db.select()
    .from(quotients)
    .where(eq(quotients.quotient, qname));

    return quotient;
};

export type quoWDispSchema = {
    id: number;
    qname: string;
    cname: string;
    rname: string | null;
    weightage: number;
};

export async function getQuotientById(qid: number): Promise<quoWDispSchema[]> {
    const quotient: quoWDispSchema[] = await db.select({
        id: quotients.id,
        qname: quotients.quotient,
        cname: companies.name,
        rname: roles.name,
        weightage: quotientWeightages.qWeightage
    })
    .from(quotientWeightages)
    .innerJoin(quotients, eq(quotients.id, quotientWeightages.quotientId))
    .innerJoin(companies, eq(companies.id, quotientWeightages.companyId))
    .innerJoin(roles, eq(roles.id, quotientWeightages.roleId))
    .where(eq(quotients.id, qid));

    return quotient;
};
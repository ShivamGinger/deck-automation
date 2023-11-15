import { db } from "@/db";
import { Quotients, companies, parameters, quotientWeightages, quotients, roles } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

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

export type quoDispSchema = {
    id: number;
    qname: string;
    cid: number;
    cname: string;
};

export async function getQuotientCmp(qid: number): Promise<quoDispSchema[]> {
    // const cmpGroup = await db.select({
    //     id: companies.id,
    //     qwid: quotientWeightages.id,
    // }).from(quotientWeightages).groupBy()
    // .from(quotientWeightages)
    const quotientcmp: quoDispSchema[] = await db.select({
        id: quotients.id,
        qname: quotients.quotient,
        cid: companies.id,
        cname: companies.name,
    })
    .from(quotientWeightages)
    .innerJoin(quotients, eq(quotients.id, quotientWeightages.quotientId))
    .innerJoin(companies, eq(companies.id, quotientWeightages.companyId))
    .where(eq(quotients.id, qid))

    return quotientcmp;
};

export type quoCmpDispSchema = {
    id: number;
    qname: string;
    cid: number;
    cname: string;
    rid: number;
    rname: string | null;
    weightage: number;
};

export async function getQuotientCmpRle(qid: number, cmpid: number): Promise<quoCmpDispSchema[]> {
    const quotientcmp: quoCmpDispSchema[] = await db.select({
        id: quotients.id,
        qname: quotients.quotient,
        cid: companies.id,
        cname: companies.name,
        rid: roles.id,
        rname: roles.name,
        weightage: quotientWeightages.qWeightage
    })
    .from(quotientWeightages)
    .innerJoin(quotients, eq(quotients.id, quotientWeightages.quotientId))
    .innerJoin(companies, eq(companies.id, quotientWeightages.companyId))
    .innerJoin(roles, eq(roles.id, quotientWeightages.roleId))
    .where(and(eq(quotients.id, qid), eq(companies.id, cmpid)));

    return quotientcmp;
};

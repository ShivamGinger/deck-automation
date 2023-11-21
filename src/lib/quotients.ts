import { db } from "@/db";
import { Quotients, companies, parameters, quotientWeightages, quotients, roles } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export type quotientw = {
    quotient_weightage_id: number;
    company_id: number;
    company_name: string;
    role_id: number;
    role_name: string;
    quotient_id: number;
    quotient_name: string;
    quotient_weightage: number;

};

export async function getAllCmpQuotientsW(cmpId: number, rleId: number): Promise<quotientw[]> {
    const allQuo: quotientw[] = await db
    .select({
        quotient_weightage_id: quotientWeightages.id,
        company_id: quotientWeightages.companyId,
        company_name: companies.name,
        role_id: quotientWeightages.roleId,
        role_name: roles.name,
        quotient_id: quotientWeightages.quotientId,
        quotient_name: quotients.quotient,
        quotient_weightage: quotientWeightages.qWeightage
    })
    .from(quotientWeightages)
    .innerJoin(companies, eq(companies.id, quotientWeightages.companyId))
    .innerJoin(roles, eq(roles.id, quotientWeightages.roleId))
    .innerJoin(quotients, eq(quotients.id, quotientWeightages.quotientId))
    .where(and(eq(quotientWeightages.companyId, cmpId), eq(quotientWeightages.roleId, rleId)));

    return allQuo;
};

export async function getCmpQuotient(cmpId: number, rleId: number, quotientId: number): Promise<quotientw[]> {
    const quotient: quotientw[] = await db
    .select({
        quotient_weightage_id: quotientWeightages.id,
        company_id: quotientWeightages.companyId,
        company_name: companies.name,
        role_id: quotientWeightages.roleId,
        role_name: roles.name,
        quotient_id: quotientWeightages.quotientId,
        quotient_name: quotients.quotient,
        quotient_weightage: quotientWeightages.qWeightage
    })
    .from(quotientWeightages)
    .innerJoin(companies, eq(companies.id, quotientWeightages.companyId))
    .innerJoin(roles, eq(roles.id, quotientWeightages.roleId))
    .innerJoin(quotients, eq(quotients.id, quotientWeightages.quotientId))
    .where(and(eq(quotientWeightages.companyId, cmpId), eq(quotientWeightages.roleId, rleId), eq(quotients.id, quotientId)));

    return quotient;
};

export async function getQuotientByName(qname: string): Promise<Quotients[]> {
    const quotient: Quotients[] = await db.select()
    .from(quotients)
    .where(eq(quotients.quotient, qname));

    return quotient;
};

export async function getQuotientById(qid: number): Promise<Quotients[]> {
    const quotient: Quotients[] = await db.select()
    .from(quotients)
    .where(eq(quotients.id, qid));

    return quotient;
};

export type quotientPCount = {
    id: number;
    qname: string;
    count: number;
};

export async function getQuotientAll(): Promise<quotientPCount[]> {
    const pcount = db.select({
        qid: parameters.quotientId,
        count: sql`count(${parameters.id})`.mapWith(parameters.id).as('count'),
    }).from(parameters).groupBy(parameters.quotientId).as('pcount');
    
    const quotientsAll: quotientPCount[] = await db.select({
        id: quotients.id,
        qname: quotients.quotient,
        count: pcount.count
    })
    .from(quotients)
    .leftJoin(pcount, eq(pcount.qid, quotients.id));
    
    return quotientsAll;
};

export type quoCmpDispSchema = {
    id: number;
    qname: string;
    cid: number;
    cname: string;
    rid: number;
    rname: string;
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

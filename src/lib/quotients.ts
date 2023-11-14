import { db } from "@/db";
import { Quotients, parameters, quotients } from "@/db/schema";
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
        id: parameters.id,
        name: parameters.parameter,
        count: pcount.count
    })
    .from(parameters)
    .leftJoin(pcount, eq(pcount.qid, parameters.id));
    
    return quotientsAll;
};

export async function getQuotientByName(qname: string): Promise<Quotients[]> {
    const quotient: Quotients[] = await db.
    select()
    .from(quotients)
    .where(eq(quotients.quotient, qname));

    return quotient;
};
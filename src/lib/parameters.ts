import { db } from "@/db";
import { companies, parameters, Parameters, parameterWeightages, quotients, roles } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type qParams = {
    qid: number;
    qname: string;
    pid: number;
    pname: string;
};

export type paramExistType = {
    pid: number;
    qid: number;
};

export async function getAllQuotientParams(qSlug: number): Promise<qParams[]> {
    const quoParam: qParams[] = await db.select({
        qid: parameters.quotientId,
        qname: quotients.quotient,
        pid: parameters.id,
        pname: parameters.parameter
    })
    .from(parameters)
    .innerJoin(quotients, eq(quotients.id, parameters.quotientId))
    .where(eq(parameters.quotientId, qSlug));

    return quoParam;
};

export async function getParameters(qid: number, pid: string): Promise<Parameters[]> {
    const paramExist: Parameters[] = await db.select()
    .from(parameters)
    .where(and(eq(parameters.quotientId, qid), eq(parameters.parameter, pid)));

    return paramExist;
};

export async function getParameterById(qid: number, pid: number): Promise<paramExistType[]> {
    const paramExist: paramExistType[] = await db.select({
        pid: parameters.id,
        qid: quotients.id
    })
    .from(parameters)
    .where(and(eq(parameters.id, pid), eq(parameters.quotientId, qid)));

    return paramExist;
};
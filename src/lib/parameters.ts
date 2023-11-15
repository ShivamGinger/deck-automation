import { db } from "@/db";
import { companies, parameters, Parameters, parameterWeightages, roles } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type qParams = {
    id: number;
    parameter: string;
    qid: number;
};

export type paramWDispSchema = {
    pid: number;
    pwid: number;
    pname: string;
    cname: string;
    rname: string | null;
    weightage: number;
};

export async function getAllQuotientParams(qSlug: number): Promise<qParams[]> {
    const quoParam: qParams[] = await db.select({
        id: parameters.id,
        parameter: parameters.parameter,
        qid: parameters.quotientId
    })
    .from(parameters)
    .where(eq(parameters.quotientId, qSlug));

    return quoParam;
};

export async function getParameters(qid: number, param: string): Promise<Parameters[]> {
    const paramExist: Parameters[] = await db.select()
    .from(parameters)
    .where(and(eq(parameters.quotientId, qid), eq(parameters.parameter, param)));

    return paramExist;
};

export async function getParameterById(qid: number, pid: number): Promise<paramWDispSchema[]> {
    const parameter: paramWDispSchema[] = await db.select({
        pid: parameters.id,
        pwid: parameterWeightages.id,
        pname: parameters.parameter,
        cname: companies.name,
        rname: roles.name,
        weightage: parameterWeightages.pWeightage
    })
    .from(parameterWeightages)
    .innerJoin(parameters, eq(parameters.id, parameterWeightages.parameterId))
    .innerJoin(companies, eq(companies.id, parameterWeightages.companyId))
    .innerJoin(roles, eq(roles.id, parameterWeightages.roleId))
    .where(and(eq(parameters.id, pid), eq(parameters.quotientId, qid)));

    return parameter;
};
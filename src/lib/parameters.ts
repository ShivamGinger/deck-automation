import { db } from "@/db";
import { companies, parameters, Parameters, parameterWeightages, quotients, roles } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type qParams = {
    quotientId: number;
    quotient: string;
    parameterId: number;
    parameter: string;
};

export type parameterw = {
    parameter_weightage_id: number;
    company_id: number;
    company_name: string;
    role_id: number;
    role_name: string;
    quotient_id: number;
    quotient_name: string;
    parameter_id: number;
    parameter_name: string;
    parameter_weightage: number;
};

export async function getAllQuotientParams(qSlug: number): Promise<qParams[]> {
    const quoParam: qParams[] = await db.select({
        quotientId: parameters.quotientId,
        quotient: quotients.quotient,
        parameterId: parameters.id,
        parameter: parameters.parameter
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

export async function getParameterById(qid: number, pid: number): Promise<qParams[]> {
    const paramExist: qParams[] = await db.select({
        quotientId: quotients.id,
        quotient: quotients.quotient,
        parameterId: parameters.id,
        parameter: parameters.parameter,
        createdAt: parameters.createdAt
    })
    .from(parameters)
    .innerJoin(quotients, eq(quotients.id, parameters.quotientId))
    .where(and(eq(parameters.id, pid), eq(parameters.quotientId, qid)));

    return paramExist;
};

export async function getAllCmpQuoParameterW(cmpId: number, rleId: number, quoId: number): Promise<parameterw[]> {
    const quoParam = db
    .select({
        id: parameters.id,
        parameter: parameters.parameter,
        quotientId: parameters.quotientId
    })
    .from(parameters)
    .where(eq(parameters.quotientId, quoId)).as('quoParam');

    const quoParamWei: parameterw[] = await db.select({
        parameter_weightage_id: parameterWeightages.id,
        company_id: parameterWeightages.companyId,
        company_name: companies.name,
        role_id: parameterWeightages.roleId,
        role_name: roles.name,
        quotient_id: quoParam.quotientId,
        quotient_name: quotients.quotient,
        parameter_id: parameterWeightages.parameterId,
        parameter_name: quoParam.parameter,
        parameter_weightage: parameterWeightages.pWeightage
    })
    .from(parameterWeightages)
    .innerJoin(companies, eq(companies.id, parameterWeightages.companyId))
    .innerJoin(roles, eq(roles.id, parameterWeightages.roleId))
    .innerJoin(quoParam, eq(quoParam.id, parameterWeightages.parameterId))
    .innerJoin(quotients, eq(quotients.id, quoParam.quotientId))
    .where(and(eq(companies.id, cmpId), eq(roles.id, rleId)));

    return quoParamWei;
};

export async function getCmpQuoParameterW(cmpId: number, rleId: number, quoId: number, parameterId: number): Promise<parameterw[]> {
    const quoParam = db
    .select({
        id: parameters.id,
        parameter: parameters.parameter,
        quotientId: parameters.quotientId
    })
    .from(parameters)
    .where(eq(parameters.quotientId, quoId)).as('quoParam');

    const quoParamWei: parameterw[] = await db.select({
        parameter_weightage_id: parameterWeightages.id,
        company_id: parameterWeightages.companyId,
        company_name: companies.name,
        role_id: parameterWeightages.roleId,
        role_name: roles.name,
        quotient_id: quoParam.quotientId,
        quotient_name: quotients.quotient,
        parameter_id: parameterWeightages.parameterId,
        parameter_name: quoParam.parameter,
        parameter_weightage: parameterWeightages.pWeightage
    })
    .from(parameterWeightages)
    .innerJoin(companies, eq(companies.id, parameterWeightages.companyId))
    .innerJoin(roles, eq(roles.id, parameterWeightages.roleId))
    .innerJoin(quoParam, eq(quoParam.id, parameterWeightages.parameterId))
    .innerJoin(quotients, eq(quotients.id, quoParam.quotientId))
    .where(and(eq(companies.id, cmpId), eq(roles.id, rleId), eq(parameterWeightages.parameterId, parameterId)));

    return quoParamWei;
};
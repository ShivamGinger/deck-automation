import { db } from "@/db";
import { companies, parameters, Parameters, parameterWeightages, quotients, quotientWeightages, roles } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { number } from "zod";

export type paramWeightage = {
    parameter_weightage: number;
};

export type paramQuotientId = {
    quotient_id: number;
};

export type qParams = {
    quotient_id: number;
    quotient_name: string;
    parameter_id: number;
    parameter_name: string;
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
        quotient_id: parameters.quotientId,
        quotient_name: quotients.quotient,
        parameter_id: parameters.id,
        parameter_name: parameters.parameter
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
        quotient_id: quotients.id,
        quotient_name: quotients.quotient,
        parameter_id: parameters.id,
        parameter_name: parameters.parameter,
        created_at: parameters.createdAt
    })
    .from(parameters)
    .innerJoin(quotients, eq(quotients.id, parameters.quotientId))
    .where(and(eq(parameters.id, pid), eq(parameters.quotientId, qid)));

    return paramExist;
};

export async function getAllCmpQuoParameterW(cmpId: number, rleId: number, quoWeiId: number): Promise<parameterw[]> {
    const quotient = db
    .select({
        quotient_weightage_id: quotientWeightages.id,
        quotient_id: quotientWeightages.quotientId,
    })
    .from(quotientWeightages)
    .where(and(eq(quotientWeightages.id, quoWeiId))).as('quotient');

    const quoParam = db
    .select(
        {
            parameter_id: parameters.id,
            parameter_name: parameters.parameter,
            quotient_id: parameters.quotientId,
            quotient_name: quotients.quotient,
        }
    )
    .from(parameters)
    .innerJoin(quotients, eq(quotients.id, parameters.quotientId))
    .innerJoin(quotient, eq(quotient.quotient_id, parameters.quotientId))
    .where(eq(parameters.quotientId, quotient.quotient_id)).as('quoParam');

    const quoParamWei: parameterw[] = await db.select({
        parameter_weightage_id: parameterWeightages.id,
        company_id: parameterWeightages.companyId,
        company_name: companies.name,
        role_id: parameterWeightages.roleId,
        role_name: roles.name,
        quotient_id: quoParam.quotient_id,
        quotient_name: quoParam.quotient_name,
        parameter_id: parameterWeightages.parameterId,
        parameter_name: quoParam.parameter_name,
        parameter_weightage: parameterWeightages.pWeightage
    })
    .from(parameterWeightages)
    .innerJoin(companies, eq(companies.id, parameterWeightages.companyId))
    .innerJoin(roles, eq(roles.id, parameterWeightages.roleId))
    .innerJoin(quoParam, eq(quoParam.parameter_id, parameterWeightages.parameterId))
    .where(and(eq(companies.id, cmpId), eq(roles.id, rleId)));

    return quoParamWei;
};

export async function getCmpQuoParameterW(cmpId: number, rleId: number, quoWeiId: number, parameterWeiId: number): Promise<parameterw[]> {
    const quoParamWei: parameterw[] = await db.select({
        parameter_weightage_id: parameterWeightages.id,
        company_id: parameterWeightages.companyId,
        company_name: companies.name,
        role_id: parameterWeightages.roleId,
        role_name: roles.name,
        quotient_id: quotients.id,
        quotient_name: quotients.quotient,
        parameter_id: parameterWeightages.parameterId,
        parameter_name: parameters.parameter,
        parameter_weightage: parameterWeightages.pWeightage
    })
    .from(parameterWeightages)
    .innerJoin(companies, eq(companies.id, parameterWeightages.companyId))
    .innerJoin(roles, eq(roles.id, parameterWeightages.roleId))
    .innerJoin(parameters, eq(parameters.id, parameterWeightages.parameterId))
    .innerJoin(quotients, eq(quotients.id, parameters.quotientId))
    .where(and(eq(parameterWeightages.companyId, cmpId), eq(parameterWeightages.roleId, rleId), eq(parameterWeightages.id, parameterWeiId)));

    return quoParamWei;
};

export type quoParameterExist = {
    parameter_weightage_id: number;
};

export async function cmpQuoParameterExist(cmpId: number, rleId: number, parameterId: number): Promise<quoParameterExist[]> {
    const quoParamWei: quoParameterExist[] = await db.select({
        parameter_weightage_id: parameterWeightages.id,
    })
    .from(parameterWeightages)
    .where(and(eq(parameterWeightages.companyId, cmpId), eq(parameterWeightages.roleId, rleId), eq(parameterWeightages.parameterId, parameterId)));

    return quoParamWei;
};
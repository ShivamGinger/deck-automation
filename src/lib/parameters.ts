import { db } from "@/db";
import { parameters } from "@/db/schema";
import { eq } from "drizzle-orm";

export type qParams = {
    id: number;
    parameter: string;
    qid: number;
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
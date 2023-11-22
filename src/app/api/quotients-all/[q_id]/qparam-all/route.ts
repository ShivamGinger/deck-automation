import { db } from "@/db";
import { parameters } from "@/db/schema";
import { getAllQuotientParams, getParameters, qParams } from "@/lib/parameters";
import { getQuotientById } from "@/lib/quotients";
import { createParameterSchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";

//TODO: add a function, route to display the weightages of different parameters and quotients based on company and their roles.

export async function GET(request: NextRequest, { params }: { params: { q_id: number } }) {
    try {
        const qSlug = params.q_id;
        const checkQuo = await getQuotientById(qSlug);
        if (checkQuo.length === 0) {
            return NextResponse.json({ error: "Cannot fetch parameters, quotient does not exist" }, { status: 404 });
        };

        const param: qParams[] = await getAllQuotientParams(qSlug);

        if (param.length === 0) {
            return NextResponse.json({ error: `Parameters not found.` }, { status: 404 });
        }

        return NextResponse.json({ data: param }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching parameters:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
};

export async function POST(request: NextRequest, { params }: { params: { q_id: number } }) {
    try {
        const requestData = await request.json();
        const parsedData = createParameterSchema.safeParse(requestData);
        const qSlug = params.q_id;

        if (!parsedData.success) {
            return NextResponse.json({ message: "Validation Error", error: `${parsedData.error}` }, { status: 400 });
        };
        const checkQuo = await getQuotientById(qSlug);
        if (checkQuo.length === 0) {
            return NextResponse.json({ error: "Cannot create parameter, quotient does not exist" }, { status: 404 });
        };

        const paramExist = await getParameters(qSlug, parsedData.data.parameter_name);
        if (paramExist.length !== 0) {
            return NextResponse.json({ error: "Parameter Already Exists" }, { status: 409 });
        };

        const crtParam = await db.insert(parameters).values({
            parameter: parsedData.data.parameter_name,
            quotientId: qSlug
        });

        return NextResponse.json({ status: 201 });

    } catch (error: any) {
        console.error('Error adding parameter:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    };
}
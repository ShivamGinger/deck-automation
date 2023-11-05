import { db } from "@/db";
import { roles } from "@/db/schema";
import { createRoleSchema } from "@/utils/bodyValidationSchemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = createRoleSchema.parse(requestData);

    // TODO: find if role exsists or not
    // otherwise add the role - line 25...

    // const exsistingRole = await db.query.roles.findFirst({
    //   where: eq(roles.name, parsedData.name)
    // });

    // if (exsistingRole) {
    //   return NextResponse.json({ error: "Role Already Exsists" }, { status: 409 });
    // }

    // const addRole = await db.insert(roles).values(parsedData);

    // if (addRole) {
    //   return NextResponse.json({ message: "Role added successfully", data: parsedData });
    // } else {
    //   return NextResponse.json({ error: "Role insertion failed" }, { status: 500 });
    // }

  } catch (error: any) {

    if (error instanceof ZodError) {

      const errorDetails = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json({ error: "Validation error", details: errorDetails }, { status: 400 });
    }
    else {
      return NextResponse.json({ error: "Invalid request", details: error.message }, { status: 400 });
    }
  }
};
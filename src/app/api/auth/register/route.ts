import { userRegistrationSchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";

import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = userRegistrationSchema.parse(requestData);

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const exsistingUser = await db.query.users.findFirst({
      where: eq(users.email, parsedData.email)
    });

    if (exsistingUser) {
      return NextResponse.json({ error: "Email Already in use. Kindly Login!" }, { status: 409 });
    };

    const addUser = await db.insert(users).values({ ...parsedData, password: hashedPassword });

    if (addUser) {
      return NextResponse.json({ msg: 'Account Registered Sucessfully. Kindly Login!' }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Account Registration failed" }, { status: 500 });
    }

  } catch (error: any) {

    if (error instanceof ZodError) {

      const errorDetails = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json({ error: "Validation error for -", details: errorDetails }, { status: 400 });
    }
    else {
      return NextResponse.json({ error: "Invalid request", details: error.message }, { status: 400 });
    }
  }

};
import { userRegistrationSchema } from "@/utils/bodyValidationSchemas";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { users } from "@/db/schema";

import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = userRegistrationSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ error: "Validation Error" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const exsistingUser = await db.query.users.findFirst({
      where: eq(users.email, parsedData.data.email)
    });

    if (exsistingUser) {
      return NextResponse.json({ error: "Email Already in use. Kindly Login!" }, { status: 409 });
    };

    const data: MySqlInsertValue<typeof users> = {
      email: parsedData.data.email,
      password: hashedPassword,
      firstName: parsedData.data.first_name,
      lastName: parsedData.data.last_name,
      isAdmin: parsedData.data.is_admin ? 1 : 0
    };

    await db.insert(users).values(data);

    return NextResponse.json({ data: 'Account Created Successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error while Registration Account: ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
import { db } from "@/db";
import { users } from "@/db/schema";
import { getAllUsers, user } from "@/lib/users";
import { EmailTemplate } from "@/utils/EmailTemplate";
import { createGroupSchema, userRegistrationSchema } from "@/utils/bodyValidationSchemas";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { MySqlInsertValue } from "drizzle-orm/mysql-core";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    const users: user[] = await getAllUsers();
    return NextResponse.json({ data: users }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  };
};

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const parsedData = userRegistrationSchema.safeParse(requestData);

    if (!parsedData.success) {
      return NextResponse.json({ error: "Validation Error" }, { status: 400 });
    };

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const exsistingUser = await db.query.users.findFirst({
      where: eq(users.email, parsedData.data.email)
    });

    if (exsistingUser) {
      return NextResponse.json({ error: "Account already added!" }, { status: 409 });
    };

    const data: MySqlInsertValue<typeof users> = {
      email: parsedData.data.email,
      password: hashedPassword,
      firstName: parsedData.data.first_name,
      lastName: parsedData.data.last_name,
      isAdmin: parsedData.data.is_admin ? 1 : 0
    };

    const user = await db.insert(users).values(data);

    if (user) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['shivam.t@gingerpartners.co'],
        subject: 'Account Created',
        react: EmailTemplate({
          first_name: parsedData.data.first_name,
          email: parsedData.data.email,
          password: parsedData.data.password
        }),
      });

      return NextResponse.json({ data: 'Account Created Successfully' }, { status: 201 });
    }

  } catch (error) {
    console.error('Error while Registration Account: ', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
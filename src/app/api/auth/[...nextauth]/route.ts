import { db } from "@/db";
import { User as DBUser, users } from "@/db/schema";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import NextAuth, { User as NextUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthUser = NextUser & DBUser;

const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<AuthUser | null> {
        try {
          const user = await db.query.users.findFirst({
            where: eq(users.email, credentials.email)
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

            if (isPasswordCorrect) {
              return {
                ...user,
                id: String(user.id) as never
              };
            }
          }

          return null;

        } catch (err: any) {
          throw new Error(err);
        }
      },
    })
  ]
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


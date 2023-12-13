import { db } from "@/db";
import { User as DBUser, groups, userGroups, users } from "@/db/schema";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import NextAuth, { AuthOptions, User as NextUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthUser = NextUser & DBUser;

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
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
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userGroup = await db.select({
          can_read: groups.canRead,
          can_edit: groups.canEdit,
          can_create: groups.canCreate,
          can_delete: groups.canDelete,
          first_name: users.firstName,
          last_name: users.lastName,
          email: users.email
        }).from(userGroups)
          .innerJoin(groups, eq(groups.id, userGroups.groupId))
          .innerJoin(users, eq(users.id, userGroups.userId))
          .where(eq(userGroups.userId, Number(user.id)));

        const { can_read, can_create, can_edit, can_delete, first_name, last_name, email } = userGroup[0];

        token.user = {
          can_read: can_read === 1 ? true : false,
          can_create: can_create === 1 ? true : false,
          can_edit: can_edit === 1 ? true : false,
          can_delete: can_delete === 1 ? true : false,
          first_name,
          last_name,
          email
        };
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {

      session.user = token.user as {
        can_read: boolean,
        can_create: boolean,
        can_edit: boolean,
        can_delete: boolean,
        first_name: string | null,
        last_name: string | null
        email: string;
      };

      return Promise.resolve(session)
    }
  },
};

export const handler = NextAuth(authOptions) as never;
export { handler as GET, handler as POST };


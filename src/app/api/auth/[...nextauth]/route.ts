import { db } from "@/db";
import { User as DBUser, groups, userGroups, users } from "@/db/schema";
import { hasPermission } from "@/lib/users";
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
          candidate_tracking_can_read: groups.candidateTrackingCanRead,
          candidate_tracking_can_edit: groups.candidateTrackingCanEdit,
          candidate_tracking_can_create: groups.candidateTrackingCanCreate,
          deck_automation_can_read: groups.deckAutomationCanRead,
          deck_automation_can_edit: groups.deckAutomationCanEdit,
          deck_automation_can_create: groups.deckAutomationCanCreate,
          all_quotients_can_read: groups.allQuotientsCanRead,
          all_quotients_can_edit: groups.allQuotientsCanEdit,
          all_quotients_can_create: groups.allQuotientsCanCreate,
          users_can_read: groups.usersCanRead,
          users_can_create: groups.usersCanCreate,
          users_can_delete: groups.usersCanDelete,
          groups_can_read: groups.groupsCanRead,
          groups_can_edit: groups.groupsCanEdit,
          groups_can_create: groups.groupsCanCreate,
          groups_can_delete: groups.groupsCanDelete,
          first_name: users.firstName,
          last_name: users.lastName,
          email: users.email,
          user_id: users.id
        }).from(userGroups)
          .innerJoin(groups, eq(groups.id, userGroups.groupId))
          .innerJoin(users, eq(users.id, userGroups.userId))
          .where(eq(userGroups.userId, Number(user.id)));

        if (userGroup && userGroup.length > 0) {

          token.user = {
            candidate_tracking_can_read: hasPermission(userGroup, 'candidate_tracking_can_read'),
            candidate_tracking_can_edit: hasPermission(userGroup, 'candidate_tracking_can_edit'),
            candidate_tracking_can_create: hasPermission(userGroup, 'candidate_tracking_can_create'),
            deck_automation_can_read: hasPermission(userGroup, 'deck_automation_can_read'),
            deck_automation_can_edit: hasPermission(userGroup, 'deck_automation_can_edit'),
            deck_automation_can_create: hasPermission(userGroup, 'deck_automation_can_create'),
            all_quotients_can_read: hasPermission(userGroup, 'all_quotients_can_read'),
            all_quotients_can_edit: hasPermission(userGroup, 'all_quotients_can_edit'),
            all_quotients_can_create: hasPermission(userGroup, 'all_quotients_can_create'),
            users_can_read: hasPermission(userGroup, 'users_can_read'),
            users_can_create: hasPermission(userGroup, 'users_can_create'),
            users_can_delete: hasPermission(userGroup, 'users_can_delete'),
            groups_can_read: hasPermission(userGroup, 'groups_can_read'),
            groups_can_edit: hasPermission(userGroup, 'groups_can_edit'),
            groups_can_create: hasPermission(userGroup, 'groups_can_create'),
            groups_can_delete: hasPermission(userGroup, 'groups_can_delete'),
            first_name: userGroup[0].first_name,
            last_name: userGroup[0].last_name,
            email: userGroup[0].email,
            user_id: userGroup[0].user_id
          };
        } else {
          const userData = await db.select({
            first_name: users.firstName,
            last_name: users.lastName,
            email: users.email,
            user_id: users.id
          }).from(users).where(eq(users.id, Number(user.id)))

          const { first_name, last_name, email, user_id } = userData[0];

          token.user = {
            candidate_tracking_can_read: false,
            candidate_tracking_can_edit: false,
            candidate_tracking_can_create: false,
            deck_automation_can_read: false,
            deck_automation_can_edit: false,
            deck_automation_can_create: false,
            all_quotients_can_read: false,
            all_quotients_can_edit: false,
            all_quotients_can_create: false,
            users_can_read: false,
            users_can_create: false,
            users_can_delete: false,
            groups_can_read: false,
            groups_can_edit: false,
            groups_can_create: false,
            groups_can_delete: false,
            first_name,
            last_name,
            email,
            user_id
          };
        }
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {

      session.user = token.user as {
        candidate_tracking_can_read: boolean,
        candidate_tracking_can_edit: boolean,
        candidate_tracking_can_create: boolean,
        deck_automation_can_read: boolean,
        deck_automation_can_edit: boolean,
        deck_automation_can_create: boolean,
        all_quotients_can_read: boolean,
        all_quotients_can_edit: boolean,
        all_quotients_can_create: boolean,
        users_can_read: boolean,
        users_can_create: boolean,
        users_can_delete: boolean,
        groups_can_read: boolean,
        groups_can_edit: boolean,
        groups_can_create: boolean,
        groups_can_delete: boolean,
        first_name: string | null,
        last_name: string | null
        email: string,
        user_id: number
      };

      return Promise.resolve(session)
    }
  },
};

export const handler = NextAuth(authOptions) as never;
export { handler as GET, handler as POST };


import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      can_read: boolean,
      can_create: boolean,
      can_edit: boolean,
      can_delete: boolean,
      first_name: string | null,
      last_name: string | null
    }
  }
}
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
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
      email: string,
      first_name: string | null,
      last_name: string | null,
      user_id: number
    }
  }
}
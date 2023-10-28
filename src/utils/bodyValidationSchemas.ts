import { z } from "zod";

// Define all the schemas for body parsing here

export const createCandidateSchema = z.object({
  name: z.string(),
  keyPoints: z.array(z.string()),
  profilePic: z.string(),
  social: z.string(),
  companyId: z.number(),
  roleId: z.number()
});
import { z } from "zod";

export const createCandidateSchema = z.object({
  name: z.string(),
  keyPoints: z.array(z.string()),
  profilePic: z.string(),
  social: z.string(),
  companyId: z.number(),
  roleId: z.number()
});
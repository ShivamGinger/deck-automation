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

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
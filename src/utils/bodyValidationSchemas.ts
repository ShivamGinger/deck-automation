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

export const createCompanySchema = z.object({
  name: z.string().regex(/^[A-Za-z]+$/),
});

export const createRoleSchema = z.object({
  companyID: z.string().regex(/^[0-9]+$/),
  name: z.string().regex(/^[A-Za-z]+$/),
});
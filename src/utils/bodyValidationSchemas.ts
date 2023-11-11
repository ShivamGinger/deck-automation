import { z } from "zod";

// Define all the schemas for body parsing here

export const createCandidateSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  phNum: z.string().min(10).max(14),
  email: z.string().email(),
  keyPoints: z.record(z.string()).nullable(),
  profilePic: z.string().nullable(),
  social: z.string().nullable(),
  companyId: z.number().nullable(),
  roleId: z.number().nullable(),
  createdAt: z.string().nullable(),
  currPos: z.string().nullable(),
  currLoc: z.string().nullable(),
  experience: z.string().nullable(),
  fixedLpa: z.string().nullable(),
  varLpa: z.string().nullable(),
  expectedCtc: z.string().nullable(),
  noticePeriod: z.string().nullable()
});

export const deleteCandidateSchema = z.object({
  id: z.number().positive()
});

export const createCompanySchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  createdAt: z.string().nullable()
});

export const deleteCompanySchema = z.object({
  id: z.number().positive()
});

export const createRoleSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  companyId: z.number(),
  createdAt: z.string().nullable()
});

export const deleteRoleSchema = z.object({
  id: z.number().positive()
});

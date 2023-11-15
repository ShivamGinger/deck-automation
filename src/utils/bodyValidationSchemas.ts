import { z } from "zod";

// Define all the schemas for body parsing here

export const createCandidateSchema = z.object({
  candidateInfo: z.array(
    z.object({
      name: z.string(),
      keyPoints: z.array(z.string()).nullable(),
      profilePic: z.string().nullable(),
      companyId: z.number().nullable(),
      roleId: z.number().nullable(),
      social: z.string().nullable(),
      email: z.string().email(),
      currPos: z.string().nullable(),
      currLoc: z.string().nullable(),
      experience: z.string().nullable(),
      phNum: z.string().min(10).max(14),
      fixedLpa: z.number().multipleOf(0.01).nullable(),
      varLpa: z.number().multipleOf(0.01).nullable(),
      expectedCtc: z.string().nullable(),
      noticePeriod: z.string().nullable(),
      description: z.string().nullable(),
      achievement: z.array(z.string()).nullable(),
      gender: z.enum(['male', 'female', 'other']),
      currCmp: z.string().nullable(),
      esopRsu: z.number().multipleOf(0.01).nullable(),
    })
  )
});

export const deleteCandidateSchema = z.object({
  id: z.number().positive(),
});

export const createCompanySchema = z.object({
  name: z.string(),
});

export const deleteCompanySchema = z.object({
  id: z.number().positive(),
});

export const createRoleSchema = z.object({
  name: z.string(),
  companyId: z.number(),
});

export const deleteRoleSchema = z.object({
  id: z.number().positive(),
});

export const createQuotientSchema = z.object({
  quotient: z.string(),
});

export const createParameterSchema = z.object({
  parameter: z.string(),
  quotientId: z.number(),
});


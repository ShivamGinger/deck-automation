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
      shareCandidateStatus: z.boolean(),
      candidateStatus: z.object({
        profileShrDate: z.string().nullable(),
        status: z.enum(['yet_to_share', 'joined', 'negotiation', 'on_hold', 'feedback_pending', 'dropped_out', 'rejected', 'in_process']).nullable(),
        roundDone: z.number().nullable(),
        reasonReject: z.string().nullable(),
    }).nullable()
    })
  )
});

export const deleteCandidateSchema = z.object({
  id: z.number().positive(),
});

export const createCompanySchema = z.object({
  company_name: z.string(),
});

export const deleteCompanySchema = z.object({
  id: z.number().positive(),
});

export const createRoleSchema = z.object({
  role_name: z.string(),
});

export const deleteRoleSchema = z.object({
  id: z.number().positive(),
});

//
export const createQuotientWeiSchema = z.object({
  quotientW: z.array(
    z.object(
      {
        quotient_id: z.number(),
        quotient_name: z.string(),
        quotient_weightage: z.number()
      }
    )
  )
});

export const createQuotientSchema = z.object({
  quotient_name: z.string(),
});

export const createParameterWeiSchema = z.object({
  parameterW: z.array(
    z.object(
      {
        parameter_id: z.number(),
        parameter_name: z.string(),
        parameter_weightage: z.number()
      }
    )
  )
});

export const createParameterSchema = z.object({
  parameter_name: z.string(),
});

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
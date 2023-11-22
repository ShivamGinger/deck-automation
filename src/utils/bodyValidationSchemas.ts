import { z } from "zod";

// Define all the schemas for body parsing here

export const createCandidateSchema = z.object({
  candidateInfo: z.array(
    z.object({
      candidate_name: z.string(),
      key_points: z.array(z.string()).nullable(),
      profile_pic: z.string().nullable(),
      company_id: z.number().nullable(),
      role_id: z.number().nullable(),
      social: z.string().nullable(),
      email: z.string().email(),
      current_position: z.string().nullable(),
      current_location: z.string().nullable(),
      experience: z.string().nullable(),
      phone_number: z.string().min(10).max(14),
      fixed_lpa: z.number().multipleOf(0.01).nullable(),
      variable_lpa: z.number().multipleOf(0.01).nullable(),
      expected_ctc: z.string().nullable(),
      notice_period: z.string().nullable(),
      description: z.string().nullable(),
      achievement: z.array(z.string()).nullable(),
      gender: z.enum(['male', 'female', 'other']),
      current_company: z.string().nullable(),
      esop_rsu: z.number().multipleOf(0.01).nullable(),
      share_candidate_status: z.boolean(),
      candidate_status: z.object({
        candidate_profile_share_date: z.string().nullable(),
        candidate_status: z.enum(['yet_to_share', 'joined', 'negotiation', 'on_hold', 'feedback_pending', 'dropped_out', 'rejected', 'in_process']).nullable(),
        candidate_round_completed: z.number().nullable(),
        candidate_reject_reason: z.string().nullable(),
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
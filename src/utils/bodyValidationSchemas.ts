import { boolean, z } from "zod";

// Define all the schemas for body parsing here

export const createOrphanCandidateSchema = z.object({
  candidate_information: z.array(
    z.object({
      candidate_name: z.string(),
      key_points: z.array(z.string()).nullable(),
      profile_pic: z.string().nullable(),
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
      gender: z.enum(["male", "female", "other"]),
      current_company: z.string().nullable(),
      esop_rsu: z.number().multipleOf(0.01).nullable(),
      share_candidate_status: z.boolean(),
      candidate_status: z
        .object({
          candidate_profile_share_date: z.string().nullable(),
          candidate_status: z
            .enum([
              "yet_to_share",
              "joined",
              "negotiation",
              "on_hold",
              "feedback_pending",
              "dropped_out",
              "rejected",
              "in_process",
            ])
            .nullable(),
          candidate_round_completed: z.number().nullable(),
          candidate_reject_reason: z.string().nullable(),
        })
        .nullable(),
    })
  ),
});

export const createCandidateSchema = z.object({
  candidate_information: z.array(
    z.object({
      candidate_name: z.string(),
      key_points: z.array(z.string()).nullable(),
      profile_pic: z.string().nullable(),
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
      gender: z.enum(["male", "female", "other"]),
      current_company: z.string().nullable(),
      esop_rsu: z.number().multipleOf(0.01).nullable(),
      share_candidate_status: z.boolean(),
      candidate_status: z
        .object({
          candidate_profile_share_date: z.string().nullable(),
          candidate_status: z
            .enum([
              "yet_to_share",
              "joined",
              "negotiation",
              "on_hold",
              "feedback_pending",
              "dropped_out",
              "rejected",
              "in_process",
            ])
            .nullable(),
          candidate_round_completed: z.number().nullable(),
          candidate_reject_reason: z.string().nullable(),
        })
        .nullable(),
      candidate_parameter_scores: z.array(
        z.object({
          parameter_id: z.number(),
          parameter_score: z.number(),
        })
      ),
    })
  ),
});

export const updateCandidateSchema = z.object({
  candidate_name: z.string(),
  key_points: z.array(z.string()).nullable(),
  profile_pic: z.string().nullable(),
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
  gender: z.enum(["male", "female", "other"]),
  current_company: z.string().nullable(),
  esop_rsu: z.number().multipleOf(0.01).nullable(),
});

export const updateOrphanCandidateSchema = z.object({
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
  gender: z.enum(["male", "female", "other"]),
  current_company: z.string().nullable(),
  esop_rsu: z.number().multipleOf(0.01).nullable(),
  candidate_profile_share_date: z.string().nullable(),
  candidate_status: z
    .enum([
      "yet_to_share",
      "joined",
      "negotiation",
      "on_hold",
      "feedback_pending",
      "dropped_out",
      "rejected",
      "in_process",
    ])
    .nullable(),
  candidate_round_completed: z.number().nullable(),
  candidate_reject_reason: z.string().nullable(),
});

export const updateCandidateScoreSchema = z.object({
  candidate_parameter_scores: z.array(
    z.object({
      parameter_id: z.number(),
      parameter_score: z.number(),
    })
  ),
});

export const createCompanySchema = z.object({
  company_name: z.string(),
  company_logo: z.string(),
});

export const updateCompanySchema = z.object({
  company_logo: z.string(),
  company_name: z.string(),
});

export const createRoleSchema = z.object({
  role_name: z.string(),
});

export const updateRoleSchema = z.object({
  role_name: z.string(),
});

export const createQuotientWeiSchema = z.object({
  quotientW: z.array(
    z.object({
      quotient_id: z.number(),
      quotient_name: z.string(),
      quotient_weightage: z.number(),
    })
  ),
});

export const createQuotientSchema = z.object({
  quotient_name: z.string(),
});

export const updateQuotientSchema = z.object({
  quotient_name: z.string(),
});

export const createParameterWeiSchema = z.object({
  parameterW: z.array(
    z.object({
      parameter_id: z.number(),
      parameter_name: z.string(),
      parameter_weightage: z.number(),
    })
  ),
});

export const createParameterSchema = z.object({
  parameter_name: z.string(),
});

export const updateParameterSchema = z.object({
  parameter_name: z.string(),
});

export const userRegistrationSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  is_admin: z.number().min(0).max(1),
});

export const updateUserDetailsSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  old_password: z.string(),
  new_password: z.string().min(6),
  confirm_new_password: z.string().min(6),
});

export const createGroupSchema = z.object({
  group_name: z.string(),
  candidate_tracking_can_read: z.number().min(0).max(1),
  candidate_tracking_can_edit: z.number().min(0).max(1),
  candidate_tracking_can_create: z.number().min(0).max(1),
  deck_automation_can_read: z.number().min(0).max(1),
  deck_automation_can_edit: z.number().min(0).max(1),
  deck_automation_can_create: z.number().min(0).max(1),
  all_quotients_can_read: z.number().min(0).max(1),
  all_quotients_can_edit: z.number().min(0).max(1),
  all_quotients_can_create: z.number().min(0).max(1),
  users_can_read: z.number().min(0).max(1),
  users_can_create: z.number().min(0).max(1),
  users_can_delete: z.number().min(0).max(1),
  groups_can_read: z.number().min(0).max(1),
  groups_can_edit: z.number().min(0).max(1),
  groups_can_create: z.number().min(0).max(1),
  groups_can_delete: z.number().min(0).max(1),
});

export const updateGroupSchema = z.object({
  group_name: z.string(),
  candidate_tracking_can_read: z.number().min(0).max(1),
  candidate_tracking_can_edit: z.number().min(0).max(1),
  candidate_tracking_can_create: z.number().min(0).max(1),
  deck_automation_can_read: z.number().min(0).max(1),
  deck_automation_can_edit: z.number().min(0).max(1),
  deck_automation_can_create: z.number().min(0).max(1),
  all_quotients_can_read: z.number().min(0).max(1),
  all_quotients_can_edit: z.number().min(0).max(1),
  all_quotients_can_create: z.number().min(0).max(1),
  users_can_read: z.number().min(0).max(1),
  users_can_create: z.number().min(0).max(1),
  users_can_delete: z.number().min(0).max(1),
  groups_can_read: z.number().min(0).max(1),
  groups_can_edit: z.number().min(0).max(1),
  groups_can_create: z.number().min(0).max(1),
  groups_can_delete: z.number().min(0).max(1),
});

export const addUserToGroupSchema = z.object({
  user_id: z.number(),
});

export const updateUserGroupSchema = z.object({
  group_id: z.number(),
});

export const createSkill = z.object({
  skill: z.array(
    z.object({
      skill_name: z.string(),
      is_active: z.number().min(0).max(1).default(1),
    })
  )
});

// export const createSkill = z.object({
//   skill_name: z.string(),
// });

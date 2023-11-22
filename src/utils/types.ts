export interface CompanyDetails {
  company_id: number,
  company_name: string,
};

export interface CompanyDetailsRoleCount extends CompanyDetails {
  roles_count: number
};

export interface RoleDetails {
  role_id: number,
  role_name: string
};

export interface QuotientFactors {
  quotient_id: number,
  quotient_name: string
};

export interface QuotientFactorsCount extends QuotientFactors {
  parameter_count: number
};

export interface ParameterFactors extends QuotientFactors {
  parameter_id: number,
  parameter_name: string,
};

export interface QuotientFactorsWeightage extends CompanyDetails, RoleDetails, QuotientFactors {
  quotient_weightage: number
  quotient_weightage_id: number
};

export interface ParametersQuotientFactors extends ParameterFactors, CompanyDetails, RoleDetails {
  parameter_weightage_id: number;
  parameter_weightage: number;
};

export interface ParametersQuotientFactorsValue extends ParametersQuotientFactors {
  parameter_score: number,
};

export interface ParameterFactorsValues extends ParameterFactors {
  value: number
};

export interface ParameterFactorsError extends ParameterFactors {
  error: boolean
};

export interface BasicCandidateInformation {
  candidate_name: string,
  profile_pic: string,
  social: string,
  email: string,
  current_position: string,
  current_location: string,
  experience: string,
  phone_number: string,
  fixed_lpa: string, // current CTC - while sending convert to number
  variable_lpa: string, // variable CTC - while sending convert to number
  expected_ctc: string,
  notice_period: string,
  description: string,
  gender: 'male' | 'female' | 'other',
  current_company: string,
  esop_rsu: string, //- while sending convert to number
};

export type CandidateTrackingStatus = "yet_to_share" | "joined" | "negotiation" | "in_process" | "on_hold" | "feedback_pending" | "dropped_out" | "rejected"

export interface CandidateTrackingInformation extends BasicCandidateInformation {
  candidate_profile_share_date: string,
  candidate_reject_reason: string,
  candidate_round_completed: string, //- while sending convert to number,
  candidate_status: CandidateTrackingStatus,
  achievement: {
    achievement: string[]
  },
  key_points: {
    keyPoints: string[]
  }
};

export interface CompleteCandidateInformation extends BasicCandidateInformation, CandidateTrackingInformation {
  company_id: string, //- while sending convert to number
  company_name: string,
  role_id: string, //- while sending convert to number
  role_name: string,
  candidate_id: number
};

export interface AddCandidateTrackingInformation extends BasicCandidateInformation {
  shareCandidateStatus: boolean,
  candidateStatus: {
    candidate_profile_share_date: string,
    candidate_status: CandidateTrackingStatus,
    candidate_round_completed: string, //- while sending convert to number,
    candidate_reject_reason: string,
  },
  achievement: string[],
  key_points: string[]
};

export interface ParameterDetails extends ParametersQuotientFactorsValue, QuotientFactorsWeightage { };

export interface AddCandidateInformation extends BasicCandidateInformation {
  achievement: string[],
  key_points: string[],
  candidate_parameter_scores: ParametersQuotientFactorsValue[]
};

export type HandleCandidateInputChangeValue = (
  index: number,
  value: string | string[] | boolean | {
    id: number,
    parameters: QuotientFactors[] | []
  } | {
    parameter_id: number,
    parameter_score: number
  }[],
  field: string
) => void;


import { AddCandidateTrackingInformation, EditCandidateTrackingInformation } from "@/utils/types";
import { string } from "zod";

export function isValidDecimalNumber(value: string) {
  const regex = /^\d{1,3}(\.\d{1,2})?$/;

  return regex.test(value);
};

export function isValidEmail(email: string) {
  const emailSchema = string().email();

  const validationResult = emailSchema.safeParse(email);

  return validationResult.success;
};

export function getParsedData(jsonString: string | string[]): Record<string, any> | null {
  const parsedData = Array.isArray(jsonString) ? jsonString[0] : jsonString;

  try {
    const decodedData = decodeURIComponent(parsedData);

    const parsedDataObject = JSON.parse(decodedData);

    return parsedDataObject;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

export function validateTrackingCandidates(candidateInfo: AddCandidateTrackingInformation[]) {
  for (const candidate of candidateInfo) {
    const {
      candidate_name,
      email,
      phone_number,
      fixed_lpa,
      variable_lpa,
      gender,
      esop_rsu,
      share_candidate_status,
      candidate_status: { candidate_profile_share_date, candidate_round_completed }
    } = candidate;

    if (
      !candidate_name || !phone_number || phone_number.length < 10 || phone_number.length > 15 ||
      !email || !isValidEmail(email) ||
      !gender || !(['male', 'female', 'other'].includes(gender))
    ) {
      return false;
    } else {
      if (
        (esop_rsu && !isValidDecimalNumber(esop_rsu)) ||
        (fixed_lpa && !isValidDecimalNumber(fixed_lpa)) ||
        (variable_lpa && !isValidDecimalNumber(variable_lpa)) ||
        (share_candidate_status && ((candidate_profile_share_date && !isValidDateFormat(candidate_profile_share_date)) || (candidate_round_completed && !isValidNumber(candidate_round_completed))))
      ) {
        return false;
      }
    }
  }
  return true;
};

export function validateEditTrackingCandidates(showAddStatus: boolean, candidateInfo: EditCandidateTrackingInformation) {
  const {
    candidate_name,
    email,
    phone_number,
    fixed_lpa,
    variable_lpa,
    gender,
    esop_rsu,
    candidate_profile_share_date,
    candidate_round_completed
  } = candidateInfo;

  if (
    !candidate_name || !phone_number || phone_number.length < 10 || phone_number.length > 15 ||
    !email || !isValidEmail(email) ||
    !gender || !(['male', 'female', 'other'].includes(gender))
  ) {
    return false;
  } else {
    if (
      (esop_rsu && !isValidDecimalNumber(esop_rsu)) ||
      (fixed_lpa && !isValidDecimalNumber(fixed_lpa)) ||
      (variable_lpa && !isValidDecimalNumber(variable_lpa)) ||
      ((candidate_profile_share_date && !isValidDateFormat(candidate_profile_share_date)) || (candidate_round_completed && !isValidNumber(candidate_round_completed)))
    ) {
      return false;
    }
  }
  return true;
};

export function isValidNumber(value: string) {
  return /\d/.test(value);
};

export function isValidDateFormat(value: string) {
  const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;

  return dateFormatRegex.test(value);
};
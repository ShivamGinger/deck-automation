import { isValidDecimalNumber, isValidEmail } from "@/app/(site)/Components/Candidate/validationFunctions";

import { AddCandidateInformation } from "@/utils/types";

export function validateCandidates(candidateInfo: AddCandidateInformation[]) {
  for (const candidate of candidateInfo) {
    const {
      candidate_name,
      key_points,
      profile_pic,
      social,
      email,
      current_position,
      current_location,
      experience,
      phone_number,
      fixed_lpa,
      variable_lpa,
      expected_ctc,
      notice_period,
      description,
      achievement,
      gender,
      esop_rsu,
      candidate_parameter_scores
    } = candidate;

    if (
      !candidate_name ||
      (key_points.length > 1 && key_points.some(element => element === '')) ||
      !profile_pic ||
      !social ||
      !email || !isValidEmail(email) ||
      !current_position ||
      !current_location ||
      !experience ||
      !phone_number || phone_number.length < 10 || phone_number.length > 15 ||
      !fixed_lpa || !isValidDecimalNumber(fixed_lpa) ||
      !variable_lpa || !isValidDecimalNumber(variable_lpa) ||
      !expected_ctc ||
      !notice_period ||
      !description || description.length > 150 ||
      (achievement.length > 1 && achievement.some(element => element === '')) ||
      !gender || !(['male', 'female', 'other'].includes(gender)) ||
      candidate_parameter_scores.some(param => param.parameter_score > 5 || param.parameter_score <= 0 || isNaN(param.parameter_score))
    ) {
      return false;
    } else {
      if (esop_rsu && !isValidDecimalNumber(esop_rsu)) {
        return false;
      }
    }
  }
  return true;
};
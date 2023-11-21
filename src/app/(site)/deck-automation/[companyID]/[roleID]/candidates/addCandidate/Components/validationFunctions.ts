import { isValidDecimalNumber, isValidEmail } from "@/app/(site)/Components/Candidate/validationFunctions";

import { AddCandidateInformation } from "@/utils/types";

export function validateCandidates(candidateInfo: AddCandidateInformation[]) {
  for (const candidate of candidateInfo) {
    const {
      candidate_name,
      keyPoints,
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
      parameterDetails
    } = candidate;

    if (
      !candidate_name ||
      (keyPoints.length >= 1 && keyPoints.some(element => element === '')) ||
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
      !description ||
      (achievement.length >= 1 && achievement.some(element => element === '')) ||
      !gender || !(['male', 'female', 'other'].includes(gender)) ||
      parameterDetails.some(param => param.value > 5 || param.value <= 0 || isNaN(param.value))
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
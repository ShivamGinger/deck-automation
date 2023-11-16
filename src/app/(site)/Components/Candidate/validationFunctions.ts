import { CandidateInfo, CandidateTrackingInfo, QuotientFactors } from "@/utils/constants";
import { string } from "zod";

export function validateCandidates(candidateInfo: CandidateInfo[]) {
  for (const candidate of candidateInfo) {
    const {
      name,
      keyPoints,
      profilePic,
      companyId,
      roleId,
      social,
      email,
      currPos,
      currLoc,
      experience,
      phNum,
      fixedLpa,
      varLpa,
      expectedCtc,
      noticePeriod,
      description,
      achievement,
      gender,
      esopRsu,
      inteli_fact: { parameters: inteli_parameters },
      emotional_fact: { parameters: emotional_parameters },
      social_fact: { parameters: social_parameters },
      adversity_quotient: { parameters: adversity_parameters }
    } = candidate;

    if (
      !name ||
      (Array.isArray(keyPoints) && keyPoints.length >= 1 && keyPoints.some(element => element === '')) ||
      !profilePic ||
      !companyId ||
      !roleId ||
      !social ||
      !email || !isValidEmail(email) ||
      !currPos ||
      !currLoc ||
      !experience ||
      !phNum || phNum.length < 10 || phNum.length > 15 ||
      !fixedLpa || !isValidDecimalNumber(fixedLpa) ||
      !varLpa || !isValidDecimalNumber(varLpa) ||
      !expectedCtc ||
      !noticePeriod ||
      !description ||
      (Array.isArray(achievement) && achievement.length >= 1 && achievement.some(element => element === '')) ||
      !gender || !(['male', 'female', 'other'].includes(gender)) ||
      !validateParameters(inteli_parameters) || !validateParameters(emotional_parameters) ||
      !validateParameters(social_parameters) || !validateParameters(adversity_parameters)
    ) {
      return false;
    } else {
      if (esopRsu && !isValidDecimalNumber(esopRsu)) {
        return false;
      }
    }
  }
  return true;
};

function validateParameters(parameters: QuotientFactors[]) {
  for (const { value } of parameters) {
    if (value > 5 || value < 1 || isNaN(value)) {
      return false;
    }
  }
  return true;
};

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

export function validateTrackingCandidates(candidateInfo: CandidateTrackingInfo[]) {
  for (const candidate of candidateInfo) {
    const {
      name,
      email,
      phNum,
      fixedLpa,
      varLpa,
      gender,
      esopRsu,
      shareCandidateStatus,
      candidateStatus: { profileShrDate, roundDone }
    } = candidate;

    if (
      !name || !phNum || phNum.length < 10 || phNum.length > 15 ||
      !email || !isValidEmail(email) ||
      !gender || !(['male', 'female', 'other'].includes(gender))
    ) {
      return false;
    } else {
      if (
        (esopRsu && !isValidDecimalNumber(esopRsu)) ||
        (fixedLpa && !isValidDecimalNumber(fixedLpa)) ||
        (varLpa && !isValidDecimalNumber(varLpa)) ||
        (shareCandidateStatus && ((profileShrDate && !isValidDateFormat(profileShrDate)) || (roundDone && !isValidNumber(roundDone))))
      ) {
        return false;
      }
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
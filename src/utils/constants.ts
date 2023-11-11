export const ITEMS_PER_PAGE = 10;

export interface QuotientFactors {
  id: number,
  name: string,
  value: number,
};

export interface QuotientFactorsError extends QuotientFactors {
  error: boolean
};

interface QuotientFactorsBoolean extends QuotientFactors {
  paramNeeded: boolean
}

interface CandidateDescription {
  name: string,
  description: string,
  photo: string
};

interface CandidatePersonalDetails {
  gender: 'M' | 'F',
  exp: string,
  curr_ctc: string
}

interface CandidateContactInfo {
  phone_no: string,
  email: string,
  social: string,
}

export interface AQ extends QuotientFactors { }
export interface EF extends QuotientFactors { }
export interface SF extends QuotientFactors { }
export interface IF extends QuotientFactors { }

export interface AQError extends QuotientFactorsError { }
export interface EFError extends QuotientFactorsError { }
export interface SFError extends QuotientFactorsError { }
export interface IFError extends QuotientFactorsError { }

export interface AQBoolean extends QuotientFactorsBoolean { }
export interface EFBoolean extends QuotientFactorsBoolean { }
export interface SFBoolean extends QuotientFactorsBoolean { }
export interface IFBoolean extends QuotientFactorsBoolean { }

export interface CandidateInfo extends CandidateDescription, CandidatePersonalDetails, CandidateContactInfo {
  key_points: string[],
  exp_achi: string[],
  inteli_fact: {
    id: number,
    parameters: QuotientFactors[]
  },
  emotional_fact: {
    id: number,
    parameters: QuotientFactors[]
  },
  social_fact: {
    id: number,
    parameters: QuotientFactors[]
  },
  adversity_quotient: {
    id: number,
    parameters: QuotientFactors[]
  },
}

export type HandleCandidateInputChangeValue = (
  index: number,
  value: string | string[] | {
    id: number,
    parameters: QuotientFactors[] | []
  },
  field: string
) => void

export const IFArray = [
  {
    id: 1,
    name: "Problem Solving Ability",
    value: 0
  },
  {
    id: 2,
    name: "Innovation ability",
    value: 0
  },
  {
    id: 3,
    name: "Working Memory (Ability to hold & manipulate information for short periods)",
    value: 0
  },
  {
    id: 4,
    name: "Processing Speed",
    value: 0
  },
  {
    id: 5,
    name: "Relevant Years of Experience",
    value: 0
  },
  {
    id: 6,
    name: "Professional Pedigree: Organizations",
    value: 0
  },
  {
    id: 7,
    name: "Academic Pedigree: Education",
    value: 0
  },
  {
    id: 8,
    name: "JD Specific(Must have): Research(Publications)",
    value: 0
  },
  {
    id: 9,
    name: "JD Specific(Must have): Deep Learning Algorithms",
    value: 0
  },
];

export const AQArray = [
  {
    id: 1,
    name: "Conflict Management",
    value: 0
  },
  {
    id: 2,
    name: "Ability to handle stress",
    value: 0
  },
  {
    id: 3,
    name: "Ability to overcome challenges",
    value: 0
  }
];

export const EFArray = [
  {
    id: 1,
    name: "Self-Awareness (SWOT of self)",
    value: 0
  },
  {
    id: 2,
    name: "Motivation (Internal or External)",
    value: 0
  },
  {
    id: 3,
    name: "Empathy",
    value: 0
  },
  {
    id: 4,
    name: "Communication",
    value: 0
  },
  {
    id: 5,
    name: "People Management",
    value: 0
  },
  {
    id: 6,
    name: "Collaboration (working across cross-functional teams)",
    value: 0
  }
];

export const SFArray = [
  {
    id: 1,
    name: "Strength of Network",
    value: 0
  },
  {
    id: 2,
    name: "Ability to attract talent",
    value: 0
  }
];
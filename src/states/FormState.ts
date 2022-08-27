export interface IApplicantState {
  name: string;
  birthDate: Date | null;
  gender: string;
  phone: string;
  email: string;
  headline: string;
  maritalStatus: string;
  linkedIn: string;
  link: string;
  street: string;
  locality: string;
  city: { id: number; name: string };
  state: { id: number; name: string };
  country: { id: number; name: string };
  pinCode: string;
  skills: string;
}

export interface IEducationState {
  graduationId: number | string;
  graduationName: string;
  graduationInstitute: string;
  universityName: string;
  universityScore: number;
  dateOfJoining: Date | null;
  dateOfCompletion: Date | null;
}

export interface IExperienceState {
  employerName: string;
  designation: string;
  ctcDrawn: number;
  expYears: number;
  expMonths: number;
  domainSkills: string;
}

export interface IAttachmentState {
  resume: null;
  degree: null;
}
export interface IFormState {
  applicant: IApplicantState;
  education: IEducationState[];
  experience: IExperienceState[];
  attachments: IAttachmentState;
}

export const formState: IFormState = {
  applicant: {
    name: "",
    birthDate: null,
    gender: "",
    phone: "",
    email: "",
    headline: "",
    maritalStatus: "",
    linkedIn: "",
    link: "",
    street: "",
    locality: "",
    city: null,
    state: null,
    country: null,
    pinCode: "",
    skills: "",
  },
  education: [
    {
      graduationId: "",
      graduationName: "",
      graduationInstitute: "",
      universityName: "",
      universityScore: 0,
      dateOfJoining: null,
      dateOfCompletion: null,
    },
  ],
  experience: [
    {
      employerName: "",
      designation: "",
      ctcDrawn: 0,
      expYears: 0,
      expMonths: 0,
      domainSkills: "",
    },
  ],
  attachments: {
    resume: null,
    degree: null,
  },
};

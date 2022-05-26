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
  city: string;
  state: string;
  country: string;
  pinCode: string;
  skills: string;
}

export interface IEducationState {
  graduationName: string;
  graduationInstitute: string;
  graduation: string;
  universityName: string;
  universityScore: number;
  dateOfJoining: Date | null;
  dateOfCompletion: Date | null;
}

export interface IExperienceState {
  employerName: string;
  designation: string;
  ctcDrawn: 0;
  expYears: 0;
  expMonths: 0;
}

export interface IAttachmentState {
  resume: null;
  degree: null;
}
export interface IFormState {
  applicant: IApplicantState;
  education: IEducationState[];
  experience: IExperienceState;
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
    city: "",
    state: "",
    country: "",
    pinCode: "",
    skills: "",
  },
  education: [
    {
      graduationName: "",
      graduationInstitute: "",
      graduation: "",
      universityName: "",
      universityScore: 0,
      dateOfJoining: null,
      dateOfCompletion: null,
    },
  ],
  experience: {
    employerName: "",
    designation: "",
    ctcDrawn: 0,
    expYears: 0,
    expMonths: 0,
  },
  attachments: {
    resume: null,
    degree: null,
  },
};

import { proxy } from "valtio";

interface IFormState {
  applicant: {
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
  };
  education: {
    graduationName: string;
    graduationInstitute: string;
    graduation: string;
    universityName: string;
    universityScore: 0;
    yearOfJoining: Date | null;
    yearOfCompletion: Date | null;
  };
  experience: {
    employerName: string;
    designation: string;
    ctcDown: 0;
    expYears: 0;
    expMonths: 0;
  };
  attachments: {
    resume: Date | null;
    degree: Date | null;
  };
}

export const formState: IFormState = proxy({
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
  education: {
    graduationName: "",
    graduationInstitute: "",
    graduation: "",
    universityName: "",
    universityScore: 0,
    yearOfJoining: null,
    yearOfCompletion: null,
  },
  experience: {
    employerName: "",
    designation: "",
    ctcDown: 0,
    expYears: 0,
    expMonths: 0,
  },
  attachments: {
    resume: null,
    degree: null,
  },
});

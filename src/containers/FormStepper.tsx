import { useState } from "react";
import DesktopFormStepper from "../components/Steppers/DesktopFormStepper";
import MobileFormStepper from "../components/Steppers/MobileFormStepper";
import { useMobileView } from "../utils/ViewContext";
import ApplicantDetailsForm from "./Forms/ApplicantDetailsForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import ExperienceForm from "./Forms/ExperienceForm";
import AttachmentsForm from "./Forms/AttachmentsForm";
import { Paper } from "@mui/material";
import { formState } from "../states/FormState";

const paperStyles = {
  width: "80vw",
  margin: "50px auto",
  padding: "20px",
  borderRadius: 3,
};

function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const isMobile = useMobileView();

  const [values, setValues] = useState(formState);

  const [applicantErrors, setApplicantErrors] = useState<any>({});
  const [educationErrors, setEducationErrors] = useState<any>({});
  const [experienceErrors, setExperienceErrors] = useState<any>({});
  const [attachmentsErrors, setAttachmentsErrors] = useState<any>({});

  const steps = [
    {
      label: "Applicant Details",
      form: (
        <ApplicantDetailsForm
          values={values}
          setValues={setValues}
          errors={applicantErrors}
        />
      ),
    },
    {
      label: "Education Details",
      form: (
        <EducationDetailsForm
          values={values}
          setValues={setValues}
          errors={educationErrors}
        />
      ),
    },
    {
      label: "Experience",
      form: (
        <ExperienceForm
          values={values}
          setValues={setValues}
          errors={experienceErrors}
        />
      ),
    },
    {
      label: "Attachments",
      form: <AttachmentsForm />,
    },
  ];

  const validateApplicant = () => {
    let temp: any = {};

    temp.name = /^[A-Za-z\s]+$/.test(values.applicant.name)
      ? ""
      : "Invalid name";
    temp.birthDate =
      values.applicant.birthDate &&
      values.applicant.birthDate.getFullYear() <= new Date().getFullYear() - 18
        ? ""
        : "Must be 18 years or older";
    temp.gender = values.applicant.gender ? "" : "This field is required";
    temp.phone = /^[0-9]{10}$/.test(values.applicant.phone)
      ? ""
      : "Invalid phone";
    temp.email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.applicant.email
      )
        ? ""
        : "Invalid email";
    temp.headline = values.applicant.headline ? "" : "This field is required";
    temp.maritalStatus = values.applicant.maritalStatus
      ? ""
      : "This field is required";
    temp.street = /^[A-Za-z0-9,.\s]{1,20}$/.test(values.applicant.street)
      ? ""
      : "Invalid street";
    temp.locality = /^[A-Za-z0-9,.&\s]{1,25}$/.test(values.applicant.locality)
      ? ""
      : "Invalid locality";
    temp.city = values.applicant.city ? "" : "This field is required";
    temp.state = values.applicant.state ? "" : "This field is required";
    temp.country = values.applicant.country ? "" : "This field is required";
    temp.pinCode = /^[0-9]{6}$/.test(values.applicant.pinCode)
      ? ""
      : "Please enter 6 digits";
    temp.skills = /^[A-Za-z0-9,.#+\s]{1,100}$/.test(values.applicant.skills)
      ? ""
      : "Please enter skills seperated by commas";

    setApplicantErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  const validateEducation = () => {
    let temp: any = {};

    temp.graduationName = values.education.graduationName
      ? ""
      : "This field is required";
    temp.graduationInstitute = values.education.graduationInstitute
      ? ""
      : "This field is required";
    temp.graduation = values.education.graduation
      ? ""
      : "This field is required";
    temp.universityName = values.education.universityName
      ? ""
      : "This field is required";
    temp.universityScore =
      values.education.universityScore >= 0 &&
      values.education.universityScore <= 100
        ? ""
        : "Invalid number";
    temp.dateOfJoining = values.education.dateOfJoining
      ? ""
      : "This field is required";
    temp.dateOfCompletion =
      values.education.dateOfCompletion &&
      values.education.dateOfJoining &&
      values.education.dateOfCompletion > values.education.dateOfJoining
        ? ""
        : "Completion date must be after joining date";

    setEducationErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  const validateExperience = () => {
    let temp: any = {};

    temp.employerName = /^[A-Za-z0-9,.\s]+$/.test(
      values.experience.employerName
    )
      ? ""
      : "Must contain alphanumeric";
    temp.designation = /^[A-Za-z\s]+$/.test(values.experience.designation)
      ? ""
      : "Must contain only alphabets";
    temp.ctcDrawn = /^[0-9]+$/.test(values.experience.ctcDrawn.toString())
      ? ""
      : "Invalid number";

    temp.expYears = /^[0-9]+$/.test(values.experience.expYears.toString())
      ? ""
      : "Invalid number";

    temp.expMonths = /^[0-9]+$/.test(values.experience.expMonths.toString())
      ? ""
      : "Invalid number";

    setExperienceErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  const validateAttachments = () => {
    let temp: any = {};

    temp.resume = values.attachments.resume ? "" : "This field is required";
    temp.degree = values.attachments.degree ? "" : "This field is required";

    setAttachmentsErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleNext = () => {
    if (activeStep === 0) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 1) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2 && validateExperience())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 3 && validateAttachments())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper elevation={4} sx={paperStyles}>
      {isMobile ? (
        <MobileFormStepper
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ) : (
        <DesktopFormStepper
          steps={steps}
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
    </Paper>
  );
}

export default FormStepper;

import { useState } from "react";
import DesktopFormStepper from "../components/Steppers/DesktopFormStepper";
import MobileFormStepper from "../components/Steppers/MobileFormStepper";
import { useMobileView } from "../utils/ViewContext";
import ApplicantDetailsForm from "./Forms/ApplicantDetailsForm";
import EducationDetailsContainer from "./Forms/EducationDetailsContainer";
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
  const [educationErrors, setEducationErrors] = useState<any[]>([{}]);
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
        <EducationDetailsContainer
          values={values}
          setValues={setValues}
          errors={educationErrors}
          setErrors={setEducationErrors}
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

    temp.name = values.applicant.name ? "" : "This field is required";
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
    temp.street = /^.{1,20}$/.test(values.applicant.street)
      ? ""
      : "Invalid street";
    temp.locality = /^.{1,25}$/.test(values.applicant.locality)
      ? ""
      : "Invalid locality";
    temp.city = values.applicant.city ? "" : "This field is required";
    temp.state = values.applicant.state ? "" : "This field is required";
    temp.country = values.applicant.country ? "" : "This field is required";
    temp.pinCode = /^[0-9]{6}$/.test(values.applicant.pinCode)
      ? ""
      : "Please enter 6 digits";
    temp.skills = /^.{1,100}$/.test(values.applicant.skills)
      ? ""
      : "Please enter skills seperated by commas";

    setApplicantErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  const validateEducation = () => {
    let flag = true;

    values.education.forEach((obj, index) => {
      let temp: any = {};

      temp.graduation = obj.graduation ? "" : "This field is required";
      temp.graduationName = obj.graduationName ? "" : "This field is required";
      temp.graduationInstitute = obj.graduationInstitute
        ? ""
        : "This field is required";
      temp.universityName = obj.universityName ? "" : "This field is required";
      temp.universityScore =
        /^[0-9]+$/.test(obj.universityScore.toString()) &&
        obj.universityScore >= 0 &&
        obj.universityScore <= 100
          ? ""
          : "Invalid percentage";
      temp.dateOfJoining = obj.dateOfJoining ? "" : "This field is required";
      temp.dateOfCompletion =
        obj.dateOfJoining &&
        obj.dateOfCompletion &&
        obj.dateOfCompletion >= obj.dateOfJoining
          ? ""
          : "Completion date must be after joining date";

      setEducationErrors((prev) =>
        prev.map((o, i) => {
          if (i === index) {
            return temp;
          }
          return o;
        })
      );

      if (!Object.values(temp).every((x) => x === "")) {
        flag = false;
      }
    });

    return flag;
  };
  const validateExperience = () => {
    let temp: any = {};

    temp.employerName = values.experience.employerName
      ? ""
      : "This field is required";
    temp.designation = values.experience.designation
      ? ""
      : "This field is required";
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
    if (activeStep === 1 && validateEducation())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

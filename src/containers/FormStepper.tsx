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
import { useSnapshot } from "valtio";

const paperStyles = {
  width: "80vw",
  margin: "50px auto",
  padding: "20px",
  borderRadius: 3,
};

let initApplicantErrorValues: any = {};
for (const key in formState.applicant) initApplicantErrorValues[key] = "";

function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const isMobile = useMobileView();
  const { applicant } = useSnapshot(formState);

  const [applicantErrors, setApplicantErrors] = useState(
    initApplicantErrorValues
  );

  const steps = [
    {
      label: "Applicant Details",
      form: <ApplicantDetailsForm errors={applicantErrors} />,
    },
    {
      label: "Education Details",
      form: <EducationDetailsForm />,
    },
    {
      label: "Experience",
      form: <ExperienceForm />,
    },
    {
      label: "Attachments",
      form: <AttachmentsForm />,
    },
  ];

  const validateApplicant = () => {
    let temp = initApplicantErrorValues;
    temp.name = applicant.name ? "" : "This field is required";
    temp.birthDate = applicant.birthDate ? "" : "This field is required";
    temp.gender = applicant.gender ? "" : "This field is required";
    temp.phone = /^[0-9]{10}$/.test(applicant.phone) ? "" : "Invalid phone";
    temp.email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        applicant.email
      )
        ? ""
        : "Invalid email";
    temp.headline = applicant.headline ? "" : "This field is required";
    temp.maritalStatus = applicant.maritalStatus
      ? ""
      : "This field is required";
    temp.street = applicant.street ? "" : "This field is required";
    temp.locality = applicant.locality ? "" : "This field is required";
    temp.city = applicant.city ? "" : "This field is required";
    temp.state = applicant.state ? "" : "This field is required";
    temp.country = applicant.country ? "" : "This field is required";
    temp.pinCode = applicant.pinCode ? "" : "This field is required";
    temp.skills = applicant.skills ? "" : "This field is required";

    setApplicantErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleNext = () => {
    if (activeStep === 0 && validateApplicant())
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

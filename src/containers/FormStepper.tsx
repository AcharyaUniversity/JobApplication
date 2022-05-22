import { useState } from "react";
import DesktopFormStepper from "../components/Steppers/DesktopFormStepper";
import MobileFormStepper from "../components/Steppers/MobileFormStepper";
import { useMobileView } from "../utils/ViewContext";
import ApplicationDetailsForm from "./Forms/ApplicationDetailsForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import ExperienceForm from "./Forms/ExperienceForm";
import AttachmentsForm from "./Forms/AttachmentsForm";
import { Paper } from "@mui/material";

const paperStyles = {
  width: "90vw",
  margin: "50px auto",
  padding: "20px",
  borderRadius: 3,
};

const steps = [
  {
    label: "Application Details",
    form: <ApplicationDetailsForm />,
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

function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const isMobile = useMobileView();

  const handleNext = () => {
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

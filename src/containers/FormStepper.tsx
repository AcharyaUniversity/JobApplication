import { useState } from "react";
import DesktopFormStepper from "../components/DesktopFormStepper";
import MobileFormStepper from "../components/MobileFormStepper";
import { useMobileView } from "../utils/ViewContext";
import ApplicationDetailsForm from "../components/Forms/ApplicationDetailsForm";
import EducationDetailsForm from "../components/Forms/EducationDetailsForm";
import ExperienceForm from "../components/Forms/ExperienceForm";
import AttachmentsForm from "../components/Forms/AttachmentsForm";

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

  if (isMobile)
    return (
      <MobileFormStepper
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    );
  else
    return (
      <DesktopFormStepper
        steps={steps}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    );
}

export default FormStepper;

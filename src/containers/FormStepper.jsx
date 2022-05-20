import React from "react";
import DesktopFormStepper from "./DesktopFormStepper";
import MobileFormStepper from "./MobileFormStepper";
import { useMobileView } from "../utils/ViewContext";

function FormStepper() {
  const isMobile = useMobileView();

  if (isMobile) return <MobileFormStepper />;
  return <DesktopFormStepper />;
}

export default FormStepper;

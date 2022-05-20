import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  steps: { label: string; description: string }[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
}

function DesktopStepper({ steps, activeStep, handleNext, handleBack }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((obj, index) => {
          const stepProps: { completed?: boolean } = {};

          return (
            <Step key={index} {...stepProps}>
              <StepLabel>{obj.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {/* <Box sx={{ height: 255, maxWidth: 400, width: "100%", p: 2 }}>
              {steps[activeStep].description}
            </Box> */}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default DesktopStepper;

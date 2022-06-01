import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Theme,
} from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LocalPoliceRoundedIcon from "@mui/icons-material/LocalPoliceRounded";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import Complete from "../Complete";

interface Props {
  steps: { label: string; form: JSX.Element }[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  stepperContainer: {
    padding: "10px 30px",
  },
  nextButton: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
  },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    borderRadius: 5,
    backgroundColor: "grey",
    transition: "all 0.2s linear",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      backgroundColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      backgroundColor: theme.palette.success.main,
    },
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: "#fff",
  zIndex: 1,
  color: theme.palette.primary.main,
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.5s ease",
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    boxShadow: "0 5px 10px 2px rgba(0,0,0,.2)",
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <PersonAddAltRoundedIcon />,
    2: <SchoolRoundedIcon />,
    3: <LocalPoliceRoundedIcon />,
    4: <FilePresentRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

function DesktopStepper({ steps, activeStep, handleNext, handleBack }: Props) {
  const classes = useStyles();

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        className={classes.stepperContainer}
        color="success"
        connector={<ColorlibConnector />}
      >
        {steps.map((obj) => (
          <Step key={obj.label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {obj.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Complete />
      ) : (
        <>
          <Box sx={{ width: "100%", p: 2 }}>{steps[activeStep].form}</Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, borderRadius: 2 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              className={classes.nextButton}
              variant="contained"
              onClick={handleNext}
              sx={{ borderRadius: 2 }}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default DesktopStepper;

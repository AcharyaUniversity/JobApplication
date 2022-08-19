import {
  Theme,
  Box,
  MobileStepper,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@mui/styles";
import Complete from "../Complete";

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    margin: "auto !important",
    fontFamily: "Roboto !important",
    fontSize: "1.6rem !important",
    color: theme.palette.primary.dark,
  },
  nextButton: {
    backgroundColor: `${theme.palette.secondary.main} !important`,
  },
}));

interface Props {
  steps: { label: string; form: JSX.Element }[];
  activeStep: number;
  loading: boolean;
  refNumber: string;
  handleNext: () => void;
  handleBack: () => void;
}

function MobileFormStepper({
  steps,
  activeStep,
  loading,
  refNumber,
  handleNext,
  handleBack,
}: Props) {
  const theme = useTheme();

  const classes = useStyles();

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      {activeStep === steps.length ? (
        <Complete loading={loading} refNumber={refNumber} />
      ) : (
        <>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 2,
              bgcolor: "transparent",
            }}
          >
            <Typography className={classes.label}>
              {steps[activeStep].label}
            </Typography>
          </Paper>
          <Box sx={{ width: "100%", p: 2 }}>{steps[activeStep].form}</Box>
          <MobileStepper
            variant="text"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            style={{ backgroundColor: "transparent" }}
            nextButton={
              <Button
                variant="contained"
                className={classes.nextButton}
                size="small"
                onClick={handleNext}
                disabled={activeStep === steps.length}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ borderRadius: 2 }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </>
      )}
    </Box>
  );
}

export default MobileFormStepper;

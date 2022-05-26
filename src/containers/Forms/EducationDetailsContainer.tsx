import { Dispatch, SetStateAction, useState } from "react";
import { Box, Grid, Button, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EducationDetailsForm from "./EducationDetailsForm";
import { IFormState } from "../../states/FormState";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  values: IFormState;
  setValues: Dispatch<SetStateAction<IFormState>>;
  errors: any[];
  setErrors: Dispatch<SetStateAction<any[]>>;
}

const useStyles = makeStyles(() => ({
  formContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "17px !important",
    padding: "20px",
  },
}));

const initValues = {
  graduationName: "",
  graduationInstitute: "",
  graduation: "",
  universityName: "",
  universityScore: 0,
  dateOfJoining: null,
  dateOfCompletion: null,
};

function EducationDetailsContainer({
  values,
  setValues,
  errors,
  setErrors,
}: Props) {
  const classes = useStyles();

  const handleAdd = () => {
    setValues({
      ...values,
      education: values.education.concat(initValues),
    });
    setErrors(errors.concat({}));
  };

  const handleRemove = (index: number) => {
    let array: any[] = values.education;
    array.splice(index, 1);

    setValues({
      ...values,
      education: array,
    });

    array = errors;
    array.splice(index, 1);
    setErrors(array);
  };

  return (
    <>
      <Grid container justifyContent="flex-end" rowSpacing={4} mt={0}>
        {values.education.map((obj, index) => (
          <Grid key={index} item xs={12}>
            <Paper elevation={4} className={classes.formContainer}>
              <Grid container>
                <Grid item xs={10} style={{ paddingLeft: 10 }}>
                  <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>
                    Education Details
                  </p>
                </Grid>
                <Grid item xs={2} textAlign="right">
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      borderRadius: 2,
                      minWidth: "40px",
                      padding: 0,
                      minHeight: "35px",
                      margin: "10px 0",
                    }}
                    disabled={values.education.length <= 1}
                    onClick={() => handleRemove(index)}
                  >
                    <RemoveIcon />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <EducationDetailsForm
                    values={values}
                    setValues={setValues}
                    index={index}
                    errors={errors}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={2} textAlign="right">
          <Button
            onClick={handleAdd}
            variant="contained"
            color="success"
            sx={{ borderRadius: 2 }}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EducationDetailsContainer;

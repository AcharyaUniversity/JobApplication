import { Dispatch, SetStateAction, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import { makeStyles } from "@mui/styles";
import CustomDatePicker from "../../components/Inputs/CustomDatePicker";
import CustomSelect from "../../components/Inputs/CustomSelect";
import { IFormState } from "../../states/FormState";

interface Props {
  values: IFormState;
  setValues: Dispatch<SetStateAction<IFormState>>;
  errors: any;
}

const useStyles = makeStyles(() => ({
  form: {
    padding: "10px 0",
  },
}));

function ExperienceForm({ values, setValues, errors }: Props) {
  const classes = useStyles();

  const handleChange = (e: any) => {
    setValues({
      ...values,
      education: {
        ...values.education,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Box component="form" className={classes.form}>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        rowSpacing={4}
        columnSpacing={{ xs: 2, md: 4 }}
      >
        {/* first row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="graduationName"
              value={values.education.graduationName}
              handleChange={handleChange}
              fullWidth
              label="Graduation Name"
              error={errors.graduationName}
              required
            />
          </Grid>
        </>
      </Grid>
    </Box>
  );
}

export default ExperienceForm;

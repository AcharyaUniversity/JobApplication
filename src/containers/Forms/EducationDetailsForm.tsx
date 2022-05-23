import { Dispatch, SetStateAction, useState } from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
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

function EducationDetailsForm({ values, setValues, errors }: Props) {
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
        rowSpacing={2}
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
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="graduationInstitute"
              value={values.education.graduationInstitute}
              handleChange={handleChange}
              fullWidth
              label="Graduation Institute"
              error={errors.graduationInstitute}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="graduation"
              label="Graduation"
              value={values.education.graduation}
              items={[
                { value: "Value 1", label: "Value 1" },
                { value: "Value 2", label: "Value 2" },
                { value: "Value 3", label: "Value 3" },
                { value: "Value 4", label: "Value 4" },
              ]}
              handleChange={handleChange}
              required
              error={errors.graduation}
            />
          </Grid>
        </>

        {/* second row */}
        <>
          <Grid item xs={12} md={8}>
            <CustomTextField
              name="universityName"
              value={values.education.universityName}
              handleChange={handleChange}
              fullWidth
              label="University Name"
              error={errors.universityName}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="universityScore"
              value={values.education.universityScore}
              handleChange={handleChange}
              fullWidth
              label="University Score (in %)"
              error={errors.universityScore}
              required
            />
          </Grid>
        </>

        {/* 3rd row */}
        <>
          <Grid item xs={12} md={6}>
            <CustomDatePicker
              value={values.education.yearOfJoining}
              handleChange={(val: Date | null) =>
                setValues({
                  ...values,
                  education: { ...values.education, yearOfJoining: val },
                })
              }
              label="Year of Joining"
              error={errors.yearOfJoining}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDatePicker
              value={values.education.yearOfCompletion}
              handleChange={(val: Date | null) =>
                setValues({
                  ...values,
                  education: { ...values.education, yearOfCompletion: val },
                })
              }
              label="Year of Completion"
              error={errors.yearOfCompletion}
            />
          </Grid>
        </>
      </Grid>
    </Box>
  );
}

export default EducationDetailsForm;

import { Dispatch, SetStateAction } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import { makeStyles } from "@mui/styles";
import { IFormState } from "../../states/FormState";

interface Props {
  values: IFormState;
  setValues: Dispatch<SetStateAction<IFormState>>;
  index: number;
  errors: any;
}

const useStyles = makeStyles(() => ({
  form: {
    padding: "10px 0",
  },
}));

function ExperienceForm({ values, setValues, index, errors }: Props) {
  const classes = useStyles();

  const handleChange = (e: any) => {
    setValues((prev) => ({
      ...prev,
      experience: prev.experience.map((obj, i) => {
        if (i === index) return { ...obj, [e.target.name]: e.target.value };
        return obj;
      }),
    }));
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
          <Grid item xs={12} md={6}>
            <CustomTextField
              name="employerName"
              value={values.experience[index].employerName}
              handleChange={handleChange}
              fullWidth
              label="Employer Name"
              error={errors.employerName}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextField
              name="designation"
              value={values.experience[index].designation}
              handleChange={handleChange}
              fullWidth
              label="Designation"
              error={errors.designation}
              required
            />
          </Grid>
        </>

        {/* second row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="ctcDrawn"
              value={values.experience[index].ctcDrawn}
              handleChange={handleChange}
              fullWidth
              label="CTC Drawn (per month)"
              error={errors.ctcDrawn}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="expYears"
              value={values.experience[index].expYears}
              handleChange={handleChange}
              fullWidth
              label="Experience (years)"
              error={errors.expYears}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="expMonths"
              value={values.experience[index].expMonths}
              handleChange={handleChange}
              fullWidth
              label="Experience (months)"
              error={errors.expMonths}
              required
            />
          </Grid>
        </>

        {/* third row */}
        <Grid item xs={12}>
          <CustomTextField
            multiline
            rows={3}
            name="domainSkills"
            value={values.experience[index].domainSkills}
            handleChange={handleChange}
            fullWidth
            label="Nature of Work"
            required
            error={errors.domainSkills}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ExperienceForm;

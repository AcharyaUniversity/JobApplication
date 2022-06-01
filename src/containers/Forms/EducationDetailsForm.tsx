import { Dispatch, SetStateAction } from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomDatePicker from "../../components/Inputs/CustomDatePicker";
import CustomSelect from "../../components/Inputs/CustomSelect";
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

function EducationDetailsForm({ values, setValues, index, errors }: Props) {
  const classes = useStyles();

  const handleChange = (e: any) => {
    setValues((prev) => ({
      ...prev,
      education: prev.education.map((obj, i) => {
        if (i === index) return { ...obj, [e.target.name]: e.target.value };
        return obj;
      }),
    }));
  };

  const handleDateChange = (key: string, val: Date | null) => {
    setValues((prev) => ({
      ...prev,
      education: prev.education.map((obj, i) => {
        if (i === index) return { ...obj, [key]: val };
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
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="graduation"
              label="Graduation"
              value={values.education[index].graduation}
              items={[
                { value: "IIT", label: "IIT" },
                { value: "Diploma", label: "Diploma" },
                { value: "UG", label: "UG" },
                { value: "PG", label: "PG" },
                { value: "Ph.D.", label: "Ph.D." },
                { value: "NET/SLET", label: "NET/SLET" },
                { value: "MPhil", label: "MPhil" },
                { value: "Other", label: "Other" },
              ]}
              handleChange={handleChange}
              required
              error={errors.graduation}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="graduationName"
              value={values.education[index].graduationName}
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
              value={values.education[index].graduationInstitute}
              handleChange={handleChange}
              fullWidth
              label="Graduation Institute"
              error={errors.graduationInstitute}
              required
            />
          </Grid>
        </>

        {/* second row */}
        <>
          <Grid item xs={12} md={8}>
            <CustomTextField
              name="universityName"
              value={values.education[index].universityName}
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
              value={values.education[index].universityScore}
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
              value={values.education[index].dateOfJoining}
              handleChange={(val: Date | null) =>
                handleDateChange("dateOfJoining", val)
              }
              label="Date of Joining"
              error={errors.dateOfJoining}
              maxDate={new Date()}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomDatePicker
              value={values.education[index].dateOfCompletion}
              handleChange={(val: Date | null) =>
                handleDateChange("dateOfCompletion", val)
              }
              label="Date of Completion"
              error={errors.dateOfCompletion}
              minDate={values.education[index].dateOfJoining}
              maxDate={new Date()}
            />
          </Grid>
        </>
      </Grid>
    </Box>
  );
}

export default EducationDetailsForm;

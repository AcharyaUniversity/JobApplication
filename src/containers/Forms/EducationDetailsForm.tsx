import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../components/Inputs/CustomTextField";
import CustomDatePicker from "../../components/Inputs/CustomDatePicker";
import CustomSelect from "../../components/Inputs/CustomSelect";
import { IFormState } from "../../states/FormState";
import axios from "axios";

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
  const [graduationTypes, setGraduationTypes] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  const classes = useStyles();

  // get graduation types
  useEffect(() => {
    axios(
      "https://api-prod-acharyainstitutes.in/Acharya_University_Mess/api/employee/graduation"
    )
      .then((res) => {
        setGraduationTypes(
          res.data.data.map((obj: any) => ({
            value: obj.graduation_id,
            label: obj.graduation_name,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

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
              name="graduationId"
              label="Graduation"
              value={values.education[index].graduationId}
              items={graduationTypes}
              handleChange={handleChange}
              required
              error={errors.graduationId}
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

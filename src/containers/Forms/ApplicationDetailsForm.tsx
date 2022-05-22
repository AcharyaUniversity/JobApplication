import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import { makeStyles } from "@mui/styles";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomRadioButtons from "../../components/CustomRadioButtons";
import CustomSelect from "../../components/CustomSelect";

interface IValues {
  name: string;
  birthDate: Date | null;
  gender: string;
  phone: string;
  email: string;
  headline: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  skills: string;
  linkedIn?: string;
  link?: string;
}

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "10px 0",
  },
}));

function ApplicationDetailsForm() {
  const classes = useStyles();

  const [values, setValues] = useState<IValues>({
    name: "",
    birthDate: null,
    gender: "",
    phone: "",
    email: "",
    headline: "",
    street: "",
    locality: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    skills: "",
    linkedIn: "",
    link: "",
  });

  const handleFieldChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDateChange = (value: Date | null) => {
    setValues({ ...values, birthDate: value });
  };

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  return (
    <Box component="form" className={classes.form}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        rowSpacing={4}
        columnSpacing={{ xs: 2, md: 4 }}
      >
        {/* first row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="name"
              value={values.name}
              handleChange={handleFieldChange}
              fullWidth
              label="Name"
              helperText="As per SSC certificate"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomDatePicker
              value={values.birthDate}
              handleChange={handleDateChange}
              label="Date of Birth"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomRadioButtons
              name="gender"
              label="Gender"
              value={values.gender}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              handleChange={handleFieldChange}
            />
          </Grid>
        </>

        {/* second row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="phone"
              value={values.phone}
              handleChange={handleFieldChange}
              fullWidth
              label="Mobile number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="email"
              value={values.email}
              handleChange={handleFieldChange}
              fullWidth
              label="Email ID"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomRadioButtons
              name="headline"
              label="Resume Headline"
              value={values.headline}
              options={[
                { value: "Teaching", label: "Teaching" },
                { value: "Non-teaching", label: "Non-teaching" },
              ]}
              handleChange={handleFieldChange}
            />
          </Grid>
        </>

        {/* 3rd row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="street"
              value={values.street}
              handleChange={handleFieldChange}
              fullWidth
              label="Street"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="locality"
              value={values.locality}
              handleChange={handleFieldChange}
              fullWidth
              label="Locality"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="city"
              label="City"
              value={values.city}
              items={[
                { value: "Bangalore", label: "Bangalore" },
                { value: "Mumbai", label: "Mumbai" },
                { value: "Delhi", label: "Delhi" },
                { value: "Hyderabad", label: "Hyderabad" },
              ]}
              handleChange={handleFieldChange}
            />
          </Grid>
        </>
      </Grid>
    </Box>
  );
}

export default ApplicationDetailsForm;

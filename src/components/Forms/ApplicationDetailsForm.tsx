import { useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../CustomTextField";
import { makeStyles } from "@mui/styles";
import CustomDatePicker from "../CustomDatePicker";

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

  return (
    <Box component="form" className={classes.form}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Box>
  );
}

export default ApplicationDetailsForm;

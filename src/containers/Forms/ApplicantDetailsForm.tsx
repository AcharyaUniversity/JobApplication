import { Dispatch, SetStateAction, useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import { makeStyles } from "@mui/styles";
import CustomDatePicker from "../../components/Inputs/CustomDatePicker";
import CustomRadioButtons from "../../components/Inputs/CustomRadioButtons";
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

function ApplicantDetailsForm({ values, setValues, errors }: Props) {
  const classes = useStyles();

  const handleChange = (e: any) => {
    setValues((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleDateChange = (key: string, val: Date | null) => {
    setValues((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        [key]: val,
      },
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
            <CustomTextField
              name="name"
              value={values.applicant.name}
              handleChange={handleChange}
              fullWidth
              label="Name"
              helperText="As per aadhaar card"
              error={errors.name}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomDatePicker
              value={values.applicant.birthDate}
              handleChange={(val: Date | null) =>
                handleDateChange("birthDate", val)
              }
              label="Date of Birth"
              error={errors.birthDate}
              maxDate={new Date(`12/31/${new Date().getFullYear() - 18}`)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomRadioButtons
              name="gender"
              label="Gender"
              value={values.applicant.gender}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              handleChange={handleChange}
              required
              error={errors.gender}
            />
          </Grid>
        </>

        {/* second row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="phone"
              value={values.applicant.phone}
              handleChange={handleChange}
              fullWidth
              label="Mobile number"
              required
              error={errors.phone}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="email"
              value={values.applicant.email}
              handleChange={handleChange}
              fullWidth
              label="Email ID"
              required
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomRadioButtons
              name="headline"
              label="Resume Headline"
              value={values.applicant.headline}
              options={[
                { value: "Teaching", label: "Teaching" },
                { value: "Non-teaching", label: "Non-teaching" },
              ]}
              handleChange={handleChange}
              required
              error={errors.headline}
            />
          </Grid>
        </>

        {/* 3rd row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="maritalStatus"
              label="Marital Status"
              value={values.applicant.maritalStatus}
              items={[
                { value: "Married", label: "Married" },
                { value: "Unmarried", label: "Unmarried" },
                { value: "Divorced", label: "Divorced" },
                { value: "Widow", label: "Widow" },
                { value: "Widower", label: "Widower" },
              ]}
              handleChange={handleChange}
              required
              error={errors.maritalStatus}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="linkedIn"
              value={values.applicant.linkedIn}
              handleChange={handleChange}
              fullWidth
              label="LinkedIn URL"
              error={errors.linkedIn}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="link"
              value={values.applicant.link}
              handleChange={handleChange}
              fullWidth
              label="Link"
              placeholder="e.g.: git, drive"
              error={errors.link}
            />
          </Grid>
        </>

        {/* 4th row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="street"
              value={values.applicant.street}
              handleChange={handleChange}
              fullWidth
              label="Street"
              required
              error={errors.street}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="locality"
              value={values.applicant.locality}
              handleChange={handleChange}
              fullWidth
              label="Locality"
              required
              error={errors.locality}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="city"
              label="City"
              value={values.applicant.city}
              items={[
                { value: "Bangalore", label: "Bangalore" },
                { value: "Mumbai", label: "Mumbai" },
                { value: "Delhi", label: "Delhi" },
                { value: "Hyderabad", label: "Hyderabad" },
              ]}
              handleChange={handleChange}
              required
              error={errors.city}
            />
          </Grid>
        </>

        {/* 5th row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="state"
              label="State"
              value={values.applicant.state}
              items={[
                { value: "Karnataka", label: "Karnataka" },
                { value: "Maharashtra", label: "Maharashtra" },
                { value: "Bihar", label: "Bihar" },
                { value: "Andhra Pradesh", label: "Andhra Pradesh" },
              ]}
              handleChange={handleChange}
              required
              error={errors.state}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="country"
              label="Country"
              value={values.applicant.country}
              items={[
                { value: "India", label: "India" },
                {
                  value: "United Arab Emirates",
                  label: "United Arab Emirates",
                },
                {
                  value: "United States of America",
                  label: "United States of America",
                },
                { value: "Qatar", label: "Qatar" },
              ]}
              handleChange={handleChange}
              required
              error={errors.country}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="pinCode"
              value={values.applicant.pinCode}
              handleChange={handleChange}
              fullWidth
              label="Pincode"
              required
              error={errors.pinCode}
            />
          </Grid>
        </>

        {/* 6th row */}
        <Grid item xs={12}>
          <CustomTextField
            name="skills"
            value={values.applicant.skills}
            handleChange={handleChange}
            fullWidth
            label="Key Skills - Domain area"
            required
            error={errors.skills}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ApplicantDetailsForm;

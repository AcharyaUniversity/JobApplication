import { useState } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import { makeStyles } from "@mui/styles";
import CustomDatePicker from "../../components/Inputs/CustomDatePicker";
import CustomRadioButtons from "../../components/Inputs/CustomRadioButtons";
import CustomSelect from "../../components/Inputs/CustomSelect";
import { formState } from "../../states/FormState";
import { useSnapshot } from "valtio";

interface Props {
  errors: any;
}

const useStyles = makeStyles(() => ({
  form: {
    padding: "10px 0",
  },
}));

function ApplicantDetailsForm({ errors }: Props) {
  const classes = useStyles();

  const { applicant } = useSnapshot(formState);

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
              name="name"
              value={applicant.name}
              handleChange={(e: any) =>
                (formState.applicant.name = e.target.value)
              }
              fullWidth
              label="Name"
              helperText="As per aadhaar card"
              error={errors.name}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomDatePicker
              value={applicant.birthDate}
              handleChange={(value: Date | null) =>
                (formState.applicant.birthDate = value)
              }
              label="Date of Birth"
              error={errors.birthDate}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomRadioButtons
              name="gender"
              label="Gender"
              value={applicant.gender}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              handleChange={(e: any) =>
                (formState.applicant.gender = e.target.value)
              }
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
              value={applicant.phone}
              handleChange={(e: any) =>
                (formState.applicant.phone = e.target.value)
              }
              fullWidth
              label="Mobile number"
              required
              error={errors.phone}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="email"
              value={applicant.email}
              handleChange={(e: any) =>
                (formState.applicant.email = e.target.value)
              }
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
              value={applicant.headline}
              options={[
                { value: "Teaching", label: "Teaching" },
                { value: "Non-teaching", label: "Non-teaching" },
              ]}
              handleChange={(e: any) =>
                (formState.applicant.headline = e.target.value)
              }
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
              value={applicant.maritalStatus}
              items={[
                { value: "Married", label: "Married" },
                { value: "Unmarried", label: "Unmarried" },
                { value: "Divorced", label: "Divorced" },
              ]}
              handleChange={(e: any) =>
                (formState.applicant.maritalStatus = e.target.value)
              }
              required
              error={errors.maritalStatus}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="linkedIn"
              value={applicant.linkedIn}
              handleChange={(e: any) =>
                (formState.applicant.linkedIn = e.target.value)
              }
              fullWidth
              label="LinkedIn URL"
              error={errors.linkedIn}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="link"
              value={applicant.link}
              handleChange={(e: any) =>
                (formState.applicant.link = e.target.value)
              }
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
              value={applicant.street}
              handleChange={(e: any) =>
                (formState.applicant.street = e.target.value)
              }
              fullWidth
              label="Street"
              required
              error={errors.street}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="locality"
              value={applicant.locality}
              handleChange={(e: any) =>
                (formState.applicant.locality = e.target.value)
              }
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
              value={applicant.city}
              items={[
                { value: "Bangalore", label: "Bangalore" },
                { value: "Mumbai", label: "Mumbai" },
                { value: "Delhi", label: "Delhi" },
                { value: "Hyderabad", label: "Hyderabad" },
              ]}
              handleChange={(e: any) =>
                (formState.applicant.city = e.target.value)
              }
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
              value={applicant.state}
              items={[
                { value: "Karnataka", label: "Karnataka" },
                { value: "Maharashtra", label: "Maharashtra" },
                { value: "Bihar", label: "Bihar" },
                { value: "Andhra Pradesh", label: "Andhra Pradesh" },
              ]}
              handleChange={(e: any) =>
                (formState.applicant.state = e.target.value)
              }
              required
              error={errors.state}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomSelect
              name="country"
              label="Country"
              value={applicant.country}
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
              handleChange={(e: any) =>
                (formState.applicant.country = e.target.value)
              }
              required
              error={errors.country}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="pinCode"
              value={applicant.pinCode}
              handleChange={(e: any) =>
                (formState.applicant.pinCode = e.target.value)
              }
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
            value={applicant.skills}
            handleChange={(e: any) =>
              (formState.applicant.skills = e.target.value)
            }
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

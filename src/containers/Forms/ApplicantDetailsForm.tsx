import { Box, Grid } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import { makeStyles } from "@mui/styles";
import CustomDatePicker from "../../components/Inputs/CustomDatePicker";
import CustomRadioButtons from "../../components/Inputs/CustomRadioButtons";
import CustomSelect from "../../components/Inputs/CustomSelect";
import { formState } from "../../states/FormState";
import { useSnapshot } from "valtio";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "10px 0",
  },
}));

function ApplicantDetailsForm() {
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
              helperText="As per SSC certificate"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomDatePicker
              value={applicant.birthDate}
              handleChange={(value: Date | null) =>
                (formState.applicant.birthDate = value)
              }
              label="Date of Birth"
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
            />
          </Grid>
        </>

        {/* 3rd row */}
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
            />
          </Grid>
        </>

        {/* 4th row */}
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
            />
          </Grid>
        </>

        {/* 5th row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomTextField
              name="skills"
              value={applicant.skills}
              handleChange={(e: any) =>
                (formState.applicant.skills = e.target.value)
              }
              fullWidth
              label="Skills"
              helperText="Domain area"
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
              helperText="Optional"
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
              helperText="Optional"
              placeholder="e.g.: git, drive"
            />
          </Grid>
        </>
      </Grid>
    </Box>
  );
}

export default ApplicantDetailsForm;

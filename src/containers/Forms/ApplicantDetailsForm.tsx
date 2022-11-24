import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CustomTextField from "../../components/Inputs/CustomTextField";
import { makeStyles } from "@mui/styles";
import CustomDatePicker from "../../components/Inputs/CustomDatePicker";
import CustomRadioButtons from "../../components/Inputs/CustomRadioButtons";
import CustomSelect from "../../components/Inputs/CustomSelect";
import CustomAutocomplete from "../../components/Inputs/CustomAutocomplete";
import { IFormState } from "../../states/FormState";

interface Props {
  values: IFormState;
  setValues: Dispatch<SetStateAction<IFormState>>;
  errors: any;
  countries: { id: number; name: string }[];
  setCountries: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
  states: { id: number; name: string }[];
  setStates: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
  cities: { id: number; name: string }[];
  setCities: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
}

const useStyles = makeStyles(() => ({
  form: {
    padding: "10px 0",
  },
}));

function ApplicantDetailsForm({
  values,
  setValues,
  errors,
  countries,
  setCountries,
  states,
  setStates,
  cities,
  setCities,
}: Props) {
  const classes = useStyles();

  const [country, setCountry] = useState<{ id: number; name: string }>(
    values.applicant.country
  );

  const [state, setState] = useState<{ id: number; name: string }>(
    values.applicant.state
  );

  const [city, setCity] = useState<{ id: number; name: string }>(
    values.applicant.city
  );

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

  // make countries array
  useEffect(() => {
    fetch(
      `https://api-prod-acharyainstitutes.in/Acharya_University_Mess/api/Country`
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(
          data.map((obj: any) => ({
            id: obj.country_id,
            name: obj.country_name,
          }))
        );
      });
  }, []);
  // make states array
  useEffect(() => {
    if (country)
      fetch(
        `https://api-prod-acharyainstitutes.in/Acharya_University_Mess/api/State1/${country.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setStates(
            data.map((obj: any) => ({ id: obj.state_id, name: obj.state_name }))
          );
        });
  }, [country]);
  // make cities array
  useEffect(() => {
    if (country && state)
      fetch(
        `https://api-prod-acharyainstitutes.in/Acharya_University_Mess/api/City1/${state.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(
            data.map((obj: any) => ({ id: obj.city_id, name: obj.city_name }))
          );
        });
  }, [country, state]);

  // update country, initialise state and city on country change
  useEffect(() => {
    if (country) {
      setValues((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          country: country,
          state: null,
          city: null,
        },
      }));
      setState(null);
      setStates([]);
      setCity(null);
      setCities([]);
    }
  }, [country]);
  // update state, initialise city on state change
  useEffect(() => {
    if (state) {
      setValues((prev) => ({
        ...prev,
        applicant: { ...prev.applicant, state: state, city: null },
      }));
      setCity(null);
      setCities([]);
    }
  }, [state]);
  // update city
  useEffect(() => {
    if (city)
      setValues((prev) => ({
        ...prev,
        applicant: { ...prev.applicant, city: city },
      }));
  }, [city]);

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
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
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
                { value: "M", label: "Married" },
                { value: "U", label: "Unmarried" },
                { value: "D", label: "Divorced" },
                { value: "W", label: "Widow" },
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
              label="House no. / Street"
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

        {/* 5th row */}
        <>
          <Grid item xs={12} md={4}>
            <CustomAutocomplete
              label="Country"
              options={countries}
              value={
                values.applicant.country ? values.applicant.country.name : ""
              }
              setValue={setCountry}
              required
              error={errors.country}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomAutocomplete
              label="State"
              options={states}
              value={values.applicant.state ? values.applicant.state.name : ""}
              setValue={setState}
              required={states.length > 0}
              error={errors.state}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomAutocomplete
              label="City"
              options={cities}
              value={values.applicant.city ? values.applicant.city.name : ""}
              setValue={setCity}
              required={cities.length > 0}
              error={errors.city}
            />
          </Grid>
        </>

        {/* 6th row */}
        <Grid item xs={12}>
          <CustomTextField
            multiline
            rows={3}
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

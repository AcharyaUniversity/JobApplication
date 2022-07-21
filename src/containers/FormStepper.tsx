import { useState } from "react";
import DesktopFormStepper from "../components/Steppers/DesktopFormStepper";
import MobileFormStepper from "../components/Steppers/MobileFormStepper";
import { useMobileView } from "../utils/ViewContext";
import ApplicantDetailsForm from "./Forms/ApplicantDetailsForm";
import AttachmentsForm from "./Forms/AttachmentsForm";
import MultipleFormsContainer from "./MultipleFormsContainer";
import { Paper, Theme } from "@mui/material";
import { formState } from "../states/FormState";
import { makeStyles } from "@mui/styles";
import axios from "axios";

interface ITempObj {
  [key: string]: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: "80vw",
    margin: "25px auto",
    padding: "20px",

    [theme.breakpoints.down("md")]: {
      width: "90vw",
    },
  },
}));

function FormStepper() {
  const isMobile = useMobileView();

  const [activeStep, setActiveStep] = useState(0);
  const [refNumber, setRefNumber] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState(formState);

  const [applicantErrors, setApplicantErrors] = useState<any>({});
  const [educationErrors, setEducationErrors] = useState<any[]>([{}]);
  const [experienceErrors, setExperienceErrors] = useState<any[]>([{}]);
  const [attachmentsErrors, setAttachmentsErrors] = useState<any>({});

  const [countries, setCountries] = useState<{ id: number; name: string }[]>(
    []
  );
  const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);

  const classes = useStyles();

  const steps = [
    {
      label: "Applicant Details",
      form: (
        <ApplicantDetailsForm
          values={values}
          setValues={setValues}
          errors={applicantErrors}
          countries={countries}
          setCountries={setCountries}
          states={states}
          setStates={setStates}
          cities={cities}
          setCities={setCities}
        />
      ),
    },
    {
      label: "Education Details",
      form: (
        <MultipleFormsContainer
          values={values}
          setValues={setValues}
          errors={educationErrors}
          setErrors={setEducationErrors}
          tab="education"
          initValues={{
            graduationId: "",
            graduationName: "",
            graduationInstitute: "",
            universityName: "",
            universityScore: 0,
            dateOfJoining: null,
            dateOfCompletion: null,
          }}
        />
      ),
    },
    {
      label: "Experience",
      form: (
        <MultipleFormsContainer
          values={values}
          setValues={setValues}
          errors={experienceErrors}
          setErrors={setExperienceErrors}
          tab="experience"
          initValues={{
            employerName: "",
            designation: "",
            ctcDrawn: 0,
            expYears: 0,
            expMonths: 0,
          }}
        />
      ),
    },
    {
      label: "Attachments",
      form: (
        <AttachmentsForm
          values={values}
          setValues={setValues}
          errors={attachmentsErrors}
        />
      ),
    },
  ];

  const validateApplicant = async () => {
    let temp: any = {};
    let exists: boolean;

    await axios
      .get(
        `https://www.stageapi-acharyainstitutes.in/api/employee/checkEmail/${values.applicant.email}`
      )
      .then((res) => {
        exists = res.data["Email Present"];
      })
      .catch((err) => console.error(err));

    temp.name = values.applicant.name ? "" : "This field is required";
    temp.birthDate =
      values.applicant.birthDate &&
      values.applicant.birthDate.getFullYear() <= new Date().getFullYear() - 18
        ? ""
        : "Must be 18 years or older";
    temp.gender = values.applicant.gender ? "" : "This field is required";
    temp.phone = /^[0-9]{10}$/.test(values.applicant.phone)
      ? ""
      : "Invalid phone";

    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        values.applicant.email
      )
    )
      temp.email = "Invalid email";
    else if (exists) temp.email = "Email already exists";
    else temp.email = "";

    temp.headline = values.applicant.headline ? "" : "This field is required";
    temp.maritalStatus = values.applicant.maritalStatus
      ? ""
      : "This field is required";
    temp.street = /^.{1,30}$/.test(values.applicant.street)
      ? ""
      : "Invalid street";
    temp.locality = /^.{1,30}$/.test(values.applicant.locality)
      ? ""
      : "Invalid locality";
    temp.country = values.applicant.country ? "" : "This field is required";
    temp.state =
      states.length === 0 || values.applicant.state
        ? ""
        : "This field is required";
    temp.city =
      cities.length === 0 || values.applicant.city
        ? ""
        : "This field is required";
    temp.pinCode = /^[0-9]{6}$/.test(values.applicant.pinCode)
      ? ""
      : "Please enter 6 digits";
    temp.skills = /^.{1,100}$/.test(values.applicant.skills)
      ? ""
      : "Please enter skills, upto 100 characters";

    setApplicantErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };
  const validateEducation = () => {
    let flag = true;

    values.education.forEach((obj, index) => {
      let temp: any = {};

      temp.graduationId = obj.graduationId ? "" : "This field is required";
      temp.graduationName = obj.graduationName ? "" : "This field is required";
      temp.graduationInstitute = obj.graduationInstitute
        ? ""
        : "This field is required";
      temp.universityName = obj.universityName ? "" : "This field is required";
      temp.universityScore =
        /^([0-9]*[.])?[0-9]+$/.test(obj.universityScore.toString()) &&
        obj.universityScore > 0 &&
        obj.universityScore <= 100
          ? ""
          : "Invalid percentage";
      temp.dateOfJoining = obj.dateOfJoining ? "" : "This field is required";
      temp.dateOfCompletion =
        obj.dateOfJoining &&
        obj.dateOfCompletion &&
        obj.dateOfCompletion >= obj.dateOfJoining
          ? ""
          : "Completion date must be after joining date";

      setEducationErrors((prev) =>
        prev.map((o, i) => {
          if (i === index) {
            return temp;
          }
          return o;
        })
      );

      if (!Object.values(temp).every((x) => x === "")) {
        flag = false;
      }
    });

    return flag;
  };
  const validateExperience = () => {
    let flag = true;
    values.experience.forEach((obj, index) => {
      let temp: any = {};
      temp.employerName = obj.employerName ? "" : "This field is required";
      temp.designation = obj.designation ? "" : "This field is required";
      temp.ctcDrawn = /^([0-9]*[.])?[0-9]+$/.test(obj.ctcDrawn.toString())
        ? ""
        : "Invalid number";
      temp.expYears = /^([0-9]*[.])?[0-9]+$/.test(obj.expYears.toString())
        ? ""
        : "Invalid number";
      temp.expMonths = /^([0-9]*[.])?[0-9]+$/.test(obj.expMonths.toString())
        ? ""
        : "Invalid number";
      setExperienceErrors((prev) =>
        prev.map((o, i) => {
          if (i === index) {
            return temp;
          }
          return o;
        })
      );
      if (!Object.values(temp).every((x) => x === "")) {
        flag = false;
      }
    });
    return flag;
  };
  const validateAttachments = () => {
    let temp: any = {};

    const res: any = values.attachments.resume;
    const deg: any = values.attachments.degree;
    temp.resume =
      res && res.name.endsWith(".pdf") && res.size < 2000000
        ? ""
        : "Please upload a PDF upto 2 MB";
    temp.degree =
      deg && deg.name.endsWith(".pdf") && deg.size < 2000000
        ? ""
        : "Please upload a PDF upto 2 MB";

    setAttachmentsErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  };

  const handleNext = async () => {
    if (activeStep === 0 && (await validateApplicant()))
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 1 && validateEducation())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2 && validateExperience())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 3 && validateAttachments()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    let tempObj: ITempObj = {};

    let jobId: number;

    // applicant details submit
    tempObj.active = 1;
    tempObj.city_id = values.applicant.city ? values.applicant.city.id : null;
    tempObj.country_id = values.applicant.country.id;
    tempObj.dateofbirth = `${values.applicant.birthDate.getDate()}-${
      values.applicant.birthDate.getMonth() + 1
    }-${values.applicant.birthDate.getFullYear()}`;
    tempObj.email = values.applicant.email;
    tempObj.firstname = values.applicant.name;
    tempObj.gender = values.applicant.gender;
    tempObj.key_skills = values.applicant.skills;
    tempObj.link = values.applicant.link;
    tempObj.linkedin_id = values.applicant.linkedIn;
    tempObj.locality = values.applicant.locality;
    tempObj.marital_status = values.applicant.maritalStatus;
    tempObj.mobile = values.applicant.phone;
    tempObj.pincode = values.applicant.pinCode;
    tempObj.resume_headline = values.applicant.headline;
    tempObj.state_id = values.applicant.state
      ? values.applicant.state.id
      : null;
    tempObj.street = values.applicant.street;

    console.log(tempObj);

    axios
      .post(
        "https://www.stageapi-acharyainstitutes.in/api/employee/JobProfile",
        tempObj
      )
      .then((res) => {
        jobId = res.data.job_id;
        submitEducation(jobId)
          .then(() => submitExperience(jobId))
          .then(() => submitResume(jobId))
          .then((res) => {
            console.log(res);
            if (res) setRefNumber(res.data);
            setLoading(false);
          })
          .then(() => submitDegree(jobId))
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const submitEducation = async (jobId: number) => {
    let tempArray: ITempObj[] = [];

    values.education.forEach((obj) => {
      let tempObj: ITempObj = {};

      tempObj.active = 1;
      tempObj.job_id = jobId;
      tempObj.academic_score = obj.universityScore;
      tempObj.academic_year_completed = `${obj.dateOfCompletion.getDate()}-${
        obj.dateOfCompletion.getMonth() + 1
      }-${obj.dateOfCompletion.getFullYear()}`;
      tempObj.academic_year_joining = `${obj.dateOfJoining.getDate()}-${
        obj.dateOfJoining.getMonth() + 1
      }-${obj.dateOfJoining.getFullYear()}`;
      tempObj.graduation_id = obj.graduationId;
      tempObj.graduation = obj.graduationName;
      tempObj.university = obj.universityName;
      tempObj.school = obj.graduationInstitute;

      tempArray.push(tempObj);
    });

    axios
      .post(
        "https://www.stageapi-acharyainstitutes.in/api/employee/EducationDetails",
        tempArray
      )
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  const submitExperience = async (jobId: number) => {
    let tempArray: ITempObj[] = [];

    values.experience.forEach((obj) => {
      let tempObj: ITempObj = {};

      tempObj.job_id = jobId;
      tempObj.annual_salary_lakhs = obj.ctcDrawn;
      tempObj.designation = obj.designation;
      tempObj.employer_name = obj.employerName;
      tempObj.exp_in_months = obj.expMonths;
      tempObj.exp_in_years = obj.expYears;

      tempArray.push(tempObj);
    });

    axios
      .post(
        "https://www.stageapi-acharyainstitutes.in/api/employee/ExperienceDetails",
        tempArray
      )
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  const submitResume = async (jobId: number) => {
    const formData = new FormData();

    formData.set("file", values.attachments.resume);
    formData.set("job_id", jobId.toString());

    return axios
      .post(
        "https://www.stageapi-acharyainstitutes.in/api/employee/JobUploadFile",
        formData
      )
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  const submitDegree = async (jobId: number) => {
    const formData = new FormData();

    formData.set("file", values.attachments.degree);
    formData.set("job_id", jobId.toString());

    axios
      .post(
        "https://www.stageapi-acharyainstitutes.in/api/employee/higherEducationUploadFile",
        formData
      )
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: 3 }} className={classes.paper}>
      {isMobile ? (
        <MobileFormStepper
          steps={steps}
          activeStep={activeStep}
          loading={loading}
          refNumber={refNumber}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ) : (
        <DesktopFormStepper
          steps={steps}
          activeStep={activeStep}
          loading={loading}
          refNumber={refNumber}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
    </Paper>
  );
}

export default FormStepper;

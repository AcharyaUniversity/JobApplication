import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Grid, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Dropfileinput from "../../components/Inputs/FileInput/Dropfileinput";
import { IFormState } from "../../states/FormState";

interface Props {
  values: IFormState;
  setValues: Dispatch<SetStateAction<IFormState>>;
  errors: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  titleText: {
    textAlign: "center",
    marginBottom: "20px !important",
    fontSize: "1.3rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "1.1rem",
    },
  },
}));

function AttachmentsForm({ values, setValues, errors }) {
  const classes = useStyles();

  const handleFileDrop = (e: any, name: string) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setValues((prev: IFormState) => ({
        ...prev,
        attachments: { ...prev.attachments, [name]: newFile },
      }));
    }
  };
  const handleFileRemove = (name: string) => {
    setValues((prev: IFormState) => ({
      ...prev,
      attachments: { ...prev.attachments, [name]: null },
    }));
  };

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={10}
      alignItems="baseline"
      justifyContent="space-evenly"
      mt={0}
      mb={2}
    >
      <Grid item xs={12} className={classes.titleText}>
        <p>Please attach your latest resume and highest degree certificate</p>
      </Grid>

      <Grid item xs={12} md={5}>
        <Dropfileinput
          name="resume"
          file={values.attachments.resume}
          handleFileDrop={handleFileDrop}
          handleFileRemove={handleFileRemove}
          error={errors.resume}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Dropfileinput
          name="degree"
          file={values.attachments.degree}
          handleFileDrop={handleFileDrop}
          handleFileRemove={handleFileRemove}
          error={errors.degree}
        />
      </Grid>
    </Grid>
  );
}

export default AttachmentsForm;

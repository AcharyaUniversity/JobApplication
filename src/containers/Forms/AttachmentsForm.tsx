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

  const [files, setFiles] = useState<any[]>([null, null]);

  useEffect(() => {
    setValues((prev: IFormState) => ({
      ...prev,
      attachments: { resume: files[0], degree: files[1] },
    }));
  }, [files]);

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
          index={0}
          files={files}
          setFiles={setFiles}
          error={errors.resume}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Dropfileinput
          index={1}
          files={files}
          setFiles={setFiles}
          error={errors.degree}
        />
      </Grid>
    </Grid>
  );
}

export default AttachmentsForm;

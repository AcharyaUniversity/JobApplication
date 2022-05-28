import { useState } from "react";
import { Grid, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Dropfileinput from "../../components/Inputs/FileInput/Dropfileinput";

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

function AttachmentsForm() {
  const classes = useStyles();

  const [files, setFiles] = useState<any[]>([null, null]);

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={0}
      alignItems="baseline"
      justifyContent="space-around"
      mt={0}
      mb={2}
    >
      <Grid item xs={12} className={classes.titleText}>
        <p>Please attach your latest resume and degree certificate</p>
      </Grid>

      <Grid item xs={12} md={5}>
        <Dropfileinput index={0} files={files} setFiles={setFiles} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Dropfileinput index={1} files={files} setFiles={setFiles} />
      </Grid>
    </Grid>
  );
}

export default AttachmentsForm;

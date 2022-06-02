import { Dispatch, SetStateAction } from "react";
import { Grid, Button, Paper, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import ExperienceForm from "./Forms/ExperienceForm";
import { IFormState } from "../states/FormState";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  values: any;
  setValues: Dispatch<SetStateAction<IFormState>>;
  errors: any[];
  setErrors: Dispatch<SetStateAction<any[]>>;
  tab: keyof IFormState;
  initValues: any;
}

const useStyles = makeStyles(() => ({
  formContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "13px !important",
    padding: "20px",
  },
}));

function MultipleFormsContainer({
  values,
  setValues,
  errors,
  setErrors,
  tab,
  initValues,
}: Props) {
  const classes = useStyles();

  const handleAdd = () => {
    setValues((prev: any) => ({
      ...prev,
      [tab]: prev[tab].concat(initValues),
    }));
    setErrors((prev) => prev.concat({}));
  };

  const handleRemove = (index: number) => {
    let array: any[] = values[tab];
    array.splice(index, 1);

    setValues((prev) => ({
      ...prev,
      [tab]: array,
    }));

    array = errors;
    array.splice(index, 1);
    setErrors(array);
  };

  return (
    <>
      {tab === "experience" && values[tab].length === 0 && (
        <p
          style={{
            fontSize: "1.3rem",
            textAlign: "center",
            margin: "30px 0",
          }}
        >
          You can click on the ADD button to add an expereince
        </p>
      )}
      <Grid container justifyContent="flex-end" rowSpacing={2} mt={0}>
        {values[tab].map((obj: unknown, index: number) => (
          <Grid key={index} item xs={12}>
            <Paper
              variant="outlined"
              className={classes.formContainer}
              sx={{ backgroundColor: "transparent" }}
            >
              <Grid container>
                <Grid item xs={10} style={{ paddingLeft: 10 }}>
                  <p style={{ fontSize: "1.3rem", fontWeight: 500 }}>
                    Fill details
                  </p>
                </Grid>

                {/* remove button */}
                <Grid item xs={2} textAlign="right">
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      borderRadius: 2,
                      minWidth: "37px",
                      padding: 0,
                      minHeight: "34px",
                      margin: "10px 0",
                    }}
                    disabled={values[tab].length <= 1 && tab === "education"}
                    onClick={() => handleRemove(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Grid>

                {/* form */}
                <Grid item xs={12}>
                  {tab === "education" && (
                    <EducationDetailsForm
                      values={values}
                      setValues={setValues}
                      index={index}
                      errors={errors[index]}
                    />
                  )}
                  {tab === "experience" && (
                    <ExperienceForm
                      values={values}
                      setValues={setValues}
                      index={index}
                      errors={errors[index]}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}

        {/* add button */}
        <Grid item xs={2} textAlign="right">
          <Tooltip title="Add entry">
            <Button
              onClick={handleAdd}
              variant="contained"
              color="success"
              sx={{ borderRadius: 2 }}
              startIcon={<AddIcon />}
            >
              ADD
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default MultipleFormsContainer;

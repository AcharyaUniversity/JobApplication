import React from "react";
import { TextField, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  name: string;
  value: string;
  handleChange: (e: any) => void;
  error?: string;
  [x: string]: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    fontSize: 14,
    margin: "2px 10px",
    color: theme.palette.error.main,
  },
}));

function CustomTextField({
  name,
  value,
  handleChange,
  error,
  ...props
}: Props) {
  const classes = useStyles();

  return (
    <>
      <TextField
        error={!!error}
        name={name}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {error && <p className={classes.errorText}>{error}</p>}
    </>
  );
}

export default CustomTextField;

import React from "react";
import { TextField } from "@mui/material";

interface Props {
  name: string;
  value: string;
  handleChange: (e: any) => void;
  [x: string]: any;
}

function CustomTextField({ name, value, handleChange, ...props }: Props) {
  return (
    <TextField name={name} value={value} onChange={handleChange} {...props} />
  );
}

export default CustomTextField;

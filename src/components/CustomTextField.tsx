import React from "react";
import { TextField } from "@mui/material";

interface Props {
  value: string;
  handleChange: (e: any) => void;
  [x: string]: any;
}

function CustomTextField({ value, handleChange, ...props }: Props) {
  return <TextField {...props} value={value} onChange={handleChange} />;
}

export default CustomTextField;

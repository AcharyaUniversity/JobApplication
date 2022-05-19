import React, { PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Rubik, Roboto, sans-serif",
    },
  })
);

function ThemeContext({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeContext;

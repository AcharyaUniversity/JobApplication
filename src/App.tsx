import React from "react";
import FormStepper from "./containers/FormStepper";
import ThemeContext from "./utils/ThemeContext";
import ViewContext from "./utils/ViewContext";

function App() {
  return (
    <ThemeContext>
      <ViewContext>
        <FormStepper />
      </ViewContext>
    </ThemeContext>
  );
}

export default App;

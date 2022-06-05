import React from "react";
import FormStepper from "./containers/FormStepper";
import ThemeContext from "./utils/ThemeContext";
import ViewContext from "./utils/ViewContext";
import Header from "./components/Header";

function App() {
  return (
    <ThemeContext>
      <ViewContext>
        <Header />
        <FormStepper />
      </ViewContext>
    </ThemeContext>
  );
}

export default App;

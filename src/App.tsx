import React from "react";
import FormStepper from "./containers/FormStepper";
import ThemeContext from "./utils/ThemeContext";
import ViewContext from "./utils/ViewContext";
import Header from "./components/Header";
import Title from "./components/Title";

function App() {
  return (
    <ThemeContext>
      <ViewContext>
        <Header />
        <Title />
        <FormStepper />
      </ViewContext>
    </ThemeContext>
  );
}

export default App;

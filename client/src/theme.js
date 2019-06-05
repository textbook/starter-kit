import React from "react";
import { ThemeProvider } from "react-jss";

const theme = {
  palette: {
    text: {
      primary: "blue",
    },
  },
};

export const withTheme = (Component) => {
  const ThemedComponent = () => (
    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>
  );
  return ThemedComponent;
};

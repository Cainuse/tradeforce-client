import React from "react";
import { createMuiTheme , ThemeProvider } from '@material-ui/core/styles';
import NavBar from "./navBar/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D588F"
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Montserrat',
    ].join(','),
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />
      </div>
    </ThemeProvider>
  );
};

export default App;

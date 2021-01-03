import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CssBaseline } from "@material-ui/core";
import Routes from "./utils/routes";
import { FormProvider } from "./provider/FormProvider";
import Axios from "axios";
import { LoginProvider } from "./provider/LoginProvider";

Axios.defaults.baseURL = process.env.REACT_APP_API;

function App() {
  const classes = useStyles();
  return (
    <Router>
      <CssBaseline />
      <LoginProvider>
        <Box className={classes.root}>
          <FormProvider>
            <Routes />
          </FormProvider>
        </Box>
      </LoginProvider>
    </Router>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
  },
}));

export default App;

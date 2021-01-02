import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import NavBar from "../components/Navbar";
import LoginButton from "../components/LoginButton";

const LoginLayout = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.navBar}>
        <NavBar />
      </Box>
      <Box className={classes.body}>
        <LoginButton />
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  navBar: {
    height: 60,
    backgroundColor: "white",
    elevation: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
}));

export default LoginLayout;

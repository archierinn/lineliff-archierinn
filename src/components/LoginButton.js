import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Paper, Typography } from "@material-ui/core";
// import { useLiff } from "react-liff";
import liff from "@line/liff";

const LoginButton = () => {
  const classes = useStyles();

  /* useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
  }, []) */
  // const { liff } = useLiff();
  const handleLogin = () => {
    liff.login({ redirectUri: "https://lineliff-archierinn.herokuapp.com/verify"});
  }

  return (
    <Box mx="auto">
      <Paper elevation={3} className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          Please login to proceed
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogin}
        >
          LOGIN
        </Button>
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50vw",
    height: "30vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
  },
  title: {
    justifySelf: "flex-start",
  },
}));

export default LoginButton;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Paper, Typography } from "@material-ui/core";
import liff from "@line/liff";

const LoginButton = () => {
  const classes = useStyles();
  const handleLogin = () => {
    liff.login();
  };

  return (
    <Box mx="auto">
      <Paper elevation={3} className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          Silakan masuk untuk melanjutkan
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogin}
        >
          MASUK
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

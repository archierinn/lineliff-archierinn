import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, Typography } from "@material-ui/core";

const NoMatch = () => {
  const classes = useStyles();
  return (
    <Box className={classes.body}>
      <Box mx="auto">
        <Paper elevation={3} className={classes.root}>
          <Typography variant="h5" className={classes.title}>
            404 PAGE NOT FOUND
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
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

export default NoMatch;

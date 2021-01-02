import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  IconButton,
  Typography,
  Paper,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { FormContext } from "../provider/FormProvider";

const NavBarCheckout = () => {
  const classes = useStyles();
  const { history } = useContext(FormContext);

  const handleBack = () => {
    history.replace("/order")
  }
  return (
    <Paper elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.backButton}
          color="inherit"
          aria-label="back"
          onClick={handleBack}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Checkout
        </Typography>
      </Toolbar>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default NavBarCheckout;

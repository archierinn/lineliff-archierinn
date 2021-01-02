import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import NavBar from "../components/Navbar";
import CardList from "../components/CardList";
import { FormContext } from "../provider/FormProvider";
import Axios from "axios";
import { LoginContext } from "../provider/LoginProvider";
import Notifications from "../components/Notifications";

const OrderLayout = () => {
  const classes = useStyles();
  const { totals, items, history } = useContext(FormContext);
  const { profiles } = useContext(LoginContext);
  const [total] = totals;
  const [itemArray] = items;
  const [profile, setProfile] = profiles;

  useEffect(() => {
    if (profile.id === "") {
      Axios.post("/login", profile.token).then((res) => {
        setProfile({ ...profile, id: res.data.data });
      });
    }
  }, [profile, setProfile]);

  const handleNext = () => {
    history.push("/order/checkout");
  };

  return (
    <>
      <Box className={classes.navBar}>
        <NavBar />
      </Box>
      <Box className={classes.body}>
        <CardList />
      </Box>
      <Box className={classes.tabBar}>
        <Box className={classes.total}>
          <Typography variant="h6" className={classes.totalText}>
            Total Amount
          </Typography>
          <Typography variant="h6" className={classes.priceText}>
            {`Rp${total.price}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleNext}
          disabled={itemArray.length === 0}
        >
          Next
        </Button>
      </Box>
      <Notifications error={{status: false}} />
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
    flex: 1,
    flexGrow: 1,
    overflowY: "auto",
  },
  tabBar: {
    height: 60,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderColor: "#E5E5E5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    margin: 4,
  },
  total: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    marginLeft: 8,
  },
  totalText: {
    fontSize: 14,
  },
  priceText: {
    fontWeight: "bold",
  },
}));

export default OrderLayout;

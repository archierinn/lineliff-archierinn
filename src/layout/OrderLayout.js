import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import NavBar from "../components/Navbar";
import CardList from "../components/CardList";
import { FormContext } from "../provider/FormProvider";
import Notifications from "../components/Notifications";

const OrderLayout = () => {
  const classes = useStyles();
  const { totals, items, ids, history } = useContext(FormContext);
  const [total, setTotal] = totals;
  const [itemArray, setItemArray] = items;
  const [, setIdArray] = ids;

  const handleNext = () => {
    history.push("/order/checkout");
  };

  const formatNumber = (number) => {
    const num = number.toString();
    const length = num.length - 1;
    if (length >= 3) {
      const mod = length % 3;
      if (mod > 0) {
        return num.substring(0, mod+1) + "." + num.substring(mod+1);
      } else if (length / 3 === 1) {
        return num.substring(0, 1) + "." + num.substring(1);
      } else {
        let i = 0;
        let output = "";
        while (i < length / 3) {
          const index = i * 3;
          if (index === 0) {
            output += num.substring(0, 1) + "." + num.substring(1, 3);
          } else if (i + 1 === length / 3) {
            output +=
              num.substring(index, index + 1) + "." + num.substring(index + 1);
          } else {
            output +=
              num.substring(index, index + 1) +
              "." +
              num.substring(index + 1, index + 3);
          }
          i++;
        }
        return output;
      }
    } else {
      return num;
    }
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
            {`Rp${formatNumber(Number(total.price))}`}
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

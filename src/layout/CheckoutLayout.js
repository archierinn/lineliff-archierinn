import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, CircularProgress } from "@material-ui/core";
import NavBarCheckout from "../components/NavbarCheckout";
import ReviewLayout from "./ReviewLayout";
import Axios from "axios";
import { FormContext } from "../provider/FormProvider";
import { LoginContext } from "../provider/LoginProvider";
import Notifications from "../components/Notifications";
import liff from "@line/liff";

const CheckoutLayout = () => {
  const classes = useStyles();
  const { items, totals, notification } = useContext(FormContext);
  const [itemArray] = items;
  const [total] = totals;
  const [status, setStatus] = notification;
  const { profiles } = useContext(LoginContext);
  const [profile] = profiles;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  const handleConfirm = () => {
    setLoading(true);
    const orderNumber = getOrderNumber(6);
    const data = {
      orderNumber,
      totalPrice: total.price,
      id: profile.id,
      item: itemArray,
    };
    Axios.post("/order/checkout", data)
      .then((res) => {
        if (res.data.status) {
          return Axios.get(
            "/pushorder/" + profile.userId + "?id=" + res.data.data
          ).then((res) => {
            if (res.data.status) {
              setLoading(false);
              setStatus({...status, open: true, message: "Data berhasil disimpan"})
              if (liff.isInClient) {
                setTimeout(() => {
                  liff.closeWindow();
                }, 3000);
              }
              return;
            } else {
              handleError();
              return;
            }
          });
        } else {
          handleError();
          return;
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleError = (error = null) => {
    setLoading(false);
    let message = "";
    if (error) {
      message = error.message;
    } else {
      message = "Gagal! Terjadi galat. Silakan coba lagi.";
    }
    setError({ status: true, message });
    setStatus({...status, open: true})
  };

  const getOrderNumber = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let random = "";
    for (let i = 0; i < length; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length + 1));
    }
    const date = new Date();
    return (
      "#" +
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      random
    );
  };

  return (
    <>
      <Box className={classes.navBar}>
        <NavBarCheckout />
      </Box>
      <Box className={classes.body}>
        <ReviewLayout />
      </Box>
      <Box className={classes.tabBar}>
        <Button
          variant="contained"
          color="primary"
          disabled={itemArray.length === 0}
          fullWidth
          className={classes.button}
          onClick={handleConfirm}
        >
          {loading ? <CircularProgress size={24} color="white" /> : "Confirm Order"}
        </Button>
      </Box>
      <Notifications error={error} />
      {/* <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        {
          <Alert
            onClose={handleClose}
            severity={error.status ? "error" : "success"}
          >
            {error.status ? error.message : "Sukses! Data berhasil disimpan"}
          </Alert>
        }
      </Snackbar> */}
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

export default CheckoutLayout;

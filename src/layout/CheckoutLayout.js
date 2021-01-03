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
import templateReceipt from "../json/templateReceipt.json";

const CheckoutLayout = () => {
  const classes = useStyles();
  const { items, ids, totals, notification, history } = useContext(FormContext);
  const [itemArray, setItemArray] = items;
  const [total, setTotal] = totals;
  const [idArray, setIdArray] = ids;
  const [status, setStatus] = notification;
  const { profiles } = useContext(LoginContext);
  const [profile] = profiles;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const isInClient = liff.isInClient();

  const handleConfirm = () => {
    setLoading(true);
    const orderNumber = getOrderNumber(6);
    const data = {
      orderNumber,
      totalPrice: total.price,
      id: profile.id,
      item: itemArray,
    };
    const result = handleSendMessage(orderNumber, profile.name, itemArray, total);
    console.log(result);
    /* Axios.post("/order/checkout", data)
      .then((res) => {
        if (res.data.status) {
          if (isInClient) {
          const result = handleSendMessage(orderNumber, profile.name, itemArray, total);
          return liff.sendMessages([
            {
              type: 'text',
              text: 'Pelanggan ' + profile.name +'\n\nTerima kasih sudah memesan. Berikut nota pemesanan Anda'
            },
            {
              type: 'flex',
              altText: 'Receipt',
              contents: result
            }
          ])
            .then(() => {
              setLoading(false);
              setStatus({...status, open: true, message: "Data berhasil disimpan"});
              setItemArray([]);
              setIdArray([]);
              setTotal({price: 0, quantity: 0});
              setTimeout(() => {
                liff.logout();
                liff.closeWindow();
              }, 3000);
            })
          } else {
          return Axios.get(
            "/pushorder/" + profile.userId + "?id=" + res.data.data
          ).then((res) => {
            if (res.data.status) {
              setLoading(false);
              setStatus({...status, open: true, message: "Data berhasil disimpan"});
              setItemArray([]);
              setIdArray([]);
              setTotal({price: 0, quantity: 0});
              history.replace("/order")
            } else {
              handleError();
              return;
            }
          });
          }
        } else {
          handleError();
          return;
        }
      })
      .catch((err) => {
        handleError(err);
      }); */
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
      date.getFullYear() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      random
    );
  };

  const handleSendMessage = (idOrder, profile, items, total) => {
    const template = JSON.parse(templateReceipt);
    console.log(template);
    template.body.contents[0].contents[1].text = "#" + idOrder;
    template.body.contents[2].contents[1].text = profile;
    const array = [];
    items.forEach((item) => {
      const price = Number(item.price) * Number(item.quantity);
      const arrayItem = [{
        type: "text",
        text: item.name + " x " + item.quantity.toString(),
        size: "sm",
        color: "#555555",
        flex: 1,
        wrap: true
      },{
        type: "text",
        text: `Rp${formatNumber(price)}`,
        size: "sm",
        color: "#111111",
        flex: 0,
        align: "end"
      }];
      const container = {
        type: "box",
        layout: "horizontal",
        contents: arrayItem
      };
      array.push(container);
      if (item.desc !== "") {
        const descriptionContent = [{
          type: "text",
          text: item.desc,
          size: "xs",
          color: "#555555",
          maxLines: 3,
          wrap: true,
          style: "italic"
        }];
        const descriptionContainer = {
          type: "box",
          layout: "vertical",
          contents: descriptionContent,
          margin: "none"
        };
        array.push(descriptionContainer);
      }
    });
    template.body.contents[4].contents = array;
    template.body.contents[6].contents[1].text = total.quantity.toString();
    template.body.contents[7].contents[1].text = `Rp${formatNumber(total.price)}`;
    return JSON.stringify(template);
  }

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

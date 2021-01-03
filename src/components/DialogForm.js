import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import Form from "./Form";
import { FormContext } from "../provider/FormProvider";

const DialogForm = () => {
  const { openDialog, item, items, ids, notification, totals } = useContext(
    FormContext
  );
  const [open, setOpen] = openDialog;
  const [editedItem, setEditedItem] = item;
  const [itemArray, setItemArray] = items;
  const [idArray, setIdArray] = ids;
  const [status, setStatus] = notification;
  const [total, setTotal] = totals;

  const handleClose = () => {
    setOpen(false);
    if (editedItem.quantity > 0) {
      if (!idArray.includes(editedItem.id)) {
        const quantity =
          total.quantity > 0
            ? Number(total.quantity) - Number(editedItem.quantity)
            : 0;
        const price =
          total.price > 0
            ? Number(total.price) - editedItem.price * editedItem.quantity
            : 0;
        setTotal({ ...total, price, quantity });
      }
    }
    setTimeout(() => {
      setEditedItem({
        id: "",
        name: "",
        type: "",
        quantity: 0,
        price: 0,
        desc: "",
      });
    }, 100);
  };

  const handleAdd = () => {
    const array = [...itemArray];
    let message = "";
    if (idArray.includes(editedItem.id)) {
      const index = idArray.indexOf(editedItem.id);
      if (editedItem.quantity === 0) {
        array.splice(index, 1);
        message = "Barang berhasil dihapus dari keranjang";
      } else {
        array.splice(index, 1, editedItem);
        message = "Data berhasil diubah";
      }
    } else {
      array.push(editedItem);
      setIdArray([...idArray, editedItem.id]);
      message = "Barang berhasil ditambahkan ke keranjang";
    }
    setItemArray(array);
    setOpen(false);
    setEditedItem({
      id: "",
      name: "",
      type: "",
      quantity: 0,
      price: 0,
      desc: "",
    });
    // setTotal({...total, })
    setTimeout(() => {
      setStatus({ ...status, open: true, message });
    }, 100);
  };

  const formatNumber = (number) => {
    const num = number.toString();
    const length = num.length - 1;
    if (length >= 3) {
      const mod = length % 3;
      if (mod > 0) {
        return num.substring(0, mod + 1) + "." + num.substring(mod + 1);
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
    <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">{editedItem.name}</Typography>
        <Typography variant="h6">{`Rp${formatNumber(
          Number(editedItem.price)
        )}`}</Typography>
      </DialogTitle>
      <DialogContent>
        <Form />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Batal
        </Button>
        <Button
          onClick={handleAdd}
          disabled={editedItem.quantity === 0}
          color="primary"
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;

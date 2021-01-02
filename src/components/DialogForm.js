import React, { useContext, useEffect } from "react";
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
  const { openDialog, item, items, ids, notification } = useContext(FormContext);
  const [open, setOpen] = openDialog;
  const [editedItem] = item;
  const [itemArray, setItemArray] = items;
  const [idArray, setIdArray] = ids;
  const [status, setStatus] = notification;

  /* useEffect(() => {
    if (open) {
      setOpen(true);
    }
  }, [open, setOpen]); */

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const array = [...itemArray];
    let message = ""
    if (idArray.includes(editedItem.id)) {
      const index = idArray.indexOf(editedItem.id);
      if (editedItem.quantity === 0) {
        array.splice(index, 1);
        message = "Barang berhasil dihapus dari keranjang";
      } else {
        array.splice(index, 1, editedItem);
        message = "Data berhasil diubah"
      }
    } else {
      array.push(editedItem);
      setIdArray(editedItem.id);
      message = "Barang berhasil ditambahkan ke keranjang"
    }
    setItemArray(array);
    setOpen(false);
    setTimeout(() => {
      setStatus({...status, open: true, message})
    }, 100)
  };

  return (
    <Dialog fullWidth={true} maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">{editedItem.name}</Typography>
      </DialogTitle>
      <DialogContent>
        <Form />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;
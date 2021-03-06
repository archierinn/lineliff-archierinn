import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { FormContext } from "../provider/FormProvider";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const Form = () => {
  const classes = useStyles();
  const { item, totals } = useContext(FormContext);
  const [editedItem, setEditedItem] = item;
  const [total, setTotal] = totals;

  const handleQuantityAdd = (event) => {
    const quantity = Number(editedItem.quantity) + 1;
    const editedObject = { ...editedItem, quantity };
    const price = Number(total.price) + Number(editedItem.price);
    const quantityTotal = Number(total.quantity) + 1;
    setEditedItem(editedObject);
    setTotal({ ...total, price, quantity: quantityTotal });
  };

  const handleQuantityRemove = (event) => {
    const quantity = Number(editedItem.quantity) - 1;
    const editedObject = { ...editedItem, quantity };
    const price = Number(total.price) - Number(editedItem.price);
    const quantityTotal = Number(total.quantity) - 1;
    setEditedItem(editedObject);
    setTotal({ ...total, price, quantity: quantityTotal });
  };

  const handleDesc = (event) => {
    const editedObject = { ...editedItem, desc: event.target.value };
    setEditedItem(editedObject);
  };

  return (
    <form noValidate autoComplete="off">
      <Typography variant="body1">Jumlah</Typography>
      <Grid
        container
        wrap="noWrap"
        alignItems="center"
        justify="center"
        spacing={0}
        className={classes.grid}
      >
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            onClick={handleQuantityRemove}
            disabled={editedItem.quantity === 0}
            className={classes.button}
          >
            <RemoveCircleOutlineIcon />
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            fullWidth
            value={editedItem.quantity}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size="large"
            onClick={handleQuantityAdd}
            disabled={editedItem.quantity === 50}
            className={classes.button}
          >
            <AddCircleOutlineIcon />
          </Button>
        </Grid>
      </Grid>
      <TextField
        label="Permintaan tambahan"
        variant="outlined"
        fullWidth={true}
        multiline
        rows={4}
        value={editedItem.desc}
        onChange={handleDesc}
        className={classes.textField}
      />
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 16,
  },
  grid: {
    margin: 0,
  },
  button: {
    textAlign: "center",
  },
}));

export default Form;

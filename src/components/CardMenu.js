import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Button, Paper, Typography } from "@material-ui/core";
import { FormContext } from "../provider/FormProvider";

const CardMenu = (props) => {
  const classes = useStyles();
  const { openDialog, item, items, ids } = useContext(FormContext);
  const [, setOpen] = openDialog;
  const [editedItem, setEditedItem] = item;
  const [idArray] = ids;
  const [itemArray] = items;
  const { item_name, item_img, item_desc, item_price } = props.data;

  const handleOpen = (data) => {
    let editItem = {}
    if (idArray.includes(data.item_id)) {
      const index = idArray.indexOf(data.item_id);
      editItem = {
        ...editedItem,
        ...itemArray[index]
      };
    } else {
      editItem = {
        ...editedItem,
        id: data.item_id,
        name: data.item_name,
        type: data.item_type,
        price: data.item_price
      };
    }
    setEditedItem(editItem);
    setTimeout(() => setOpen(true), 100);
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
      <Paper elevation={3} className={classes.root}>
        <Box display="flex" alignItems="center">
          <Avatar variant="square" src={item_img} className={classes.avatar} />
          <Box display="flex" flexDirection="column">
            <Typography className={classes.title}>{item_name}</Typography>
            <Typography
              variant="body2"
              paragraph={true}
              className={classes.text}
            >
              {item_desc}
            </Typography>
            <Typography
              paragraph={true}
              className={classes.title}
            >
              {`Rp${formatNumber(Number(item_price))}`}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={classes.button}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(props.data)}
          >
            Tambah ke Keranjang
          </Button>
        </Box>
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch",
    padding: 4,
    margin: 4,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: 4,
    marginBottom: 0,
  },
  text: {
    textAlign: "justify",
    marginLeft: 4,
    marginTop: 0,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 4,
  },
  button: {
    marginTop: 4,
    marginBottom: 4,
  },
}));

export default CardMenu;

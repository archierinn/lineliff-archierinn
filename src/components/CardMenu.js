import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Button, Paper, Typography } from "@material-ui/core";
import { FormContext } from "../provider/FormProvider";

const CardMenu = (props) => {
  const classes = useStyles();
  const { openDialog, item } = useContext(FormContext);
  const [, setOpen] = openDialog;
  const [editedItem, setEditedItem] = item;
  const { item_name, item_img, item_desc } = props.data;

  const handleOpen = (data) => {
    const editItem = {
      ...editedItem,
      id: data.item_id,
      name: data.item_name,
      type: data.item_type,
      price: data.item_price,
    };
    setEditedItem(editItem);
    setTimeout(() => setOpen(true), 100);
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
            Add to Cart
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
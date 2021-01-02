import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress } from "@material-ui/core";
import CardMenu from "./CardMenu";
import DialogForm from "./DialogForm";
import Axios from "axios";

const CardList = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!data) {
      Axios.get("/item")
        .then((res) => {
          if (res.data.status) {
            setData(res.data.data);
            setLoading(false);
          }
        })
        .catch((error) => console.log(error.message));
    }
  }, [data]);

  return (
    <>
      <Box>
      {loading ? <Box className={classes.box}>
        <CircularProgress size={60} className={classes.loading} />
        </Box> :
        data && data.map((item, index) => <CardMenu key={index} data={item} />)}
        {/* <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu />
        <CardMenu /> */}
      </Box>
      <DialogForm />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
}));

export default CardList;

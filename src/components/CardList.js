import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import CardMenu from "./CardMenu";
import DialogForm from "./DialogForm";
import Axios from "axios";

const CardList = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!data) {
      Axios.get("/item")
        .then((res) => {
          if (res.data.status) {
            setData(res.data.data);
          }
        })
        .catch((error) => console.log(error.message));
    }
  }, [data]);

  return (
    <>
      <Box>
        {data && data.map((item, index) => <CardMenu key={index} data={item} />)}
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

export default CardList;

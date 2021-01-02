import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const FormContext = createContext();

export const FormProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({
    id: "",
    name: "",
    type: "",
    quantity: 0,
    price: 0,
    desc: "",
  });
  const [itemArray, setItemArray] = useState([]);
  const [idArray, setIdArray] = useState([]);
  const [total, setTotal] = useState({ price: 0, quantity: 0 });
  const [status, setStatus] = useState({open: false, message: ""});
  const history = useHistory();

  return (
    <FormContext.Provider
      value={{
        openDialog: [open, setOpen],
        item: [editedItem, setEditedItem],
        items: [itemArray, setItemArray],
        ids: [idArray, setIdArray],
        totals: [total, setTotal],
        notification: [status, setStatus],
        history,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

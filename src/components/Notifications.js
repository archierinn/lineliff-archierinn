import React, { useContext } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { FormContext } from "../provider/FormProvider";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Notifications = (props) => {
  const { notification } = useContext(FormContext);
  const [status, setStatus] = notification;
  // const [open, setOpen] = useState(false)

  /* useEffect(() => {
        if (openNotification) {
        }
    }) */

  const handleClose = () => {
    setStatus({...status, open: false});
  };
  return (
    <Snackbar
      open={status.open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      {
        <Alert
          onClose={handleClose}
          severity={props.error.status ? "error" : "success"}
        >
          {props.error.status
            ? props.error.message
            : "Sukses! " + status.message}
        </Alert>
      }
    </Snackbar>
  );
};

export default Notifications;

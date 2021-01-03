import React, { createRef, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Button,
  IconButton,
  Typography,
  Paper,
  Drawer,
  List,
  ListItemText,
  ListItem,
  Box,
  Avatar,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { FormContext } from "../provider/FormProvider";
import { LoginContext } from "../provider/LoginProvider";
import liff from "@line/liff";

const NavBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dialog = createRef();
  const { history } = useContext(FormContext);
  const { profiles, login } = useContext(LoginContext);
  const [isLoggedIn, setIsLoggedIn] = login;
  const [profile] = profiles;
  const isInClient = liff.isInClient();

  const handleClose = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogin = () => {
    liff.login();
  };

  const handleLogout = () => {
    liff.logout();
    setIsLoggedIn(false);
    history.replace("/login");
  };

  const handleOrder = () => {
    history.replace("/order");
  };

  const handleOpenWindow = () => {
    liff.openWindow({
      url: "https://lineliff-archierinn.herokuapp.com",
      external: true,
    });
  };

  const handleCloseWindow = () => {
    liff.closeWindow();
  };

  return (
    <>
      <Paper elevation={3}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pesan Minum
          </Typography>
          {isInClient ? null : isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Keluar
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Masuk
            </Button>
          )}
        </Toolbar>
      </Paper>
      <Drawer ref={dialog} anchor="left" open={open} onClose={handleClose}>
        <Box className={classes.profile}>
          {isLoggedIn ? (
            <>
              <Avatar src={profile.img} className={classes.avatar}></Avatar>
              <Typography variant="h6" className={classes.displayName}>
                {profile.name}
              </Typography>
            </>
          ) : (
            <Typography variant="h5" className={classes.displayName}>
              AR Drink
            </Typography>
          )}
        </Box>
        <Divider />
        <List className={classes.list}>
          <ListItem button key="order" onClick={handleOrder}>
            <ListItemText primary="Pesan" />
          </ListItem>
          {isInClient ? (
            <ListItem button key="openWindow" onClick={handleOpenWindow}>
              <ListItemText primary="Buka di peramban eksternal" />
            </ListItem>
          ) : null}
          {isInClient ? (
            <ListItem button key="closeWindow" onClick={handleCloseWindow}>
              <ListItemText primary="Tutup aplikasi" />
            </ListItem>
          ) : null}
        </List>
      </Drawer>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  profile: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "20vw",
    padding: 8,
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
    },
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: 4,
  },
  displayName: {
    padding: 4,
  },
  list: {
    textAlign: "center",
  },
}));

export default NavBar;

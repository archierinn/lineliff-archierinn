import React, { createRef, useContext, useEffect, useState } from "react";
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
  const [profile, setProfile] = profiles;
  const isInClient = liff.isInClient();

  useEffect(() => {
    /* if (liff.isLoggedIn()) {
      setIsLoggedIn(true)
    } */
    liff.getProfile().then((res) => {
      setProfile({...profile, name: res.displayName, img: res.pictureUrl, userId: res.userId})
      /* if (liff.isLoggedIn()) {
        setIsLoggedIn(true)
      } */
    })
  }, [])

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
    history.replace("/order");
  };

  const handleLogout = () => {
    liff.logout();
    setIsLoggedIn(false)
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
            Order Makan
          </Typography>
          {isInClient ? null : liff.isLoggedIn() ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </Paper>
      <Drawer ref={dialog} anchor="left" open={open} onClose={handleClose}>
        <Box className={classes.profile}>
          {liff.isLoggedIn() ? (
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
        <List>
          <ListItem button key="order" onClick={handleOrder}>
            <ListItemText primary="Order" />
          </ListItem>
          {isInClient ? (
            <ListItem button key="openWindow" onClick={handleOpenWindow}>
              <ListItemText primary="Open in external browser" />
            </ListItem>
          ) : null}
          {isInClient ? (
            <ListItem button key="closeWindow" onClick={handleCloseWindow}>
              <ListItemText primary="Close app" />
            </ListItem>
          ) : null}
          {/* {["Order", "Open in external browser"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
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
    padding: 8,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    margin: 4,
  },
  displayName: {
    padding: 4,
  },
}));

export default NavBar;

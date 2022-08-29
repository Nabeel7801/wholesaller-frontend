import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Container } from "reactstrap";

import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Button, Typography, Badge, MenuItem, Menu } from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appstyl: {
    backgroundColor: " #3f51b5",
  },
  container: { padding: "12px 0" },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  button: {
    outline: '0',
    border: 'none',
    '&:focus': {
      outline: '0',
      border: 'none'
    }
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function IndexNavbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const sallercenter = () => {
    navigate("/saller");
  };

  const logout = async () => {
    localStorage.removeItem("wholesaller");
    window.location.href = "/";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/business")}>Profilepage</MenuItem>
      <MenuItem onClick={sallercenter}>Seller center</MenuItem>
      <MenuItem onClick={sallercenter}>Order</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appstyl}>
        <Container className={classes.container}>
          <Toolbar variant="dense">
            <Typography
              className={classes.menuButton}
              edge="start"
              class="cursor-pointer text-white font-semibold"
              onClick={() => navigate("/")}
              color="inherit"
              aria-label="open drawer"
            >
              Wholesaller
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button color="inherit" className={classes.button} onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button color="inherit" className={classes.button} onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>

            <div className={classes.sectionMobile}>
              <Button color="inherit" className={classes.button} href="/signin">
                Sign In
              </Button>
            </div>

          </Toolbar>
        </Container>

      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      
    </div>
  );
}

export default IndexNavbar;

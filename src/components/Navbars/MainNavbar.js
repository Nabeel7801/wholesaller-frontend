import React, { useState } from "react";
import { Container } from "reactstrap";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Badge, MenuItem, Menu, Box, List, ListItem, SwipeableDrawer } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import {
  ArrowBackIos,
  BookmarkBorder,
  CompareArrowsOutlined,
  NoteAddOutlined,
  ListAltOutlined,
  ShoppingBasketOutlined,
  FormatListNumberedOutlined,
  InfoOutlined,
  AssignmentOutlined,
  PolicyOutlined,
  MessageOutlined,
  PaymentOutlined,
  GavelOutlined,
} from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  itemText: {
    textAlign: "left",
  },
  grow: {
    flexGrow: 1,
  },
  appstyl: {
    backgroundColor: "#3f51b5",
  },
  container: { padding: "12px 0px" },
  menuButton: {
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    marginRight: theme.spacing(2),
  },
  iconButton: {
    color: "#fff",
    fill: "#fff",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 'none',
    outline: '0',
    '&:focus': {
      outline: '0',
      border: 'none'
    }
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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
  drawer: {
    overflowY: "auto",
    overflowStyle: "none" /* for Internet Explorer, Edge */,
    scrollbarWidth: "none" /* for Firefox */,
    "&::-webkit-scrollbar": {
      height: 0,
      width: 0,
      display: "none",
    },
  },
}));

function MainNavbar() {
  const navigate = useNavigate();
  const [total] = useState(0);

  const [state, setState] = React.useState({
    left: false,
  });
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

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

  const sellerStatus = useSelector((s) => s.sellerStatus.sellerStatus);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // const fetchAllCategories = useMutation(
  //   (callApi) => userService.commonPostService("api/displaycategory", callApi),
  //   {
  //     onError: () => {
  //       ////  toast.error('Error');
  //     },

  //     onSuccess: () => {
  //       dispatch({ type: "getAllCategories", payload: data.data.result });
  //     },
  //   }
  // );
  // useEffect(() => {
  //   fetchAllCategories.mutate();
  // }, []);
  
  const data = [
    { heading: "Buyers" },
    {
      icon: BookmarkBorder,
      text: "your orders",
      link: "/order",
    },
    {
      icon: CompareArrowsOutlined,
      text: "your return",
      link: "/returns",
    },
    { heading: "Sellers" },
    {
      icon: ShoppingBasketOutlined,
      text: "listing",
      link: "/saller/producttype",
    },
    {
      icon: NoteAddOutlined,
      text: "become a seller",
      link: "/applyseller",
    },
    {
      icon: ListAltOutlined,
      text: "view listing",
      link: "/saller/Viewlisting",
    },
    {
      icon: FormatListNumberedOutlined,
      text: "Orders",
      link: "/saller/ordersaller",
    },
    {
      icon: PaymentOutlined,
      text: "my payment",
      link: "/saller/payments",
    },
    {
      icon: CompareArrowsOutlined,
      text: "returns in seller area",
      link: "/saller/returns",
    },
    { heading: "General" },
    {
      icon: InfoOutlined,
      text: "about wholesaller",
      link: "/",
    },
    {
      icon: AssignmentOutlined,
      text: "terms of use",
      link: "/",
    },
    {
      icon: PolicyOutlined,
      text: "policies",
      link: "/",
    },
    {
      icon: MessageOutlined,
      text: "support",
      link: "/",
    },

    {
      icon: GavelOutlined,
      text: "Logout",
      onClick: logout,
    },
  ];

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
      <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
      <MenuItem onClick={sallercenter}>Seller area</MenuItem>
      <MenuItem onClick={() => navigate("/")}>Return </MenuItem>

      {sellerStatus === null && (
        <MenuItem onClick={() => navigate("/applyseller")}>
          Apply For Seller{" "}
        </MenuItem>
      )}

      <MenuItem onClick={() => navigate("/")}>Support</MenuItem>
      <MenuItem onClick={() => navigate("/order")}>Order</MenuItem>

      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const img = JSON.parse(localStorage.getItem("wholesaller")).profileImg;
  const renderMobileMenu = (
    <React.Fragment key={"left"}>
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <Box
          sx={{ width: 280 }}
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
          className={classes.drawer}
        >
          <List style={{ paddingTop: 0 }}>
            <Link to="/account">
              <div
                className="flex items-center px-4 py-5 mb-6"
                style={{ minHeight: "100px", backgroundColor: "#3f51b5" }}
              >
                <img
                  id="output"
                  alt="..."
                  className="rounded-lg w-16 h-16"
                  src={img == null ? require("assets/img/avatar.png") : img}
                />
                <div className="ml-3  text-white">
                  <p className="text-sm font-bold mb-1">
                    {JSON.parse(localStorage.getItem("wholesaller")).firstName}
                  </p>
                  <p className="text-sm">
                    {JSON.parse(localStorage.getItem("wholesaller")).phone}
                  </p>
                </div>
              </div>
            </Link>
            {data.map((item, key) => {
              const Icon = item?.icon;
              return (
                <ListItem key={key} disablePadding onClick={item?.onClick}>
                  {item.heading && (
                    <div>
                      <h2
                        className="text-base  font-bold "
                        onClick={() => item.link && navigate(item.link)}
                      >
                        {item.heading}
                      </h2>
                    </div>
                  )}
                  {item.icon && (
                    <div className="mb-2 ml-2">
                      <Link
                        to={item.link}
                        className="text-black hover:text-black"
                      >
                        <div className="flex items-center">
                          <div>
                            <Icon />
                          </div>
                          <div className="text-sm font-medium ml-4 capitalize">
                            {item.text}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appstyl}>
        <Container className={classes.container} >
          <Toolbar variant="dense">
            <IconButton
              className={classes.iconButton}
              onClick={() => navigate(-1)}
            >
              <div>
                <ArrowBackIos
                  style={{ transform: "translate(2px, -2px)", width: "18px" }}
                />
              </div>
            </IconButton>
            <Typography
              className={classes.menuButton}
              edge="start"
              onClick={() => navigate("/")}
              color="inherit"
              aria-label="open drawer"
            >
              Wholesaller
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton 
                aria-label="show 4 new mails" 
                color="inherit"
                className={classes.iconButton}
                onClick={() => navigate("/cart")}
              >
                <Badge
                  badgeContent={total}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                className={classes.iconButton}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={toggleDrawer("left", true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default MainNavbar;

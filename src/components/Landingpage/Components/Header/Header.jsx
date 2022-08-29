import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import logo from "../../img/logo-site1.svg";
import { Container, IconButton, Button, Box } from "@material-ui/core";
import cx from "classnames";

import { Link } from "react-scroll";
import WhatsApp from "../../img/whatsapp.png";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  // providing background color to header on scroll
  const changeNavBackground = () => {
    const height = window.scrollY;
    if (height >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNavBackground);

  // mobile hamburger states and use ref
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburger = useRef(null);
  const menuMobile = useRef(null);

  const handleMenu = () => {
    if (!menuOpen) {
      hamburger.current.classList.add(styles.open);
      setMenuOpen(true);
      menuMobile.current.classList.add(styles.menuOpen);
    } else {
      hamburger.current.classList.remove(styles.open);
      setMenuOpen(false);
      menuMobile.current.classList.remove(styles.menuOpen);
    }
  };

  const closeMenu = () => {
    // to close menu on shift from small to  large screen
    if (window.innerWidth >= 1200) {
      menuMobile && menuMobile.current.classList.remove(styles.menuOpen);
      hamburger && hamburger.current.classList.remove(styles.open);
      setMenuOpen(false);
    }
  };

  // for safe side
  window.addEventListener("resize", () => {
    // logoChange()
    closeMenu();
  });

  // empty function as onCLick can't work with && operator
  const notHandleMenu = () => {};
  const navItems = [
    { to: "about", item: "about" },
    { to: "services", item: "services" },
    { to: "info", item: "Join with us" },
    { to: "HIW", item: "how it works" },
    { to: "mobileApp", item: "download app" },
    { to: "reviews", item: "seller reviews" },
    { to: "payLater", item: "get credits" },
  ];
  return (
    <Box className={cx(styles.header, menuOpen && styles.headerWhite)}>
      <Box className={cx(styles.headerOnScroll, navbar && styles.active)}>
        <Container maxWidth="xl">
          <Box className={styles.nav}>
            <Box className={styles.logoContainer}>
              <Link
                to="hero"
                smooth={true}
                duration={1500}
                onClick={menuOpen ? handleMenu : notHandleMenu}
              >
                <img
                  className={styles.logoImage}
                  src={logo}
                  alt="logo"
                  style={{ fill: "rgb(40,121,255)", color: "rgb(40,121,255)" }}
                />
              </Link>
            </Box>
            <Box className={styles.desktop + " row_LP"}>
              {navItems.map((navItem) => (
                <Link
                  to={navItem.to}
                  smooth={true}
                  duration={1500}
                  className={styles.navItem}
                  offset={-50}
                  key={navItem.item}
                >
                  {navItem.item}
                </Link>
              ))}
            </Box>
            <Box className={styles.desktop + " row_LP"}>
              <Box mr={1}>
                <IconButton style={{ width: "65px" }}>
                  <img src={WhatsApp} alt="whatsapp icon" width="100%" />
                </IconButton>
              </Box>
              <Box className={styles.loginBtnContainer}>
                <Button
                  size="large"
                  className={cx(styles.btn, styles.loginBtn)}
                  onClick={() => navigate("/signin")}
                >
                  Login
                </Button>
              </Box>
            </Box>
            {/* mobile header hamburger */}
            <Box className={styles.mobile}>
              <Box>
                <Box
                  onClick={handleMenu}
                  className={styles.menuBtn}
                  ref={hamburger}
                >
                  <Box className={styles.menuBtnBurger + " text-primary_LP"} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      {/* mobile menu */}
      <Box
        className={cx(styles.mobileMenuContainer, styles.mobile)}
        ref={menuMobile}
      >
        <Box className={styles.mobileMenu}>
          <Box className={"column_LP"}>
            {navItems.map((navItem) => (
              <Link
                to={navItem.to}
                smooth={true}
                duration={1500}
                className={styles.navItem}
                offset={-50}
                onClick={handleMenu}
                key={navItem.item}
              >
                {navItem.item}
              </Link>
            ))}
          </Box>
          <Box mb={2}>
            <Button
              size="large"
              className={cx(styles.btn, styles.whatsAppBtn)}
              startIcon={
                <img src={WhatsApp} alt="whatsapp icon" width="100%" />
              }
              style={{
                fill: "#fff",
                color: "#fff",
                backgroundColor: "#4ced69",
              }}
            >
              WhatsApp
            </Button>
          </Box>
          <Box>
            <Button
              size="large"
              className={cx(styles.btn, styles.loginBtn)}
              onClick={() => navigate("/signin")}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

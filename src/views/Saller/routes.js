import React, { useState, useEffect } from "react";
import history from "../history";
import { Router, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Newlisting from "./Addlisting/Newlisting";
import Createsets from "./Addlisting/Createsets";
import Previewset from "./Addlisting/Previewset";
import Details from "./Addlisting/Details";
import Additional from "./Addlisting/Additional";
import ProductType from "./Addlisting/ProductType";
import ViewListing from "./Addlisting/ViewListing";
import Ordersaller from "./Ordersaller";

import { makeStyles } from "@material-ui/core/styles";
import Navsidebar from "./components/Navsidebar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import OrderDetails from "./Order/orderDetails";
import Returns from "./Returns";
import Payments from "./Payment/Payments";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Wholesaller</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Routes() {
  const classes = useStyles();

  const [sellerstatus, setsellerstatus] = useState([]);

  const fetchsellerstatus = async () => {
    const myModule = require("views/config");
    const response = await fetch(
      myModule.servername + "/api/fetchsellerstatus",
      {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`,
      }
    );
    const json = await response.json();
    setsellerstatus(json);
  };

  useEffect(() => {
    fetchsellerstatus();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <div className="navmob">
          <Navsidebar />
        </div>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Router history={history}>
              {sellerstatus == null ? (
                <>
                  <button
                    onClick={() => history.push("/applyseller")}
                    className="verify-styl"
                  >
                    Apply for Saller
                  </button>
                </>
              ) : (
                <>
                  {sellerstatus != null && sellerstatus.status == "approved" ? (
                    <>
                      <Route path="/saller/producttype" element={<Dashboard />} />
                      <Route path="/saller/producttype" element={<ProductType />} />
                      <Route path="/saller/newlisting" element={<Newlisting />} />
                      <Route path="/saller/createsets" element={<Createsets />} />
                      <Route path="/saller/previewset" element={<Previewset />} />
                      <Route path="/saller/details" element={<Details />} />
                      <Route path="/saller/additional" element={<Additional />} />
                      <Route path="/saller/payments" element={<Payments />} />
                      <Route path="/saller/viewlisting" element={<ViewListing />} />
                      <Route path="/saller/returns" element={<Returns />} />

                      <Route path="/saller/ordersaller" element={<Ordersaller />} />
                      <Route path="/saller/ordersaller/:id" element={<OrderDetails />} />

                    </>
                  ) : (
                    <>
                      <h1>
                        Your Saller Request is under verification once verify
                        you will get notification
                      </h1>
                    </>
                  )}
                </>
              )}
            </Router>
          </Container>
        </main>
      </div>

    </>
  );
}

export default Routes;

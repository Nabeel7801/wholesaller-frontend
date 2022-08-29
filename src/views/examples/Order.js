import React, { useState, useEffect } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
import axios from "axios";
import { Container } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Ordercard from "components/Card/Ordercard";
import { Tabs } from "antd";
import { Image } from "semantic-ui-react";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MainNavbar from "components/Navbars/MainNavbar";
import BuyerOrdercard from "components/Card/BuyerOrderCard";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

function Ordersaller() {
  const [orderid, setorderid] = React.useState(null);
  const classes = useStyles();

  const [open1, setOpen] = React.useState(false);

  const handleClickOpen = (orderid) => {
    setorderid(orderid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { TabPane } = Tabs;

  function callback(key) {
    ////console.log(key);
  }

  const [allorders, setallorders] = React.useState([]);

  const [totalpkg, settotalpkg] = React.useState();

  const [weight, setweightt] = React.useState();
  const [invoiveno, setinvoiveno] = React.useState();
  const [amount, setamount] = React.useState();

  const fetchallorders = async () => {
    var myModule = require("views/config");
    const response = await fetch(myModule.servername + "/api/buyerorder", {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`,
    });
    const json = await response.json();
    ////console.log(json)

    setallorders(json);
  };

  useEffect(() => {
    fetchallorders();
  }, []);

  const confirmorder = async () => {
    ////alert(allorders[orderid]._id)

    var object = {
      orderid: allorders[orderid]._id,
      totalpkg: totalpkg,
      weight: weight,
      invoiveno: invoiveno,
      amount: amount,
    };

    var myModule = require("views/config");
    axios
      .post(myModule.servername + "/api/confirmorder", object)
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
        fetchallorders();
        setOpen(false);
      });
  };
  const holdon = async (orderid) => {
    ////alert(allorders[orderid]._id)

    var object = {
      orderid: allorders[orderid]._id,
    };

    var myModule = require("views/config");
    axios.post(myModule.servername + "/api/holdonorder", object).then((res) => {
      ////console.log(res);
      ////console.log(res.data);
      fetchallorders();
    });
  };
  const cancelorder = async (orderid) => {
    var object = {
      orderid: allorders[orderid]._id,
    };

    var myModule = require("views/config");
    axios
      .post(myModule.servername + "/api/cancelorderclient", object)
      .then((res) => {
        ////console.log(res);
        ////console.log(res.data);
        fetchallorders();
      });
  };

  return (
    <div>
      {localStorage.getItem("wholesaller") != null ? (
        <>
          <MainNavbar />
        </>
      ) : (
        <IndexNavbar />
      )}
      <br />

      <div className="mt-0 lg:mt-20 px-6">
        <Container maxWidth="lg">
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Search"
            helperText=""
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="All" key="1">
              <BuyerOrdercard
                allorders={allorders}
                fetchallordersfun={fetchallorders}
                check={"buyer"}
              />

              <br />
            </TabPane>
            <TabPane tab="Pending" key="2">
              <BuyerOrdercard
                allorders={allorders.filter(
                  (book) => book.status === "pending"
                )}
                fetchallordersfun={fetchallorders}
                check={"buyer"}
              />
            </TabPane>
            <TabPane tab="Hold On" key="3">
              <BuyerOrdercard
                allorders={allorders.filter((book) => book.status === "holdon")}
                fetchallordersfun={fetchallorders}
                check={"buyer"}
              />
            </TabPane>
            <TabPane tab="Cancel" key="4">
              <BuyerOrdercard
                allorders={allorders.filter(
                  (book) => book.status.substring(0, 6) === "cancel"
                )}
                fetchallordersfun={fetchallorders}
                check={"buyer"}
              />
            </TabPane>

            <TabPane tab="Packed" key="5">
              <BuyerOrdercard
                allorders={allorders.filter(
                  (book) => book.status.substring(0, 6) === "packed"
                )}
                fetchallordersfun={fetchallorders}
                check={"buyer"}
              />
            </TabPane>
          </Tabs>
        </Container>
      </div>
      <DemoFooter />

      <div style={{ width: "80%" }}>
        <Dialog
          open={open1}
          onClose={handleClose}
          style={{ minWidth: 1200 }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Pickup</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              onChange={(e) => settotalpkg(e.target.value)}
              margin="dense"
              id="name"
              label="Number of Package"
              type="email"
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setweightt(e.target.value)}
              margin="dense"
              id="name"
              label="Total weight"
              type="email"
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setinvoiveno(e.target.value)}
              margin="dense"
              id="name"
              label="Invoice no"
              type="email"
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setamount(e.target.value)}
              margin="dense"
              id="name"
              label="Amount"
              type="email"
              fullWidth
            />

            <br />

            <TextField
              margin="dense"
              id="name"
              label="Address"
              type="email"
              fullWidth
            />

            <br />

            <TextField
              margin="dense"
              id="name"
              label="No. of Items"
              type="email"
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmorder} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Ordersaller;

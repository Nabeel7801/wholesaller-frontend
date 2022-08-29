import React, { useState, useEffect } from "react";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import { Tabs, Collapse } from "antd";
import { Image } from "semantic-ui-react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const { Panel } = Collapse;
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 18,
  },
  paper: {
    padding: "12px",
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
  orderInfo: {
    fontSize: "14px",
  },
  btnContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
}));

function BuyerOrdercard(props) {
  const [orderid, setorderid] = React.useState(null);
  const classes = useStyles();

  const [open1, setOpen] = React.useState(false);

  const handleClickOpen = (orderid) => {
    setorderid(orderid);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { TabPane } = Tabs;

  function callback(key) {}

  const [allorders, setallorders] = React.useState(props.allorders);

  const [totalpkg, settotalpkg] = React.useState();

  const [weight, setweightt] = React.useState();
  const [invoiveno, setinvoiveno] = React.useState();
  const [amount, setamount] = React.useState();
  const myModule = require("views/config");

  const confirmorder = async () => {
    var object = {
      orderid: props.allorders[orderid]._id,
      totalpkg: totalpkg,
      weight: weight,
      invoiveno: invoiveno,
      amount: amount,
    };

    axios
      .post(myModule.servername + "/api/confirmorder", object)
      .then((res) => {
        setOpen(false);
        props.fetchallordersfun();
      });
  };
  const holdon = async (orderid) => {
    var object = {
      orderid: props.allorders[orderid]._id,
    };

    axios.post(myModule.servername + "/api/holdonorder", object).then((res) => {
      props.fetchallordersfun();
    });
  };

  const shipped = async (orderid) => {
    var object = {
      orderid: props.allorders[orderid]._id,
    };

    axios
      .post(myModule.servername + "/api/shippedorder", object)
      .then((res) => {
        props.fetchallordersfun();
      });
  };

  const cancelorder = async (orderid) => {
    var object = {
      orderid: props.allorders[orderid]._id,
    };

    if (props.check == "seller") {
      axios
        .post(myModule.servername + "/api/cancelorder", object)
        .then((res) => {
          props.fetchallordersfun();
        });
    } else if (props.check == "buyer") {
      axios
        .post(myModule.servername + "/api/cancelorderclient", object)
        .then((res) => {
          props.fetchallordersfun();
        });
    }
  };

  // const cancelorderbyclient = async orderid => {
  //   var object = {
  //     orderid: allorders[orderid]._id,
  //   };

  // };

  return (
    <div>
      {props.allorders.map((s, i) => (
        <>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs={8} container direction="column">
                  <Grid item xs={12}>
                    <Typography
                      className={`text-green-700 ${classes.orderInfo}`}
                    >
                      Orderid:{s._id}
                      <Typography
                        className={`text-green-700 ${classes.orderInfo}`}
                      >
                        Status:{s.status}
                      </Typography>
                      <Typography
                        className={`text-green-700 ${classes.orderInfo}`}
                      >
                        Store Name:{s.sellersBusinessdata.businessname}
                      </Typography>
                      <br></br>
                      <Typography
                        className={`text-green-700 ${classes.orderInfo}`}
                      >
                        Total: ₹ {s.totalprice}
                      </Typography>
                      <Typography
                        className={`text-green-700 ${classes.orderInfo}`}
                      >
                        Order Created:
                        {moment(s.time).format("YYYY-MM-DD HH:mm")}
                      </Typography>
                    </Typography>
                  </Grid>

                  {s.shipmentdetails != "" ? (
                    <>
                      <Grid container spacing={1}>
                        <Grid item xs={8}>
                          <div class="ui message">
                            <div class="content">
                              <div className="smalltopmargin">
                                Amount:{s.shipmentdetails[0].amount}
                              </div>
                              <div className="smalltopmargin">
                                Amount:{s.shipmentdetails[0].amount}
                              </div>
                              <div className="smalltopmargin">
                                totalpkg:{s.shipmentdetails[0].totalpkg}
                              </div>
                              <div className="smalltopmargin">
                                weight:{s.shipmentdetails[0].weight}
                              </div>
                              <div className="smalltopmargin">
                                invoiveno:{s.shipmentdetails[0].invoiveno}
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
                <Grid item xs={4} className={classes.btnContainer}>
                  <div
                    className="flex items-center flex-end"
                    style={{ transform: "scale(.8) translateY(-10px)" }}
                  >
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Button onClick={() => cancelorder(i)}>Cancel</Button>
                  </div>
                  {s.status != "packed" ? (
                    <>
                      {props.check == "seller" || props.check == "admin" ? (
                        <>
                          <Button onClick={() => handleClickOpen(i)}>
                            {" "}
                            Pickup
                          </Button>
                          <Button onClick={() => holdon(i)}>On Hold</Button>
                        </>
                      ) : null}
                    </>
                  ) : null}

                  {s.status == "packed" && props.check == "admin" ? (
                    <>
                      <Button onClick={() => shipped(i)}>Shipped</Button>
                    </>
                  ) : null}

                  {/* </MenuItem> */}
                  {/* <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      }}
                    >
                      <MenuItem onClick={() => holdon(i)}>On Hold</MenuItem>
                      <MenuItem onClick={() => handleClickOpen(i)}>
                        Pickup
                      </MenuItem>
                      <MenuItem onClick={() => cancelorder(i)}>Cancel</MenuItem>
                    </Menu> */}
                </Grid>
              </Grid>
            </Paper>
          </div>
        </>
      ))}

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

export default BuyerOrdercard;

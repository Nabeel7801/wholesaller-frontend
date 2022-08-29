/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

import axios from "axios";
import cx from "classnames";
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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Info } from "@material-ui/icons";

const { Panel } = Collapse;
const ITEM_HEIGHT = 48;

// const StyledTableCell((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);
const useStyles = makeStyles((theme) => ({
  tableContainer: {},
  root: {
    flexGrow: 1,
    marginTop: 18,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
  tableHeadCell: {
    padding: "8px 10px 8px 10px",
    fontSize: "14px",
    fontWeight: "bold",
    minWidth: "70px",
    [theme.breakpoints.down("md")]: {
      padding: "8px 6px 8px 6px",
      fontSize: "12px",
    },
  },
  tableHeadCellId: {
    // maxWidth: "180px",
    // minWidth: "100px",
  },
  tableHeadCellStatus: {
    minWidth: "160px",
  },
  tableHeadCellStore: {
    minWidth: "130px",
  },
  tableHeadCellMode: {
    maxWidth: "70px",
  },
  tableHeadCellTotal: {
    maxWidth: "70px",
  },
  tableHeadCellOrderPlaced: {
    maxWidth: "180px",
    minWidth: "150px",
  },
  tableHeadCellStatusTimer: {
    maxWidth: "200px",
    textAlign: "center",
    minWidth: "150px",
  },
  tableHeadCellView: {
    textAlign: "center",
    borderLeft: "1px solid #e3e3e3",
  },
  tableBodyView: {
    borderLeft: "1px solid #e3e3e3",
  },
  bodyCell: {
    color: "#0e0e0e",
    fontWeight: "500",
  },
  idContainer: {
    display: "flex",
    alignItems: "center",
  },

  viewBtn: {
    // background: "#8656c0",
    color: "#fff",
  },
  cancelText: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
    display: "block",
  },
  cancelTextLong: {
    fontSize: "12px",
    marginTop: "4px",
    textAlign: "center",
    display: "block",
    fontWeight: "500",
  },
  status: {
    borderRadius: "2px",
    padding: "5px 0",
    fontSize: "10px",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  statusRelatedText: {
    fontSize: "10px",
    fontWeight: "400",
    textAlign: "center",
    margin: 0,
  },
  cancelled: {
    background: "red",
  },
  pending: {
    background: "grey",
  },
  holdOn: {
    background: "#fd6114",
  },
  packed: {
    background: "violet",
  },
  shipped: {
    background: "green",
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

function Ordercard(props) {
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
      <TableContainer>
        <Table className={classes.table} aria-label=" table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell
                className={cx(classes.tableHeadCell, classes.tableHeadCellId)}
              >
                Order Id
              </TableCell>
              <TableCell
                align=""
                className={cx(
                  classes.tableHeadCell,
                  classes.tableHeadCellStatus
                )}
              >
                Status
              </TableCell>
              <TableCell
                align=""
                className={cx(
                  classes.tableHeadCell,
                  classes.tableHeadCellStore
                )}
              >
                Store Name
              </TableCell>
              <TableCell
                align=""
                className={cx(classes.tableHeadCell, classes.tableHeadCellMode)}
              >
                Mode
              </TableCell>
              <TableCell
                align=""
                className={cx(
                  classes.tableHeadCell,
                  classes.tableHeadCellTotal
                )}
              >
                Total
              </TableCell>
              <TableCell
                align=""
                className={cx(
                  classes.tableHeadCell,
                  classes.tableHeadCellOrderPlaced
                )}
              >
                Order Placed At
              </TableCell>
              <TableCell
                align=""
                className={cx(
                  classes.tableHeadCell,
                  classes.tableHeadCellStatusTimer
                )}
              >
                Live Timer
              </TableCell>
              <TableCell
                align=""
                className={cx(classes.tableHeadCell, classes.tableHeadCellView)}
              >
                <IconButton>
                  <Info />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allorders.map((s, i) => (
              <>
                <TableRow key="name">
                  {/* <StyledTableCell align="">12</StyledTableCell> */}

                  <TableCell align="" className={classes.bodyCell}>
                    {s.status === "pending" ? (
                      <div className={classes.idContainer}>
                        <div className={"blinker"} />
                        {s._id}
                      </div>
                    ) : (
                      s._id
                    )}
                  </TableCell>
                  <TableCell align="" className={classes.bodyCell}>
                    <div>
                      <p
                        className={cx(
                          classes.status,
                          s.status === "cancel by seller"
                            ? classes.cancelled
                            : s.status === "pending"
                            ? classes.pending
                            : s.status === "holdon"
                            ? classes.holdOn
                            : s.status === "packed"
                            ? classes.packed
                            : s.status === "shipped" && classes.shipped
                        )}
                      >
                        Order
                        {s.status === "cancel by seller" || "cancel by customer"
                          ? " Cancelled"
                          : s.status === "pending"
                          ? " Pending"
                          : s.status === "holdon"
                          ? " Holdon"
                          : s.status === "packed"
                          ? " Packed"
                          : s.status === "shipped" && " Shipped"}
                      </p>
                      <p className={classes.statusRelatedText}>
                        Order By: Prayash
                      </p>
                      <p className={classes.statusRelatedText}>
                        Delivered by: Jaden Smith
                      </p>
                    </div>
                  </TableCell>

                  <TableCell align="" className={classes.bodyCell}>
                    {s.sellersBusinessdata.businessname}
                  </TableCell>
                  <TableCell align="" className={classes.bodyCell}>
                    Wallet
                  </TableCell>
                  <TableCell align="" className={classes.bodyCell}>
                    ₹{s.totalprice}
                  </TableCell>
                  <TableCell align="" className={classes.bodyCell}>
                    {moment(s.time).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell align="" className={classes.bodyCell}>
                    <Typography variant="p" className={classes.cancelText}>
                      Cancelled in
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.cancelTextLong}
                    >
                      1 week, 11 hours, 6 minutes, 10 seconds
                    </Typography>
                  </TableCell>
                  <TableCell
                    align=""
                    className={cx(classes.tableBodyView, classes.bodyCell)}
                  >
                    <Button
                      className={classes.viewBtn}
                      variant="contained"
                      color="primary"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}

            {/* <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}></ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h6"></Typography>

                      <Typography className="text-red-500"></Typography>

                      <Typography className="text-green-700">
                        Orderid:{s._id}
                        <Typography className="text-green-700">
                          Status:{s.status}
                        </Typography>
                        <Typography className="text-green-700">
                          Store Name:{s.sellersBusinessdata.businessname}
                        </Typography>
                        <br></br>
                        <Typography className="text-green-700">
                          Total: ₹ {s.totalprice}
                        </Typography>
                        <Typography className="text-green-700">
                          Order Created:
                          {moment(s.time).format("YYYY-MM-DD HH:mm")}
                        </Typography>
                        <br></br>
                      </Typography>
                    </Grid>

                    {s.carddata.products.map((productss, producti) => (
                      <>
                        <Grid container spacing={1}>
                          <Grid item xs={1}>
                            <img
                              src={productss.mainimg}
                              class="ui tiny top aligned image"
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="h6" gutterBottom>
                              {productss.productname}
                            </Typography>

                            <div class="ui divider"></div>
                          </Grid>
                        </Grid>
                        <Collapse ghost>
                          <Panel header="see more" key={producti}>
                            {productss.sets.map((setss, setsi) => (
                              <>
                                <Grid container spacing={1}>
                                  <Grid item xs={8}>
                                    <div class="ui message">
                                      <div class="content">
                                        <div class="header">
                                          <img
                                            src={setss.pic}
                                            class="ui tiny right floated image"
                                          />
                                          <div className="smalltopmargin">
                                            Color:{" "}
                                            {setss.setcolor.map((y, u) => (
                                              <>{y},</>
                                            ))}
                                          </div>

                                          <div className="smalltopmargin">
                                            Size :{" "}
                                            {setss.sizes.map((y, u) => (
                                              <>{y},</>
                                            ))}
                                          </div>
                                        </div>

                                        <div class="ui divider"></div>
                                        <div className="float-right  w-20"></div>

                                        <span class="">
                                          ₹ {setss.priceofset} per set
                                        </span>
                                      </div>
                                    </div>
                                  </Grid>
                                </Grid>
                              </>
                            ))}
                          </Panel>
                        </Collapse>

                        <br />
                      </>
                    ))}

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
                  <Grid item>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Button onClick={() => cancelorder(i)}>Cancel</Button>

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
                  </Grid>
                </Grid>
              </Grid>
            </Paper> */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div style={{ width: '80%' }}>
        <Dialog
          open={open1}
          onClose={handleClose}
          style={{ minWidth: 1200 }}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Pickup</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              onChange={(e) => settotalpkg(e.target.value)}
              margin='dense'
              id='name'
              label='Number of Package'
              type='email'
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setweightt(e.target.value)}
              margin='dense'
              id='name'
              label='Total weight'
              type='email'
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setinvoiveno(e.target.value)}
              margin='dense'
              id='name'
              label='Invoice no'
              type='email'
              fullWidth
            />
            <br />

            <TextField
              onChange={(e) => setamount(e.target.value)}
              margin='dense'
              id='name'
              label='Amount'
              type='email'
              fullWidth
            />

            <br />

            <TextField
              margin='dense'
              id='name'
              label='Address'
              type='email'
              fullWidth
            />

            <br />

            <TextField
              margin='dense'
              id='name'
              label='No. of Items'
              type='email'
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={confirmorder} color='primary'>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div> */}
    </div>
  );
}

export default Ordercard;

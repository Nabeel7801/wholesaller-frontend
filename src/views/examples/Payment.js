import React, { useState, useEffect } from "react";
import Footer from "components/Footers/DemoFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import { toast } from "react-toastify";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Buttonui from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import moment from "moment";
import ErrorIcon from "@material-ui/icons/Error";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import IndexNavbar from "components/Navbars/IndexNavbar";
import { useDispatch, useSelector } from "react-redux";
import { updatecart } from "views/action/updatecart";
import history from "views/history";

import { Label, FormGroup, Button, Container, Row, Col } from "reactstrap";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";

import { Delete, NavigateNext, PaymentOutlined } from "@material-ui/icons";
import MainNavbar from "components/Navbars/MainNavbar.js";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  deliverypaper: {
    padding: "20px 12px ",
    cursor: "pointer",
  },
}));

function getSteps() {
  return ["Address", "Order Summary", "Payment"];
}

function GetStepContent(stepIndex) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("a");
  const [name, setname] = useState("");
  const [cardno, setcardno] = useState("");
  const [cvv, setcvv] = useState("");
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const dispatch = useDispatch();
  const datafromstore = useSelector(
    (state) => state.cartdetailarray.mycartdetails
  );

  const url = window.location.pathname;
  const array = url.split("/");

  const lastsegment = array[array.length - 1];
  const thiscard = datafromstore[lastsegment];
  const arr = JSON.parse(localStorage.getItem("mycart")) || [];

  var cartstate = arr[lastsegment];
  console.log(cartstate);

  const handlepayment = async () => {
    var orderId = Math.floor(Math.random() * 1000000000);
    var orderAmount = calculatetotal(lastsegment);
    var customerName = JSON.parse(
      localStorage.getItem("wholesaller")
    ).firstName;
    var customerEmail = JSON.parse(localStorage.getItem("wholesaller")).email;
    var customerPhone = JSON.parse(localStorage.getItem("wholesaller")).phone;
    var orderCurrency = "INR";
    var appId = "32483bc73fec2f19ee4102e2838423";
    var returnUrl = "https://fairdeel.in/api/response";
    var notifyUrl = "https://www.cashfree.com/";

    var orderNote = "lkdjls";

    var link =
      "https://fairdeel.in/api/request/" +
      appId +
      "/" +
      orderId +
      "/" +
      orderAmount +
      "/" +
      orderCurrency +
      "/" +
      orderNote +
      "/" +
      customerName +
      "/" +
      customerPhone;

    window.location.href = link;
  };

  const paynow = async (maini) => {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];
    // alert(totalprice);

    var totalprice = 0;

    for (var i = 0; i < arr[maini].products.length; i++) {
      for (var j = 0; j < arr[maini].products[i].sets.length; j++) {
        totalprice =
          totalprice +
          arr[maini].products[i].sets[j].qty *
            arr[maini].products[i].sets[j].priceofset;
      }
    }

    var objectdata = {
      carddata: arr[maini],
      buyerid: JSON.parse(localStorage.getItem("wholesaller"))._id,
    };

    var carddata = arr[maini];
    var buyerid = JSON.parse(localStorage.getItem("wholesaller"))._id;

    var status = "pending";

    var myModule = require("views/config");
    axios
      .post(myModule.servername + "/api/order", {
        carddata,
        buyerid,
        status,

        totalprice,
      })
      .then((res) => {
        localStorage.setItem("orderPlaced", true);
        history.push("/");
      });
  };

  const handlepaymentcod = async () => {
    ////  paynow(lastsegment);
    var orderId = Math.floor(Math.random() * 1000000000);
    var orderAmount = 300;
    var customerName = JSON.parse(
      localStorage.getItem("wholesaller")
    ).firstName;
    var customerEmail = JSON.parse(localStorage.getItem("wholesaller")).email;
    var customerPhone = JSON.parse(localStorage.getItem("wholesaller")).phone;
    var orderCurrency = "INR";
    var appId = "32483bc73fec2f19ee4102e2838423";
    var returnUrl = "http://localhost:5000/api/response";
    var notifyUrl = "https://www.cashfree.com/";

    var orderNote = "lkdjls";

    var link =
      /// "http://localhost:5000/api/request/" +
      "https://fairdeel.in/api/request/" +
      appId +
      "/" +
      orderId +
      "/" +
      orderAmount +
      "/" +
      orderCurrency +
      "/" +
      orderNote +
      "/" +
      customerName +
      "/" +
      customerPhone;

    window.location.href = link;
  };

  function calculatetotal(maini) {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];
    var totalsum = 0;
    for (var i = 0; i < arr[maini].products.length; i++) {
      for (var j = 0; j < arr[maini].products[i].sets.length; j++) {
        totalsum =
          totalsum +
          arr[maini].products[i].sets[j].qty *
            arr[maini].products[i].sets[j].priceofset;
      }
    }

    return totalsum;
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const address = localStorage.getItem("address");
  switch (stepIndex) {
    case 0:
      return (
        <div>
          <div className="text-base font-bold flex items-start ">
            <span className="mr-2">Address: </span>
            <span>{address && address}</span>
          </div>
          <div>
            <br />

            <Grid container>
              <Grid item xs={12}>
                <p class="text-base font-bold">
                  Total of shop : ₹{calculatetotal(lastsegment)}
                </p>
              </Grid>
            </Grid>
          </div>
          <Card className={classes.root}></Card>
          <div>
            <div className="mt-2">
              <Paper
                className={classes.deliverypaper}
                onClick={() => paynow(lastsegment)}
              >
                <div className="flex items-center ">
                  <div>
                    <IconButton color="primary">
                      <PaymentOutlined />
                    </IconButton>
                  </div>
                  <div className="flex-1 ml-2">
                    <p className="text-base font-semibold">Cash On Delivery</p>
                  </div>
                  <div>
                    <IconButton color="primary">
                      <NavigateNext />
                    </IconButton>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
          <br />
          <Row>
            <Col lg="4" md="4" sm="6" xs="6">
              <div class="ui statistic">
                <div className="price-styl">View Price Details</div>
              </div>
            </Col>
          </Row>
          {/* diloag box */}
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Pay only ₹300 now"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Pay advance and order now.
                <br />
                Pay the balance of ₹3,149 at the time of delivery
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Buttonui autoFocus onClick={handleClose} color="">
                Cancel
              </Buttonui>
              <Buttonui onClick={handlepaymentcod} color="primary" autoFocus>
                Okay, Got It
              </Buttonui>
            </DialogActions>
          </Dialog>
        </div>
      );
    case 1:
      return (
        <>
          <div>
            <Container maxWidth="lg">
              <br />

              <Grid container spacing={1}>
                <Grid item xs={7}>
                  <p class="text-base font-bold">
                    {" "}
                    Total of shop : ₹{calculatetotal(lastsegment)}{" "}
                  </p>
                </Grid>
              </Grid>
            </Container>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <br />

          <Card className={classes.root}></Card>

          <br />

          <Card className={classes.root}>
            <CardContent>
              <Buttonui
                variant="contained"
                size="large"
                color="primary"
                onClick={() => paynow(lastsegment)}
              >
                Cash On Delivery
              </Buttonui>
            </CardContent>
          </Card>

          <br />
          <Row>
            <Col lg="4" md="4" sm="6" xs="6">
              <div class="ui statistic">
                <div class="value">₹{calculatetotal(lastsegment)}</div>
                <div className="price-styl">View Price Details</div>
              </div>
            </Col>
          </Row>
          {/* diloag box */}

          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Pay only ₹300 now"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Pay advance and order now.
                <br />
                Pay the balance of ₹3,149 at the time of delivery
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Buttonui autoFocus onClick={handleClose} color="">
                Cancel
              </Buttonui>
              <Buttonui onClick={handlepaymentcod} color="primary" autoFocus>
                Okay, Got It
              </Buttonui>
            </DialogActions>
          </Dialog>
        </>
      );
    default:
      return "Unknown stepIndex";
  }
}

function Payment() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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

      <Container>
        <div className=" px-4">
          <div className=" mt-2 ">
            <h2 className="blackbold">Payments</h2>
          </div>
          <br />

          <div className={classes.root}>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {GetStepContent(activeStep)}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Payment;

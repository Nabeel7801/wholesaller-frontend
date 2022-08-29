import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { Image } from "antd";
import { Container, Typography, Paper, Grid, Collapse, Button as Buttonui, Dialog, AppBar, Toolbar, Slide } from "@material-ui/core";

import MainNavbar from "components/Navbars/MainNavbar";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Footer from "components/Footers/Footer";

import { updatecart } from "views/action/updatecart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 40,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    color: "white",
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const config = require("views/config");

function Productdetails() {

  const [open, setOpen] = useState(false);
  const { productID } = useParams();  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {setExpanded(!expanded)}

  const [productqty, setproductqty] = useState("1")

  const datafromstore = useSelector(state =>
    state.productarray.allproductarray.filter(
      product => product._id === productID
    )
  );
  const [productDetails, setProductDetails] = useState(datafromstore[0]);

  useEffect(() => {
    // Fetch Data
    if (!productDetails) {
      axios.post(`${config.servername}/getProductByID/${productID}`)
      .then(response => {
        if (response.data) {
          setProductDetails(response.data);
        }
      })
    }

  }, [productDetails]);

  const [currentstatus, setcurrentstatus] = useState("");
  // const fetchcurrentstatus = async () => {
  //   const response = await fetch(
  //     config.servername + "/api/fetchcurrentstatus",
  //     {
  //       method: "post",
  //       headers: {
  //         "content-type": "application/x-www-form-urlencoded; charset=utf-8",
  //       },
  //       body: `id=${JSON.parse(localStorage.getItem("wholesaller"))._id}`
  //     }
  //   );
  //   const json = await response.json();
  //   //// alert(json.status)
  //   setcurrentstatus(json);
  // };
  // useEffect(() => {
  //   fetchcurrentstatus();
  // }, []);

  const addtocart = async (
    sizes,
    img,
    title,
    shopname,
    userid,
    total,
    setno,
    setcolor,
    setqty,
    mainimage,
    businessname,
    businessimage,
    category
  ) => {
    const setsobject = {
      setno: setno,
      pic: img,
      sizes: sizes,
      priceofset: total,

      setcolor: setcolor,
      setqty: setqty,
      qty: parseInt(productqty),
    };

    var setarray = [];
    setarray.push(setsobject);

    const object = {
      mainimg: mainimage,
      productid: productID,

      productname: title,
      total: parseInt(productqty) * total,
      sets: setarray,
    };

    var products = [];
    products.push(object);
    const mainobject = {
      shopid: userid,
      shopname: businessname,
      shopimage: businessimage,
      category: category,
      products: products,
    };

    const arr = JSON.parse(localStorage.getItem("mycart")) || [];

    var checkshop = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]?.shopid == userid) {
        checkshop = 1;
        var checkproduct = 0;

        for (var j = 0; j < arr[i].products.length; j++) {
          if (arr[i]?.products[j]?.productid == productID) {
            checkproduct = 1;
            var checksets = 0;
            for (var k = 0; k < arr[i]?.products[j]?.sets?.length; k++) {
              if (arr[i].products[j].sets[k].setno == setno) {
                ///// alert("already have set")
                checksets = 1;
                if (arr[i].products[j].sets[k].qty) {
                  arr[i].products[j].sets[k].qty =
                    arr[i].products[j].sets[k].qty + parseInt(productqty);
                }
              }
            }
            if (checksets == 0) {
              //alert("already have no  set")
              if (arr[i]?.products[j]?.sets) {
                arr[i].products[j].sets.push(setsobject);
              }
            }
          }
        }

        if (checkproduct == 0) {
          if (arr[i].products) {
            arr[i].products.push(object);
          }
        }
      }
    }

    if (checkshop == 0) {
      arr.push(mainobject);
    }

    localStorage.setItem("mycart", JSON.stringify(arr));

    dispatch(updatecart("updatecart"));
    setproductqty("1");
    handleClose();
  };

  const classes = useStyles();
  return (
    <div>
      {productDetails ? (
        <>

          {localStorage.getItem("wholesaller") != null ? (
            <>
              <MainNavbar />
            </>
          ) : (
            <IndexNavbar />
          )}

          <div className="pb-40">
            <Container maxWidth="lg">
              <div className={classes.root}>
                <Grid container spacing={6}>
                  <Grid item lg={5} md={6} xs={12} sm={12}>
                    <Image
                      src={`${config.servername}/readfiles/${productDetails.image}`}
                      preview={false}
                    />

                    <br />

                    {currentstatus?.status === "approved" ? 
                      <Buttonui
                        variant="contained"
                        style={{ width: "100%" }}
                        color="primary"
                        onClick={handleClickOpen}
                      >
                        Buy
                      </Buttonui>
                    : 
                      <button
                        onClick={() => navigate("/verifydocument")}
                        className="verify-styl"
                      >
                        Verify now to start order
                      </button>
                    }
                  </Grid>

                  <Grid item lg={5} md={6} xs={12} sm={12}>
                    <div className="text-styl">
                      {" "}
                      {productDetails.reference}
                    </div>
                    <a href="#" className="product-link">
                      {productDetails.users?.firstName}
                    </a>
                    <div className="product-price"></div>
                    
                    <Paper elevation={3} className={classes.paper}>
                      <div className="product-detail">
                        <h4>Specifications</h4>
                        <table class="ui celled collapsing very basic table">
                          <tbody class="">
                            {productDetails.maindetails?.tags?.map(
                              (s, i) => (
                                <tr class="">
                                  <td class="blackbold"> {s.maintag}</td>

                                  <td class="font-semibold text-gray-600">
                                    {s?.subtag?.map((o, i2) => (
                                      <>{o} &nbsp;</>
                                    ))}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </Paper>

                    <br />
                    {productDetails.storeallsets?.storeallsets?.map(
                      (s, setno) => (
                        <>
                          <div class="ui message">
                            <div class="content">
                              <div class="header">
                                <img
                                  src={
                                    config.servername + "/readfiles/" + s[0].img
                                  }
                                  class="ui tiny right floated image"
                                />

                                <div className="smalltopmargin">
                                  Color:{" "}
                                  {s?.map((a, b) => (
                                    <>{a.color},</>
                                  ))}
                                </div>

                                <div className="smalltopmargin">
                                  Sizes:
                                  {s[0]?.sizes?.map((y, u) => (
                                    <>{y},</>
                                  ))}
                                </div>
                              </div>
                              <div className="smalltopmargin">
                                Set of{" "}
                                {
                                  productDetails.setdetails?.setdetails[
                                    setno
                                  ]?.availablesetquantity
                                }
                              </div>

                              <Buttonui
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                color="primary"
                              >
                                See more
                              </Buttonui>

                              <Collapse
                                in={expanded}
                                timeout="auto"
                                unmountOnExit
                              >
                                <table class="ui celled table">
                                  <thead class="">
                                    <tr class="">
                                      <th class="">Color</th>
                                      <th class="">Size (Qty)</th>
                                    </tr>
                                  </thead>
                                  <tbody class="">
                                    {s?.map((a, b) => (
                                      <>
                                        <tr class="">
                                          <td class="blackbold">{a.color} </td>
                                          <td class="blackbold">
                                            {a?.sizes?.map((g, h) => (
                                              <>
                                                {g}({a.qty[h]}),
                                              </>
                                            ))}

                                            <img
                                              src={
                                                config.servername +
                                                "/readfiles/" +
                                                a.img
                                              }
                                              class="ui mini spaced image float-right"
                                            />
                                          </td>
                                        </tr>
                                      </>
                                    ))}
                                  </tbody>
                                </table>
                              </Collapse>

                              <div class="ui divider"></div>
                              <span class="ui right floated image">
                                Min. qty.
                                <br />
                                <span className="blackbold">
                                  1 set
                                </span>
                              </span>

                              <span class="">
                                ₹ {productDetails?.price} per pc (contains 1 pcs)
                              </span>

                              <div className="subtitle-styl">
                                total: {productDetails.price}
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    )}
                  </Grid>

                </Grid>
              </div>
            </Container>
          </div>
          <DemoFooter />

          <Footer />

          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {productDetails?.reference}
                </Typography>
              </Toolbar>
            </AppBar>

            {productDetails ? (
              <>
                {productDetails?.storeallsets?.storeallsets?.map(
                  (s, setno) => (
                    <>
                      <div class="ui message">
                        <div class="content">
                          <div class="header">
                            <img
                              src={
                                config.servername + "/readfiles/" + s[0]?.img
                              }
                              class="ui tiny right floated image"
                            />

                            <div className="smalltopmargin">
                              Color:{" "}
                              {s?.map((a, b) => (
                                <>{a.color},</>
                              ))}
                            </div>

                            <div className="smalltopmargin">
                              Sizes:
                              {s[0]?.sizes?.map((y, u) => (
                                <>{y},</>
                              ))}
                            </div>
                          </div>
                          <div className="smalltopmargin">
                            Set of{" "}
                            {
                              productDetails?.setdetails?.setdetails[setno]
                                .availablesetquantity
                            }
                          </div>

                          <Buttonui
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            color="primary"
                          >
                            See more
                          </Buttonui>

                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <table class="ui celled table">
                              <thead class="">
                                <tr class="">
                                  <th class="">Color</th>
                                  <th class="">Size (Qty)</th>
                                </tr>
                              </thead>
                              <tbody class="">
                                {s?.map((a, b) => (
                                  <>
                                    <tr class="">
                                      <td class="blackbold">{a.color} </td>
                                      <td class="blackbold">
                                        {a?.sizes?.map((g, h) => (
                                          <>
                                            {g}({a.qty[h]}),
                                          </>
                                        ))}
                                      </td>
                                    </tr>
                                  </>
                                ))}
                              </tbody>
                            </table>
                          </Collapse>

                          <div class="ui divider"></div>
                          <span class="ui right floated image">
                            Min. qty.
                            <br />
                            <span className="blackbold">
                              {s[0]?.minsettoorder} set
                            </span>
                          </span>

                          <span class="">
                            ₹{" "}
                            {
                              productDetails?.setdetails?.setdetails[setno]
                                .priceperpiece
                            }{" "}
                            per pc (contains{" "}
                            {
                              productDetails?.setdetails?.setdetails[setno]
                                .availablesetquantity
                            }{" "}
                            pcs)
                          </span>
                          <div className="subtitle-styl">
                            total:{" "}
                            {productDetails?.setdetails?.setdetails[setno]
                              .availablesetquantity *
                              productDetails?.setdetails?.setdetails[setno]
                                .priceperpiece}
                          </div>
                        </div>
                      </div>

                      <div className="purchase-info">
                        <input
                          type="number"
                          value={productqty}
                          onChange={(e) => setproductqty(e.target.value)}
                          min={0}
                          defaultValue={1}
                        />
                        <button
                          onClick={() =>
                            addtocart(
                              s[0]?.sizes,
                              config.servername + "/readfiles/" + s[0]?.img,
                              productDetails?.maindetails.title,
                              productDetails?.users.firstName,
                              productDetails?.users._id,
                              productDetails?.setdetails.setdetails[setno]
                                .availablesetquantity *
                                productDetails?.setdetails.setdetails[
                                  setno
                                ].priceperpiece,
                              setno,
                              s[0]?.color,
                              s[0]?.qty,
                              config.servername +
                                "/readfiles/" +
                                productDetails?.maindetails?.mainimage,
                              productDetails?.seller?.businessname,

                              productDetails?.users?.profileImg,
                              productDetails?.seller?.businesstype
                            )
                          }
                          type="button"
                          className="btn"
                        >
                          Add to Cart <i className="fas fa-shopping-cart" />
                        </button>
                      </div>
                    </>
                  )
                )}
              </>
            ) : null}
          </Dialog>
        </>
      ) : null}
    </div>
  );
}

export default Productdetails;

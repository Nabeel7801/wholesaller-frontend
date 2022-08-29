import React, { useEffect, useState } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MainNavbar from "components/Navbars/MainNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {
  Delete,
  Remove,
  Add,
  ShoppingCart,
  ArrowForwardIos,
  LocationOn,
} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import { updatecart } from "views/action/updatecart";
import history from "views/history";
import { Link } from "react-router-dom";

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
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  delete: {
    display: "flex",
    marginLeft: "auto",
  },
  next: {
    display: "flex",
    justifyContent: "flex-end",
  },
  address: {
    fontSize: "12px",
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "60%",
    height: "18px",
  },
  addAddress: {
    fontWeight: "700",
    fontSize: "14px",
  },
  // location: {
  //   fill: theme.colors.primary,
  // },
}));

function Cart() {
  const dispatch = useDispatch();
  const datafromstore = useSelector(
    (state) => state.cartdetailarray.mycartdetails
  );

  const [cartstate, setcartstate] = useState(datafromstore);

  const removefromcart = async (myid) => {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];

    arr.splice(myid, 1);

    localStorage.setItem("mycart", JSON.stringify(arr));

    dispatch(updatecart("updatecart"));

    setcartstate(datafromstore);
  };

  const paynow = async (maini) => {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];

    var totalprice = 0;

    for (var i = 0; i < arr[maini].products?.length; i++) {
      for (var j = 0; j < arr[maini].products[i]?.sets.length; j++) {
        totalprice =
          totalprice +
          arr[maini].products[i].sets[j].qty *
            arr[maini].products[i].sets[j].priceofset;
      }
    }

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
      .then((res) => {});
  };

  const deleteshop = async (maini) => {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];

    arr.splice(maini, 1);
    localStorage.setItem("mycart", JSON.stringify(arr));

    setcartstate(arr);
  };

  const deleteset = async (maini, producti, seti) => {
    ////alert(maini+seti)
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];
    ///arr[maini].sets[seti]

    arr[maini].products[producti].sets.splice(seti, 1);
    localStorage.setItem("mycart", JSON.stringify(arr));

    setcartstate(arr);
  };

  const changeqty = async (e, maini, producti, seti) => {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];

    arr[maini].products[producti].sets[seti].qty = parseInt(e.target.value);
    console.log("arr", parseInt(e.target.value));
    localStorage.setItem("mycart", JSON.stringify(arr));

    setcartstate(arr);
  };
  const addqty = async (value, maini, producti, seti) => {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];

    arr[maini].products[producti].sets[seti].qty = parseInt(value);

    localStorage.setItem("mycart", JSON.stringify(arr));

    setcartstate(arr);
  };
  const removeqty = async (value, maini, producti, seti) => {
    const arr = JSON.parse(localStorage.getItem("mycart")) || [];

    arr[maini].products[producti].sets[seti].qty = parseInt(value);
    localStorage.setItem("mycart", JSON.stringify(arr));
    console.log("remove arr", arr);

    setcartstate(arr);
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
  let total = 0;

  // useEffect(() => {
  cartstate != null &&
    cartstate.map((mains, maini) => {
      return mains.products.map((productss, producti) => {
        return productss.sets.map((setss, setsi) => {
          {
            const quantity = productss.sets.reduce((s, { qty }) => qty, 0);
            total += quantity;
          }
        });
      });
    });
  // }, []);

  const classes = useStyles();
  const defaultAddress = localStorage.getItem("address")
    ? localStorage.getItem("address")
    : "";
  const handleContinue = (maini) => {
    if (!defaultAddress) {
      window.alert("Please add your address");
    } else {
      history.push("/payment/" + maini);
    }
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
      <br />
      <Container maxWidth="lg">
        {cartstate != null && cartstate.length != 0 ? (
          <>
            {cartstate.map((mains, maini) => (
              <>
                <Container maxWidth="lg">
                  <div className={classes.root}>
                    <div className="block p-2  mb-5 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <div>
                        <h2 className="font-bold text-lg flex items-start justify-between">
                          <span className="inline-block">
                            Total
                            <span className="text-gray-500 font-medium">
                              ({total} items)
                            </span>
                          </span>
                          <span className="inline-block">
                            ₹{calculatetotal(maini)}
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Avatar
                            alt="Remy Sharp"
                            src={mains.shopimage}
                            className={classes.large}
                          />
                        </Grid>

                        <Grid item>
                          <h4 className="blackbold">{mains.shopname}</h4>
                          <Typography variant="body2" gutterBottom>
                            Business Type : {mains.category}
                          </Typography>
                        </Grid>
                      </Grid>
                      <div className="mt-3">
                        {mains.products &&
                          mains.products.map((productss, producti) => (
                            <>
                              {productss.sets.map((setss, setsi) => (
                                <>
                                  <div className="block p-3 mb-0 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                    <div className="flex items-start ">
                                      <img
                                        src={productss.mainimg}
                                        className="w-10 h-10 "
                                      />
                                      <div className="flex-1 ml-2">
                                        <h6 className="mb-2 font-semibold text-xs">
                                          {productss.productname}
                                        </h6>
                                        <p className="text-xs mb-1 font-semibold text-gray-600">
                                          Qty:
                                          <span className="ml-1 inline-block">
                                            {productss.sets.reduce(
                                              (s, { qty }) => qty,
                                              0
                                            )}
                                          </span>
                                          <span className="ml-1  inline-block">
                                            (set of 20pc)
                                          </span>
                                        </p>
                                        <p className="text-xs font-semibold text-gray-600">
                                          Color:
                                          <span className="ml-1 inline-block">
                                            {setss.setcolor.map((y, u) => (
                                              <>{y},</>
                                            ))}
                                          </span>
                                        </p>
                                        <p className="text-xs font-semibold text-gray-600">
                                          Size:
                                          <span className="ml-1 inline-block">
                                            {setss.sizes.map((y, u) => (
                                              <>{y},</>
                                            ))}
                                          </span>
                                        </p>
                                        <p className="text-xs font-semibold text-gray-600">
                                          Price:
                                          <span className="ml-1 inline-block">
                                            ₹{setss.priceofset}
                                          </span>
                                        </p>
                                        <p className="text-xs font-semibold text-gray-600">
                                          Total:
                                          <span className="ml-1 inline-block">
                                            ₹
                                            {productss.sets.reduce(
                                              (sum, { qty, priceofset }) =>
                                                sum + qty * priceofset,
                                              0
                                            )}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="w-20 ml-2">
                                        <div className="ui input w-12 flex items-stretch">
                                          <div
                                            className=" cursor-pointer flex items-center add rounded-tl fill-white text-white  "
                                            style={{ background: "#3f51b5" }}
                                            onClick={() => {
                                              setss.qty > 1 &&
                                                removeqty(
                                                  setss.qty - 1,
                                                  maini,
                                                  producti,
                                                  setsi
                                                );
                                            }}
                                          >
                                            <Remove width={4} />
                                          </div>
                                          <input
                                            className="w-7"
                                            style={{ padding: "6px 2px" }}
                                            value={setss.qty}
                                            onChange={(e) =>
                                              changeqty(
                                                e,
                                                maini,
                                                producti,
                                                setsi
                                              )
                                            }
                                            type="number"
                                            min={1}
                                            defaultValue={1}
                                          />
                                          <div
                                            className=" flex items-center minus rounded-tr cursor-pointer fill-white text-white "
                                            style={{ background: "#3f51b5" }}
                                            onClick={() =>
                                              addqty(
                                                setss.qty + 1,
                                                maini,
                                                producti,
                                                setsi
                                              )
                                            }
                                          >
                                            <Add width={4} />
                                          </div>
                                        </div>
                                        <div>
                                          <IconButton
                                            onClick={() =>
                                              deleteset(maini, producti, setsi)
                                            }
                                            className={classes.delete}
                                          >
                                            <Delete></Delete>
                                          </IconButton>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </>
                          ))}
                      </div>
                      <div className="my-3">
                        <div className="pb-28">
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <Button
                                size="small"
                                className={classes.next}
                                onClick={() => deleteshop(maini)}
                                variant="contained"
                                color="secondary"
                              >
                                Remove Shop
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                        <div className="fixed right-0 left-0 bottom-0">
                          <div className="text-base bg-white text-white  shadow-lg ">
                            <div className=" rounded-lg px-4 py-2 py-1 flex items-center justify-between">
                              <div className="flex-1">
                                <div className="mb-2">
                                  <div
                                    className="flex items-center justify-between cursor-pointer "
                                    onClick={() => history.push("/add-address")}
                                  >
                                    <Typography
                                      // className="text-lg text-black font-medium"
                                      className={classes.address}
                                      color="primary"
                                    >
                                      {defaultAddress && defaultAddress}
                                    </Typography>
                                    <div className="flex items-center">
                                      <span className="mr-1">
                                        <div style={{ transform: "scale(.8)" }}>
                                          <LocationOn
                                            className={classes.location}
                                            color="primary"
                                          />
                                        </div>
                                      </span>
                                      <Typography
                                        color="primary"
                                        className={classes.addAddress}
                                      >
                                        {defaultAddress
                                          ? "Change address"
                                          : "Add address"}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  fullWidth
                                  type="button"
                                  variant="contained"
                                  className="text-sm px-4 py-3 uppercase font-medium text-white bg-blue-700 rounded-lg w-full"
                                  style={{
                                    justifyContent: "space-between",
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#3f51b5",
                                  }}
                                  onClick={() => handleContinue(maini)}
                                >
                                  <span className="block">
                                    Continue to payment
                                  </span>
                                  <span className="block">
                                    <IconButton
                                      className="text-white w-3 h-3"
                                      style={{ transform: "scale(.5)" }}
                                    >
                                      <ArrowForwardIos />
                                    </IconButton>
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </>
            ))}
          </>
        ) : (
          <>
            <h1> No Items </h1>
          </>
        )}

        <DemoFooter />
      </Container>
    </div>
  );
}

export default Cart;

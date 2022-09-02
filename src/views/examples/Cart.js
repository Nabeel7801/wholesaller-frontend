import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { stringify } from 'query-string';

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MainNavbar from "components/Navbars/MainNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import { Box, Card, Radio, Container, CardContent, CardMedia, Typography, Grid, TextField as TextFieldUI, Button, IconButton } from '@mui/material';

import { styled } from "@material-ui/core/styles";
import axios from "axios";

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const TextField = styled(TextFieldUI)({
  margin: "5px 0 !important"
});

function Cart() {
  const config = require("views/config");
  const WAREHOUSE_ID1 = "62db44a1a223d5b546f4e81d";

  const [deliveryFees] = useState(0)
  const [cartState, setCartState] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  const [productDetails, setProductDetails] = useState();
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currStep, setCurrStep] = useState(1);

  const user = JSON.parse(localStorage.getItem("wholesaller") || "{}");
  const [userInfo, setUserInfo] = useState({
    user_id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
    pincode: user.pincode,
    city: user.city,
    state: user.state
  });

  const navigate = useNavigate();

  useEffect(() => {

    // Set Product Details
    const productIDs = cartState?.map(c => c.product_id);
    const query = { filter: JSON.stringify({ id: productIDs }) };
    axios.get(`${config.servername}/admin/products?${stringify(query)}`)
    .then(response => {
      const responseData = response.data;

      const newProductData = responseData.map(product => {
        product.cart_info = cartState.filter(cart => cart.product_id === product._id)[0];
        return product;
      })
      setProductDetails(newProductData);

    }).catch(err => console.log(err))

  }, [cartState, config.servername]);

  useEffect(() => {
    // Set Total
    setTotal(
      productDetails?.reduce((sum, curr) => {
        return sum + curr.cart_info.quantity;
      }, 0)
    )

    // Set Total amount
    setTotalAmount(
      productDetails?.reduce((sum, curr) => {
        return sum + curr.cart_info.quantity*curr.cart_info.buy_price;
      }, 0.0)
    )
   
  }, [productDetails])

  const removeFromCart = key => {
    const filteredProducts = productDetails.filter((p, k) => k !== key);
    setProductDetails(filteredProducts);

    const newCartInfo = filteredProducts.map(p => p.cart_info);
    localStorage.setItem("cart", JSON.stringify(newCartInfo));
  };

  const changeQuantity = (key, isIncrement) => {
    const newState = [...productDetails];
    isIncrement ? newState[key].cart_info.quantity++ : newState[key].cart_info.quantity--;
    setProductDetails(newState);

    const newCartInfo = newState.map(newState => newState.cart_info);
    localStorage.setItem("cart", JSON.stringify(newCartInfo));
  };

  const changeHandler = e => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [e.target.name]: e.target.value
    }))
  }

  const placeOrderToDatabase = (customerID) => {

    const basket = productDetails.map(product => ({product_id: product._id, buy_price: product.cart_info?.buy_price, quantity: product.cart_info?.quantity }))
    // Place Order
    const orderObj = {
      date: (new Date()).toISOString(),
      customer_id: userInfo._id,
      dealer_type: "warehouse",
      dealer_id: WAREHOUSE_ID1,
      basket: basket,
      delivery_fees: deliveryFees,
      total: totalAmount,
      status: "pending",
      returned: false
    }

    axios.post(`${config.servername}/admin/orders`, {...orderObj, customer_id: customerID})
      .then(() => {
        localStorage.removeItem("cart");
        setCartState([]);
        
        toast.success('Order has been placed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000)

      }).catch(err => console.log(err))
  }

  const placeOrder = () => {

    // Manage Customer
    axios.get(`${config.servername}/getCustomerID/${userInfo.user_id}`)
    .then(response => {
      const responseData = response.data;

      if (responseData.length > 0) {
        axios.put(`${config.servername}/admin/customers/${responseData[0]._id}`, userInfo)
        .then((res) => {
          placeOrderToDatabase(res.data._id)

        }).catch(err => console.log(err))

      }else {
        axios.post(`${config.servername}/admin/customers`, userInfo)
          .then((res) => {
            placeOrderToDatabase(res.data._id)

          }).catch(err => console.log(err))

      }
    })
    
  };

  const style = total > 0 ? 
    { backgroundColor: "#fff", paddingBottom: "20px"} 
  : 
    { paddingBottom: "20px" }

  return (
    <div style={style}>
      {localStorage.getItem("wholesaller") != null ?
        <MainNavbar />
      :
        <IndexNavbar />
      }
      <br />
      <br />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container maxWidth="lg">
        {total > 0 ? 
          <Grid container spacing={6}>

            <Grid item lg={8} md={7} sm={12}>
              <Typography variant="h6">Products</Typography>
              <hr /><br />
              {productDetails?.map((product, key) => 

                <Card key={key} sx={{ display: 'flex', position: "relative", alignItems: "center", margin: "20px 2.5%", boxShadow: "0px 3px 16px 0px rgba(200,200,200,0.4)" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: "100px", maxHeight: "125px" }}
                    image={`${config.servername}/readfiles/${product.image}`}
                    alt="Live from space album cover"
                  />

                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      
                      <Typography component="div" variant="h5">
                        {product.reference}
                      </Typography>
                      
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        ₹{product.cart_info?.buy_price}/Unit &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Quantity: {product.cart_info?.quantity}
                      </Typography>

                    </CardContent>

                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', pl: 1, pb: 1 }}>
                      
                      <div className="input-group" style={{height: "40px", width: "140px", margin: "0 20px 0 0"}}>
                        <div className="input-group-prepend">
                          <button 
                            type="button"
                            className="btn btn-outline-primary px-2" 
                            style={{padding: '0 0.25rem', height: '40px', backgroundColor: 'rgba(81, 203, 206, 0.4'}}
                            onClick={() => changeQuantity(key, false)}
                          >
                            <RemoveIcon />
                          </button>
                        </div>
                        
                        <input 
                          disabled
                          type="text" 
                          className="form-control" 
                          style={{textAlign: 'center'}}
                          value={product.cart_info?.quantity}
                        />
                        
                        <div className="input-group-prepend">
                          <button 
                            type="button"
                            className="btn btn-outline-primary px-2" 
                            style={{padding: '0 0.25rem', height: '40px', backgroundColor: 'rgba(81, 203, 206, 0.4'}}
                            onClick={() => changeQuantity(key, true)}
                          >
                              <AddIcon />
                          </button>
                        </div>
                      </div>

                    </Box>
                  </Box>
                  
                  <IconButton aria-label="delete" onClick={() => removeFromCart(key)} sx={{color: "#C32147", position: "absolute", top: "10px", right: "10px"}}>
                    <DeleteIcon sx={{fontSize: "1.2em"}}/>
                  </IconButton>

                </Card>

              )}

            </Grid>

            <Grid item lg={4} md={5} sm={12}>
                <Typography variant="h6" align="center">Order Summary</Typography>
                <hr />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body2">Total</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right" fontWeight={600}>₹ {totalAmount}</Typography>
                  </Grid>
                </Grid>
                
                {
                  currStep === 1 ? 
                    <Box>
                      <hr />
                      <form onSubmit={(e) => {e.preventDefault(); setCurrStep(2)}}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <TextField 
                              label="First Name" 
                              variant="outlined" 
                              value={userInfo.first_name}
                              disabled
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField 
                              label="Last Name" 
                              variant="outlined" 
                              value={userInfo.last_name}
                              disabled
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        
                        <TextField 
                          label="Email"
                          variant="outlined" 
                          value={userInfo.email}
                          disabled
                          fullWidth
                        />

                        <TextField 
                          label="Address" 
                          variant="outlined" 
                          required
                          fullWidth 
                          name="address"
                          onChange={changeHandler}
                          value={userInfo.address}
                          multiline rows={3}
                        />
                        
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <TextField 
                              required 
                              label="City" 
                              variant="outlined"
                              fullWidth 
                              name="city"
                              onChange={changeHandler}
                              value={userInfo.city}
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <TextField 
                              required 
                              label="State" 
                              variant="outlined" 
                              fullWidth 
                              name="state"
                              onChange={changeHandler}
                              value={userInfo.state}
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <TextField 
                              required 
                              label="Pincode" 
                              variant="outlined" 
                              fullWidth 
                              name="pincode"
                              onChange={changeHandler}
                              value={userInfo.pincode}
                              />
                          </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" fullWidth sx={{marginTop: '1em'}}>Proceed to Billing</Button>
                      </form>
                    </Box>
                  :
                  <>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body2">Delivery</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right" fontWeight={600}>₹ {deliveryFees}</Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body2">Grand Total</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right" fontWeight={600}>₹ {totalAmount+deliveryFees}</Typography>
                      </Grid>
                    </Grid>
                    
                    <Box>
                      <hr />
                      <Card sx={{boxShadow: "0px 3px 16px 0px rgba(200,200,200,0.4)"}}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Radio
                            checked = {true}
                            sx={{
                              color: "#D81B60",
                              '&.Mui-checked': {
                                color: "#D81B60",
                              },
                            }}
                          />

                          <Typography variant="h6">
                            Cash on Delivery
                          </Typography>
                        </CardContent>
                      </Card>
                      <Button onClick={placeOrder} variant="contained" fullWidth sx={{marginTop: '1em'}}>Complete Order</Button>

                    </Box>
                  </>
                }
                
            </Grid>

          </Grid>
        :
          <h4> No Items </h4>
        }

        <DemoFooter />

      </Container>
    </div>
  );
}

export default Cart;

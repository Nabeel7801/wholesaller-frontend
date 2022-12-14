import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "dataProvider";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MainNavbar from "components/Navbars/MainNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import { Button, Box, Card, Radio, Container, CardContent, CardMedia, Typography, Grid, TextField as TextFieldUI, IconButton } from '@material-ui/core'
import { styled } from "@material-ui/core/styles";
import axios from "axios";
import { Remove, Add, Delete, ChevronLeft } from '@material-ui/icons';
import { setCart } from "store/reducers/cart";

const TextField = styled(TextFieldUI)({
  margin: "5px 0 !important"
});

function Cart() {
  const WAREHOUSE_ID1 = "62db44a1a223d5b546f4e81d";

  const [deliveryFees] = useState(0)
  const cartState = useSelector((state) => state.cart.items);
  const [productDetails, setProductDetails] = useState();
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currStep, setCurrStep] = useState(1);

  const user = useSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    user_id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    outlet_name: user.outlet_name,
    email: user.email,
    address: user.address,
    pincode: user.pincode,
    city: user.city,
    state: user.state
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    // Set Product Details
    const productIDs = cartState?.filter(c => c).map(c => c.product_id) || [];

    getList("admin/products", { filter: { id: productIDs } })
    .then(response => {
      const responseData = response.data;
      const newProductData = responseData?.map(product => {
        product.cart_info = cartState.filter(cart => cart.product_id === product.id)[0];
        return product;
      }) || []

      setProductDetails(newProductData);

    }).catch(err => console.log(err))

  }, [cartState]);

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
    dispatch(setCart(newCartInfo));
  };

  const changeQuantity = (key, isIncrement) => {
    const newState = productDetails?.map((p, k) => {
      if (k === key) {
        const cartInfo = p.cart_info;
        return {
          ...p, 
          cart_info: isIncrement ? {...cartInfo, quantity: cartInfo.quantity+1} : {...cartInfo, quantity: cartInfo.quantity-1}
        } 
      
      }else {
        return p;
      }
    }).filter(p => p.cart_info.quantity > 0)
    
    setProductDetails(newState);

    const newCartInfo = newState.map(newState => newState.cart_info);
    dispatch(setCart(newCartInfo))
  };

  const changeHandler = e => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [e.target.name]: e.target.value
    }))
  }

  const placeOrderToDatabase = (customerID) => {

    const basket = productDetails.map(product => ({product_id: product.id, buy_price: product.cart_info?.buy_price, quantity: product.cart_info?.quantity }))
    // Place Order
    const orderObj = {
      date: (new Date()).toISOString(),
      user_id: userInfo.user_id,
      customer_id: userInfo._id,
      dealer_type: "warehouse",
      dealer_id: WAREHOUSE_ID1,
      basket: basket,
      delivery_fees: deliveryFees,
      total: totalAmount,
      status: "pending",
      returned: false
    }

    axios.post(`${window["apiLocation"]}/admin/orders`, {...orderObj, customer_id: customerID})
      .then(() => {
        dispatch(setCart([]))
        
        toast.success('Order has been placed', {
          autoClose: 3000,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/");
        }, 3000)

      }).catch(err => console.log(err))
  }

  const placeOrder = () => {

    // Manage Customer
    axios.get(`${window["apiLocation"]}/getCustomerID/${userInfo.user_id}`)
    .then(response => {
      const responseData = response.data;

      if (responseData.length > 0) {
        axios.put(`${window["apiLocation"]}/admin/customers/${responseData[0]._id}`, userInfo)
        .then((res) => {
          placeOrderToDatabase(res.data._id)

        }).catch(err => console.log(err))

      }else {
        axios.post(`${window["apiLocation"]}/admin/customers`, userInfo)
        .then((res) => {
          placeOrderToDatabase(res.data._id)

        }).catch(err => console.log(err))

      }
    })
    
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      { user ? <MainNavbar /> : <IndexNavbar /> }

      <br /> <br />

      <Container maxWidth="lg">
        {total > 0 ? 
          <Grid container spacing={6}>

            <Grid item md={7} xs={12}>
              <Typography variant="h6">Products</Typography>
              <hr /><br />
              {productDetails?.map((product, key) => 

                <Card key={key} style={{ position: "relative", margin: "20px 0", boxShadow: "0px 0px 16px 5px rgba(200,200,200,0.4)" }}>
                  
                  <Grid container>
                    <Grid item xs={3} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <CardMedia
                        component="img"
                        style={{ width: "90%", maxHeight: "125px", objectFit: "contain" }}
                        image={`${window["apiLocation"]}/readfiles/${product.image}`}
                        alt="Product"
                      />
                    </Grid>

                    <Grid item xs={9}>
                      <Box style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <CardContent style={{ flex: '1 0 auto' }}>
                          
                          <Typography component="div" variant="h5">
                            {product.reference}
                          </Typography>
                          
                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            ???{product.cart_info?.buy_price}/Unit &nbsp;&nbsp; | &nbsp;&nbsp; Quantity: {product.cart_info?.quantity}
                          </Typography>

                        </CardContent>

                        <Box style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: "10px" }}>
                          <div className="input-group" style={{height: "40px", width: "140px", margin: "0 20px 0 0"}}>
                            <div className="input-group-prepend">
                              <button 
                                type="button"
                                className="btn btn-outline-primary px-2" 
                                style={{padding: '0 0.25rem', height: '40px', backgroundColor: 'rgba(81, 203, 206, 0.4'}}
                                onClick={() => changeQuantity(key, false)}
                              >
                                <Remove />
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
                                  <Add />
                              </button>
                            </div>
                          </div>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <IconButton aria-label="delete" onClick={() => removeFromCart(key)} style={{color: "#C32147", position: "absolute", top: "10px", right: "10px"}}>
                    <Delete style={{fontSize: "1.2em"}}/>
                  </IconButton>

                </Card>

              )}

            </Grid>

            <Grid item md={5} xs={12}>
                <div className="flex items-center">
                  {currStep === 2 &&
                    <IconButton onClick={() => setCurrStep(1)} size="small" disableRipple={true}>
                      <ChevronLeft style={{ fontSize: "1.2em" }}/>
                    </IconButton>
                  }
                  
                  <Typography className="w-full" variant="h6" align="center">Order Summary</Typography>
                </div>
                <hr />

                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body2" style={{ fontWeight: 600 }}>Total</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right">??? {totalAmount}</Typography>
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

                        <Button type="submit" color="primary" variant="contained" fullWidth style={{marginTop: '1em', padding: "10px 0"}}>
                          Proceed to Billing
                        </Button>
                      </form>
                    </Box>
                  :
                  <>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body2" style={{ fontWeight: 600 }}>Delivery</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">??? {deliveryFees}</Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant="body2" style={{ fontWeight: 600 }}>Grand Total</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" align="right">??? {totalAmount+deliveryFees}</Typography>
                      </Grid>
                    </Grid>
                    
                    <Box>
                      <hr />
                      <Card >
                        <CardContent style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Radio
                            checked = {true}
                            style={{
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

                      <Button onClick={placeOrder} color="primary" variant="contained" fullWidth style={{marginTop: '20px', padding: '10px 0'}}>
                        Complete Order
                      </Button>

                    </Box>
                  </>
                }
                
            </Grid>

          </Grid>
        :
          <h2 className="text-2xl sm:text-3xl flex justify-center items-center mx-auto text-center" style={{color: '#aaa'}}>
            Cart Empty
          </h2>
        }

        <DemoFooter />

      </Container>
    </div>
  );
}

export default Cart;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { InputNumber } from "antd";
import axios from "axios";
import { toast } from 'react-toastify';
import { makeStyles } from "@material-ui/core/styles";

import { Container, Typography, Grid, Button } from "@material-ui/core";

import MainNavbar from "components/Navbars/MainNavbar";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Footer from "components/Footers/Footer";
import ZoomImage from "components/Images/ZoomImage";
import { addItem } from "store/reducers/cart";

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

let action = "AddToCart";

function ProductDetails() {

    const classes = useStyles();
    const { productID } = useParams();  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1)
    const [currentstatus, setcurrentstatus] = useState("");

    const user = useSelector((state) => state.auth.user)
    const productDetails = useSelector((state) => 
        state.products.list.filter(product => product._id === productID)[0] || {}
    )

    useEffect(() => {
        //Fetch User Status
        axios.post(`${window["apiLocation"]}/getStatus/${user.document}`)
        .then((response) => {
            setcurrentstatus(response.data?.status)

        }).catch(err => console.log(err))

    }, [])

    const addToCart = (e) => {
        e.preventDefault();
        dispatch(addItem({
            productDetails: productDetails, 
            quantity: quantity
        }));
        
        if (action === "BuyNow") {
            navigate("/cart")

        } else {
            setQuantity();
            toast.success('Product added to the cart!', {
                autoClose: 3000,
                progress: undefined,
              });
        }
    }

    return (
        <div>
            {productDetails && (
                <>

                { user ? <MainNavbar /> : <IndexNavbar /> }

                <div className="pb-40">
                    <Container maxWidth="lg">
                        <div className={classes.root}>
                            <Grid container spacing={6}>
                                <Grid item lg={5} md={6} xs={12} sm={12} style={{maxWidth: "350px"}}>

                                    <ZoomImage src={`${window["apiLocation"]}/readfiles/${productDetails.image}`} />

                                </Grid>

                                <Grid item lg={7} md={6} xs={12} sm={12} style={{ display: 'flex', flexDirection: 'column' }}>

                                    <Typography variant="h3" className="my-2">{productDetails.reference}</Typography>

                                    <Typography 
                                        variant="h4" 
                                        className="my-3"
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#3F51B5'
                                        }}
                                    >
                                        Rs: {productDetails.price}
                                    </Typography>

                                    <Typography variant="h6" className="my-1">HSN: {productDetails.hsn_code}</Typography>

                                    <Typography variant="h6" className="my-1">AVAILABILITY: In stock</Typography>

                                    <hr />

                                    
                                    <form id="quantityForm" onSubmit={addToCart}>
                                        <div className="row" style={{
                                            maxWidth: "300px",
                                            margin: "20px 0"
                                        }}>
                                            <div className="col-6" style={{fontWeight: "600"}}> Quantity </div>
                                            <div className="col-6">
                                            <InputNumber 
                                                min={1} 
                                                required
                                                defaultValue={1}
                                                value={quantity}
                                                onChange={setQuantity} />
                                            </div>
                                        </div>
                                    </form>

                                    {/* Button Area */}
                                    <div style={{marginTop: 'auto'}}>
                                    {currentstatus === "verified" ? 
                                        <Grid container spacing={3}>
                                        
                                            <Grid item xs={12} md={6}>
                                                <Button
                                                    type="submit"
                                                    form="quantityForm"
                                                    variant="contained"
                                                    style={{ width: "100%" }}
                                                    color="primary"
                                                    onClick={() => {action = "AddToCart"; return true;}} 
                                                >
                                                Add to Cart
                                                </Button>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Button
                                                    type="submit"
                                                    form="quantityForm"
                                                    variant="outlined"
                                                    style={{ width: "100%" }}
                                                    color="primary"
                                                    onClick={() => {action = "BuyNow"; return true;}} 
                                                >
                                                Buy Now
                                                </Button>
                                            </Grid>
                                        
                                        </Grid>
                                    : 
                                        <button
                                        onClick={() => navigate("/verifydocument")}
                                        className="verify-styl"
                                        >
                                        Verify now to start order
                                        </button>
                                    }
                                    </div>

                                </Grid>

                            </Grid>
                        </div>
                    </Container>
                </div>

                <DemoFooter />

                <Footer />

                </>
            )}
        </div>
    );
}

export default ProductDetails;

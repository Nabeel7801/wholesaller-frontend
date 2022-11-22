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
import { addItem } from "store/reducers/cart";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 40,
    },
    largeText: {
        fontSize: '1.8rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.6rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '3.0rem',
        },
    },
    mediumText: {
        fontSize: '1.6rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.2rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.6rem',
        },
    },
    smallText: {
        fontSize: '1.4rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.0rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '2.2rem',
        },
    },
    image: {
        width: '100%',
        margin: 'auto',
        maxWidth: '450px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '300px',
            maxHeight: '350px'
        }
    }
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
                                <Grid item lg={5} md={6} xs={12} sm={12}>

                                    <img 
                                        alt="default"
                                        className={classes.image}
                                        src={`${window["apiLocation"]}/file/${productDetails.image}`}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = `${window["apiLocation"]}/file/product_default.jpg`;
                                        }}
                                    />


                                </Grid>

                                <Grid item lg={7} md={6} xs={12} sm={12} style={{ display: 'flex', flexDirection: 'column' }}>

                                    <Typography 
                                        style={{ fontSize: { xs:'1.6rem', md:'3.0rem' } }}
                                        variant="h3"
                                        className= {classes.largeText}
                                    >
                                        {productDetails.reference}
                                    </Typography>

                                    <Typography 
                                        variant="h4" 
                                        className= {classes.mediumText}
                                        style={{ fontWeight: 'bold', color: '#3F51B5', margin: '0.6rem 0' }}
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

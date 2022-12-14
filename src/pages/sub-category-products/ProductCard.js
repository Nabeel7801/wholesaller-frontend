import React from 'react'
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card } from "@material-ui/core";
import { Add, Store } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        padding: "15px",
        cursor: "pointer",
        borderRadius: "15px",
        boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.05)"
    },
    loader: {
        margin: "auto",
        width: "100%",
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));
  
function ProductCard(props) {
    const classes = useStyles();
    const navigate = useNavigate();
  
    const { product } = props;
  
    return (
        <Card 
            onClick={() => navigate(`/productdetail/${product.id}`)}
            className={classes.root}
        >
            <div className="mx-auto">
                <img
                    src={`${window["apiLocation"]}/readfiles/${product.image}`}
                    alt={product.title}
                    style={{ width: "100%", height: "150px", objectFit: "contain" }}
                    className="mx-auto rounded"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${window["apiLocation"]}/readfiles/product_default.jpg`;
                    }}
                />
            </div>

            <div className="flex flex-col flex-1 mt-2">
                
                <h2 className="text-sm font-bold text-gray-500 ">
                    {product.reference}
                </h2>

                <p className="font-bold text-md text-gray-500">
                    <span style={{ color: '#3F51B5' }}>₹{product.price}</span> per pc
                </p>

                <div className="flex-1 sm:mt-4 flex justify-between items-start">
                
                    <div className="flex items-center">
                        <Avatar
                            alt="Supplier"
                            src={product.users}
                            className={classes.small}
                        >
                            <Store style={{ width: '0.8em', height: '0.8em' }}/>
                        </Avatar>

                        <p className="text-xs ml-2 font-bold text-gray-500">
                            {product.supplier || "Warehouse 1"}
                        </p>
                    </div>
                    
                    <div className="rounded-lg shadow-md hidden sm:block" style={{ padding: "5px" }}>
                        <Add color="primary" />
                    </div>

                </div>

            </div>
        </Card>
    )
}

export default ProductCard
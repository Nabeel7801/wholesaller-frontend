import React from "react";
import Media from 'react-media';
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card } from "@material-ui/core";
import { Add, Store } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px",
    padding: "15px",
    cursor: "pointer",
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
    <Media queries={{
      small: "(max-width: 599px)",
      medium: "(min-width: 600px) and (max-width: 1199px)",
      large: "(min-width: 1200px)"
    }}>
      {matches => (
        <Card 
          onClick={() => navigate(`/productdetail/${product.id}`)}
          className={classes.root}
          style={matches.small ? { width: "250px", padding: "5px", minWidth: "200px", borderRadius: "10px" } : { width: "300px", minWidth: "250px", borderRadius: "15px" }}
        >
          <div className="mx-auto">
            <img
              src={`${window["apiLocation"]}/readfiles/${product.image}`}
              alt={product.title}
              style={matches.small ? { width: "100px", height: "100px", objectFit: "contain" } : { width: "175px", height: "175px", objectFit: "contain" }}
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

            <p className="font-bold text-md sm:text-right text-gray-500">
              <span style={{ color: '#3F51B5' }}>₹{product.price}</span> per pc
            </p>

            <div className="flex-1 mt-1 flex justify-between items-start">
              
              <div className="flex items-center">
                <Avatar
                  alt="Supplier"
                  src={product.users}
                  className={classes.small}
                >
                  <Store style={{ width: '0.8em', height: '0.8em' }}/>
                </Avatar>

                <p className="text-xs ml-2 font-bold text-gray-500">
                  {product.supplier || "Wholesaller Store"}
                </p>
              </div>
              
              {!matches.small &&
                <div className="rounded-lg  shadow-md" style={{ padding: "5px" }}>
                  <Add color="primary" />
                </div>
              }

            </div>

          </div>

        </Card>
      )}
    </Media>
  );  
}

export default ProductCard;

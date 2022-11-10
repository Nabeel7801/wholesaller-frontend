import React from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

function ProductCards(props) {

  const classes = useStyles();
  const navigate = useNavigate();

  const { product } = props;

  return (
    <Grid 
      item xs={6} sm={4} lg={3}
      key={product.id}
      className="flex flex-col flex-1 cursor-pointer"
      onClick={() => navigate(`/productdetail/${product._id}`)}
    >
      <div class="bg-white p-2 rounded-xl bg-white flex flex-col flex-1  shadow-md flex-1 ">
        <div className="mx-auto  ">
          <img
            src={`${window["apiLocation"]}/readfiles/${product.image}`}
            alt={product.title}
            className="h-48 w-48 mx-auto rounded flex items-end justify-end bg-cover bg-center"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = `${window["apiLocation"]}/readfiles/product_default.jpg`;
            }}
          />
        </div>

        <div className="flex flex-col flex-1 mt-2">
          <div>
            <h2 className="text-sm font-bold text-gray-500 ">
              {product.reference}
            </h2>
          </div>

          <div className="flex items-center mt-2">
            <Avatar
              alt="Remy Sharp"
              src={product.users}
              className={classes.small}
            />
            <p className="text-xs font-bold text-gray-500">
              {product.users}
            </p>
          </div>

          <div>
            <div className="mt-1 text-xs text-gray-500">
              1 Piece (Min. Order)
            </div>
          </div>

          <div className="flex-1 mt-2 flex justify-between  items-end">
            <p className="text-xs font-bold text-gray-500">
              ₹{product.price} per pc
            </p>
            <div

              className="rounded-lg  shadow-md"
              style={{ padding: "10px" }}
            >
              <Add color="primary" />
            </div>

          </div>

        </div>
      </div>

    </Grid>
  );
}

export default ProductCards;

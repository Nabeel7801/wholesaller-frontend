import React from "react";

import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";

import { CircularProgress } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
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

function Ecard(props) {
  const config = require("views/config");

  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <div className="w-full h-full ">
          {props?.allProduct.length < 1 ? (
            <div className={classes.loader}>
              <CircularProgress />
            </div>
          ) : (
            <div className="grid  grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
              {props.allProduct.map((product, key) => (
                <div
                  key={key}
                  className="flex flex-col flex-1"
                  style={{ minWidth: "170px" }}
                >
                  <div class="bg-white p-2 rounded-xl bg-white flex flex-col flex-1  shadow-md flex-1 ">
                    <div className="mx-auto  ">
                      <Link to={`/productdetail/${product._id}`}>
                        <img
                          class="mx-auto rounded flex items-end justify-end h-24 w-24  bg-cover bg-center "
                          src={`${config.servername}/readfiles/${product.image}`}
                          alt="product"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col flex-1 mt-2">
                      <div>
                        <h2 className="text-sm font-bold text-gray-500 ">
                          {product.reference}
                        </h2>
                      </div>
                      <Link
                        to={`/productdetail/${product._id}`}
                        className="flex flex-col flex-1"
                      >
                        <div>
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

                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default Ecard;

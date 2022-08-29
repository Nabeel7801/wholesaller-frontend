import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

const Footer = () => {
  const [total, setTotal] = useState(0);
  
  const datafromstore = useSelector(
    (state) => state.cartdetailarray.mycartdetails
  );

  useEffect(() => {
    if (datafromstore) {
      let myTotal = 0;
      const myTotalValArr = datafromstore?.map((mains) => {
        return mains?.products?.map((productss) => {
          return productss?.sets?.map(() => {
            {
              return productss?.sets?.reduce((s, { qty }) => qty, 0);
            }
          });
        });
      });
      myTotalValArr.map((item) => {
        item.map((data) => {
          if (data[0]) {
            myTotal += data[0];
          }
        });
      });
      setTotal(myTotal);
    }
  }, [datafromstore && JSON.stringify(datafromstore)]);

  const cartInLS = JSON.parse(localStorage.getItem("mycart"));
  return (
    <div>
      {cartInLS && cartInLS.length >= 1 && total >= 1 && (
        <footer className="fixed right-0 left-0 bottom-0 z-50">
          <div className="text-base bg-white text-white px-4 pt-4 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className=" my-paper rounded-lg px-4 py-2 py-1 flex items-center justify-between">
              <div className="flex items-center font-medium">
                <span>{total}</span>
                <span className="ml-2">items</span>
                <span className="ml-2"></span>
                <span className="ml-2"></span>
              </div>
              <Link to="/cart">
                <div className="flex item-center">
                  <div>
                    <IconButton color="#fff" className="fill-white text-white">
                      <ShoppingCart />
                    </IconButton>
                  </div>
                  <div className="text-white ml-2 font-medium flex items-center">
                    Move to Cart
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Footer;

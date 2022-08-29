import React, { useState, useEffect } from "react";
import { CircularProgress, Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";
import Ecard from "components/Card/Ecard";

const SubCategoryProducts = () => {
  const [notfound, setNotFound] = useState(false);

  const allProduct = useSelector(
    (state) => state.productarray.filteredproductarray
  );

  useEffect(() => {
    setTimeout(() => {
      if (allProduct.length < 1) {
        setNotFound(true);
      }
    }, 5000);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {localStorage.getItem("wholesaller") != null ? (
        <>
          <MainNavbar />
        </>
      ) : (
        <IndexNavbar />
      )}
      
      <div className="mt-5">
        <Container maxWidth="lg">
          <h2 className="text-3xl font-bold ">Products</h2>
          <div className="mt-8">
            {notfound && (
              <h2 className="text-4xl flex  justify-center items-center my-10 mx-auto text-center">
                No products found under this category
              </h2>
            )}
            {!notfound ? (
              allProduct.length < 1 ? (
                <div
                  className="flex items-center justify-center "
                  style={{ minHeight: "300px" }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  <Ecard allProduct={allProduct} />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SubCategoryProducts;

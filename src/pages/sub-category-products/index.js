import React, { useState, useEffect } from "react";
import { CircularProgress, Container, Paper, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";
import ProductCards from "./ProductCards";

const SubCategoryProducts = () => {
  const [notfound, setNotFound] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.list)

  useEffect(() => {
    setTimeout(() => {
      if (products.length < 1) {
        setNotFound(true);
      }
    }, 5000);
    window.scrollTo(0, 0);
  }, [products]);

  return (
    <div>

      { user ? <MainNavbar /> : <IndexNavbar /> }
      
      <div className="mt-5">
        <Container maxWidth="lg">
          <h2 className="text-3xl font-bold ">Products</h2>

          <div className="mt-8">
            {notfound ? 
              <h2 className="text-4xl flex  justify-center items-center my-10 mx-auto text-center">
                No products found under this category
              </h2>
              :
              products.length < 1 ?
                <div
                  className="flex items-center justify-center "
                  style={{ minHeight: "300px" }}
                >
                  <CircularProgress />
                </div>
                :
                <Paper elevation={0}>
                  <div className="w-full h-full ">
                    
                    <Grid container spacing={3}>
                      {products.map(product => (
                        <ProductCards product={product} />
                      ))}
                    </Grid>
                  </div>
                </Paper>
                
            }

          </div>
        </Container>
      </div>
    </div>
  );
};

export default SubCategoryProducts;

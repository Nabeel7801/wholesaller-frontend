import React, { useState, useEffect } from "react";
import { CircularProgress, Container, Paper, Grid, Typography } from "@material-ui/core";
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
    }, 3000);
    window.scrollTo(0, 0);
  }, [products]);

  return (
    <div>

      { user ? <MainNavbar /> : <IndexNavbar /> }
      <br /> <br />

      <Container maxWidth="lg">
        <Typography variant="h6">Products</Typography>
          <hr /><br />

        {notfound ? 
          <h2 className="text-3xl flex justify-center items-center mx-auto text-center" style={{color: '#aaa'}}>
            No products found
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
      </Container>
    </div>
  );
};

export default SubCategoryProducts;

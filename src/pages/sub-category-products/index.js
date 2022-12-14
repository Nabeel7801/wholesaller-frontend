import React, { useState, useEffect } from "react";
import { Card, Container, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import { useSelector } from "react-redux";

import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";
import ProductCard from "./ProductCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "15px"
  }
}))

const SubCategoryProducts = () => {
      
  const classes = useStyles();

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

      <Container maxWidth="lg" style={{ paddingBottom: "20px" }}>
        <Typography variant="h6">Products</Typography>
          <hr /><br />

        {notfound ? 
          <h2 className="text-2xl sm:text-3xl flex justify-center items-center mx-auto text-center" style={{color: '#aaa'}}>
            No products found
          </h2>
          :
          <Paper elevation={0}>
            <div className="w-full h-full ">
              
              <Grid container spacing={2}>
                {products.length < 1 ?
                  ['', '', '', ''].map((v, k) => (
                    <Grid key={v + k} item xs={6} sm={4} lg={3} className="flex flex-col flex-1">
                      <Card className={classes.root}>
                        <Skeleton
                            variant="rect"
                            height="120px"
                            className="mb-2"
                            animation="wave"
                        />
    
                        <Skeleton
                            variant="rect"
                            className="mb-2"
                            width= "80%"
                            animation="wave"
                        />
    
                        <Skeleton
                            variant="rect"
                            className="mb-2"
                            height= "40px"
                            animation="wave"
                        />
                          
                      </Card>
                    </Grid>
                  ))
                  :
                  products.map(product => (
                    <Grid key={product.id} item xs={6} sm={4} lg={3} className="flex flex-col flex-1">
                      <ProductCard product={product} />
                    </Grid>
                  ))
                }
              </Grid>
            </div>
          </Paper>
        }
      </Container>
    </div>
  );
};

export default SubCategoryProducts;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { Container, Card, Grid, Typography } from "@material-ui/core";
import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";

import { populateProducts } from "store/reducers/products";

const SubCategory = () => {
  const [allCategories, setAllCategories] = useState([]);  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parent } = useParams();

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!user) {
      navigate("/", {replace: true});
    }

    axios.post(`${window["apiLocation"]}/categoriesByParent/${parent}`)
    .then(res => {
      const resData = res.data;
      if (resData?.length > 0) {
        setAllCategories(resData);
      }else {
        filterbysubcategory(parent);
      }
      
    })
  }, [navigate, parent, user]);

  const filterbychildcategory = id => {
    axios.post(`${window["apiLocation"]}/getProductByChildCategory/${id}`)
      .then(response => {
        dispatch(populateProducts(response.data || []))
        navigate("/products");

      }).catch(err => console.log(err))
 
  };
  
  const filterbysubcategory = id => {
    axios.post(`${window["apiLocation"]}/getProductBySubCategory/${id}`)
      .then(response => {
        dispatch(populateProducts(response.data || []))
        navigate("/products", {replace: true});

      }).catch(err => console.log(err))
 
  };
  
  return (
    <div>
      <div>
        { user ? <MainNavbar /> : <IndexNavbar /> }
        <br /> <br />

        <Container maxWidth="lg">
          <Typography variant="h6">Categories</Typography>
          <hr /><br />

          <Grid container spacing={3}>
            {allCategories.map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Card
                  style={{ boxShadow: "0px 3px 16px 0px rgba(200,200,200,0.4)", height: '100%', padding: '10px 0', borderRadius: '10px', cursor: 'pointer' }}
                  onClick={() => filterbychildcategory(item._id)}
                >
                  <img
                    src={`${window["apiLocation"]}/readfiles/${item.image}`}
                    alt={item.title}
                    className="h-52 w-52 mx-auto"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = `${window["apiLocation"]}/readfiles/product_placeholder.png`;
                    }}
                  />
                  
                  <h3
                    className="break-words text-sm mt-2 md:text-base font-bold text-center capitalize"
                    style={{ color: "#3f51b5" }}
                  >
                    {item.title}
                  </h3>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default SubCategory;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { getList } from "dataProvider";

import { Container, Card, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";

import { populateProducts } from "store/reducers/products";

const useStyles = makeStyles(() => ({
  categoryBox: {
    borderRadius: "10px",
    backgroundColor: "rgb(156,156,156)",
    background: "linear-gradient(135deg, rgba(213,211,211,1) 0%, rgba(250,250,252,1) 48%, rgba(250,250,252,1) 52%, rgba(213,211,211,1) 100%)"
  },
  categoryImage: {
    width: "100%",
    height: "150px",
    objectFit: 'contain'
  }
}));

const SubCategory = () => {
  const [allCategories, setAllCategories] = useState([]);  

  const classes = useStyles();

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
    if (!id) return;
    
    getList("admin/products", { filter: { child_category: id } })
    .then(response => {
      dispatch(populateProducts(response.data || []))
      navigate("/products");

    }).catch(err => console.log(err))
  };
  
  const filterbysubcategory = id => {
    if (!id) return;
    
    getList("admin/products", { filter: { sub_category: id } })
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
            {allCategories.map(category => (
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <Card className={classes.categoryBox} onClick={() => filterbychildcategory(category._id)}>
                    <img
                      alt="category"
                      className={classes.categoryImage}
                      src={`${window["apiLocation"]}/readfiles/${category.image}`}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${window["apiLocation"]}/readfiles/product_default.jpg`;
                      }}
                    />
                  </Card>
                  <h2 className="text-sm font-bold text-gray-500 text-center">{category.title}</h2>
                </Grid>
              ))
            }
            {/* {allCategories.map((item) => (
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
            ))} */}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default SubCategory;

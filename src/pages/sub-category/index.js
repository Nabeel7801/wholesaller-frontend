import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { CircularProgress, Container } from "@material-ui/core";
import IndexNavbar from "components/Navbars/IndexNavbar";
import MainNavbar from "components/Navbars/MainNavbar";

import { updateproductaction } from "views/action/myaction";
import { populateProducts } from "store/reducers/products";

const SubCategory = () => {
  const [notfound, setNotFound] = useState(false);
  const [allCategories, setAllCategories] = useState([]);  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parent } = useParams();

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    axios.post(`${window["apiLocation"]}/categoriesByParent/${parent}`)
    .then(res => {
      const resData = res.data;
      setAllCategories(resData);
      if (resData.length < 1) {
        setTimeout(() => {
          setNotFound(true);
        }, 5000);
      }
    })
  }, [navigate, parent]);

  const filterbysubcategory = id => {
    axios.post(`${window["apiLocation"]}/getProductByChildCategory/${id}`)
      .then(response => {
        dispatch(populateProducts(response.data || []))
        navigate("/products");

      }).catch(err => console.log(err))
 
  };

  return (
    <div>
      <div>
        { user ? <MainNavbar /> : <IndexNavbar /> }

        <div className="mt-5">
          <Container maxWidth="lg">
            <h2 className="text-3xl font-bold ">Categories</h2>

            <div className="mt-8">

              {notfound ? 
                <h2 className="text-4xl flex  justify-center items-center my-10 mx-auto text-center">
                  No Child Category found
                </h2>
                :
                allCategories.length < 1 ? (
                  <div className="flex  justify-center items-center my-10 mx-auto">
                    <CircularProgress />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 gap-y-2 md:gap-5 md:gap-x-8">
                    {allCategories.map((item) => {
                      return (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                          className="cursor-pointer flex flex-col justify-between shadow-xl shadow-gray-800 rounded-xl bg-white p-1 md:p-3 "
                          onClick={() => filterbysubcategory(item._id)}
                        >
                          <div className="flex-1">
                            <h3
                              className="break-words text-sm  md:text-base font-bold text-center capitalize"
                              style={{ color: "#3f51b5" }}
                            >
                              {item.title}
                            </h3>
                          </div>
                          <div className="mt-2 md:mt-5">
                            <img
                              src={`${window["apiLocation"]}/readfiles/${item.image}`}
                              alt={item.title}
                              className="h-52 w-52 mx-auto"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = `${window["apiLocation"]}/readfiles/product_default.jpg`;
                              }}
                            />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )
              }
              
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;

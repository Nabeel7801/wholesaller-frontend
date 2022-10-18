import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Container, Modal } from "reactstrap";
import Grid from "@material-ui/core/Grid";

import Filtercards from "components/Landingpage/Filtercards";
import Collapse from "@material-ui/core/Collapse";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import history from "views/history";
import Sidecard from "components/Card/Sidecard";
import SectionCarousel from "views/index-sections/SectionCarousel";

const config = require("views/config");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: "0 16px",
  },
  paper: {
    padding: theme.spacing(2),
    height: 140,
    width: 120,
    marginLeft: 10,
    whiteSpace: "pre-wrap",
    backgroundColor: "#DEE5F7",
    overflowWrap: "break-word",
  },
  paper1: {
    padding: theme.spacing(2),
    height: 140,
    width: 120,
    marginLeft: 10,
    whiteSpace: "pre-wrap",
    backgroundColor: "#E8FBAA",
    overflowWrap: "break-word",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function LandingPageHeader() {

  const dispatch = useDispatch();
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [selectionCategory, setselectionCategory] = useState({id: "", title: ""});

  const [modal, setModal] = useState(true);
  
  useEffect(() => {
    axios.post(`${config.servername}/categoriesByParent/${selectionCategory.id}`)
    .then(res => {
        const resData = res.data;
        setCategories(resData);

    }).catch(err => console.log(err))

    axios.post(`${config.servername}/maincategories`)
    .then(res => {
        const resData = res.data;
        dispatch({ type: 'getAllCategories', payload: resData })
        setMainCategories(resData);

    }).catch(err => console.log(err))
    
    if (!selectionCategory) {
      toggleModal();
    }

  }, [selectionCategory]);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="page-header">
        <Container className={classes.container}>
          <br />

          <Grid container spacing={{ xs: 0, md: 6 }} alignItems="center">
            <Grid item xs={12} md={3} lg={3}>
              <div className="hidden md:block">
                <a onClick={() => history.push("/")}>
                  <img src={require("assets/img/logo2.png")} />
                </a>
              </div>
            </Grid>

            <Grid item xs={12} md={8} lg={7}>
              <div className="s003 md:ml-2  bg-white">
                <form>
                  <div className="flex">
                    <label
                      for="search-dropdown"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                    >
                      Your Email
                    </label>
                    <button
                      id="dropdown-button"
                      data-dropdown-toggle="dropdown"
                      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-1 md:px-4 text-sm font-medium text-center text-gray-900  border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
                      type="button"
                      onClick={() => toggleModal()}
                    >
                      {selectionCategory.title && selectionCategory.title !== "" ? selectionCategory.title : "All categories"}
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>

                    <div className="relative w-full">
                      <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="What Are You Looking For?"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white  rounded-r-lg border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  "
                        style={{ background: "#3f51b5" }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="#3f51b5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>

          <div>
            <div className="w-full h-full relative overflow-hidden">
              <div className="overflow-x-auto home-page-categories flex items-start justify-between md:justify-center gap-6 ">
                {categories.map(category => {
                    return (
                      <Link to={`/categories/${category._id}`}>
                        <div
                          className=" relative mt-8"
                          style={{ minWidth: "100px", width: "100%" }}
                        >
                          <img
                            className="w-20 h-20 rounded-full m-auto"
                            alt=""
                            src={`${config.servername}/readfiles/${category.image}`}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = `${config.servername}/readfiles/product_default.jpg`;
                            }}
                          />
                          <div className="mt-2 text-center text-sm md:text-base font-semibold text-black">
                            {category.title}
                          </div>
                        </div>
                      </Link>
                    );
                })}
              </div>
            </div>
          </div>

          <br />
          
          <div style={{ maxWidth: "1024px", margin: "auto" }}>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <SectionCarousel />
                </Grid>

                <Grid item lg={4} md={4} sm={0} xs={0}>
                  <div className="hidden md:block">
                    <Sidecard />
                  </div>
                </Grid>
              </Grid>
            </Collapse>
          </div>

          <Modal
            isOpen={modal}
            toggle={toggleModal}
          >
            <div className="modal-header">
              <button
                aria-label="Close"
                className="close"
                type="button"
                onClick={toggleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
              <h5 className="modal-title text-center" id="exampleModalLabel">
                Select Category
              </h5>
            </div>
            <div className="modal-body">
              <Filtercards
                allcategory={mainCategories}
                toggleModal={toggleModal}
                setselectionCategory={setselectionCategory}
              />
            </div>
          </Modal>
          
        </Container>
      </div>
    </>
  );
}

export default LandingPageHeader;

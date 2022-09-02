import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateproductaction } from "views/action/myaction";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MainNavbar from "components/Navbars/MainNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import Footer from "components/Footers/Footer";

import { CircularProgress, Container, IconButton } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from "axios";

import SuccessCheck from "assets/img/success/check.gif";
const config = require("views/config");

function LandingPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const allCategories = useSelector(state => state.allcategories?.allCategories);
  
  const [success, setSuccess] = useState(false);
  const [topCategories, setTopCategories] = useState();
  const [verificationStatus, setVerificationstatus] = useState(null);

  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    if (!allCategories || allCategories.length === 0) {
      axios.post(`${config.servername}/maincategories`)
      .then(response => {
        setTopCategories(response.data)

      }).catch(err => console.log(err))

    }else {
      setTopCategories(allCategories)
    }
  }, [allCategories]);

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("wholesaller"));
    if (user.document) {
      axios.post(`${config.servername}/getStatus/${user.document}`)
        .then(response => {
          const status = response.data ? response.data.status : null;
          setVerificationstatus(status)

        }).catch(err => console.log(err))
    }

  }, []);

  useEffect(() => {
    const orderPlaced = JSON.parse(localStorage.getItem("orderPlaced"));
    if (orderPlaced) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        localStorage.removeItem("orderPlaced");
      }, 3500);
    }
  }, []);

  const filterProducts = id => {
    
    axios.post( `${config.servername}/getProductByMainCategory/${id}`)
    .then(response => {
      dispatch(updateproductaction("filteredproductarray", response.data));
      navigate("/products");

    }).catch(err => console.log(err))

  };

  return (
    <>
      {localStorage.getItem("wholesaller") !== null ? (
        <MainNavbar />
      ) : (
        <IndexNavbar />
      )}

      <div>
        <LandingPageHeader />
        {success && (
          <div
            className="fixed top-0 bg-neutral-800/50 bottom-0 right-0 left-0 z-100 flex items-center justify-center"
            style={{ zIndex: "1000", background: "rgba(0,0,0,0.5)" }}
          >
            <img
              src={SuccessCheck}
              alt="order placed successfully"
              style={{ width: "80%", maxWidth: "450px", margin: "auto" }}
            />
          </div>
        )}

        <br />
        
        <Container maxWidth="lg">

          {/* ----------- High selling products ----------- */}
          <div style={{ maxWidth: "1024px", margin: "auto" }}>
            <h2 class=" text-base font-bold mb-5">High selling products</h2>
            <div className="w-full h-full relative overflow-hidden">
              <div className="flex pb-4  overflow-x-auto high-selling-products">
                {!topCategories || topCategories.length === 0 ? (
                  <div
                    className="flex items-center justify-center w-full mx-auto "
                    style={{ minHeight: "220px" }}
                  >
                    <CircularProgress />
                  </div>
                ) : (
                  topCategories.map((item) => {
                    return (
                      <div
                        className="mr-3 w-32 flex-1 flex flex-col "
                        style={{ minWidth: "170px" }}
                      >
                        <a
                          className="cursor-pointer flex flex-col flex-1 justify-between shadow-xl shadow-gray-800 rounded-xl bg-white p-1 md:p-3 "
                          onClick={() => filterProducts(item._id)}
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
                              src={`${config.servername}/readfiles/${item.image}`}
                              alt={item.title}
                              className="h-14 w-14 md:w-20 md:h-24  mx-auto"
                            />
                          </div>
                        </a>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ----------- Lower Page Images ----------- */}
          <div className="mt-4 pb-28">
            <div style={{ maxWidth: "1024px", margin: "auto" }}>
              <Link to="/">
                <div className=" rounded-lg main-image"></div>
              </Link>
            </div>
            <div
              style={{ maxWidth: "1024px", margin: "auto" }}
              className="mt-0 w-full h-full relative overflow-hidden"
            >
              <div className="overflow-x-auto home-page-banners flex items-start justify-between md:justify-center gap-6 mt-2 ">
                <div style={{ minWidth: "280px", width: "100%" }}>
                  <Link to="/">
                    <div className="banner-1">
                      <div className="rounded-lg main-image main-fmcg-1"></div>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link to="/">
                    <div
                      className="banner-2"
                      style={{ minWidth: "280px", width: "100%" }}
                    >
                      <div className=" rounded-lg main-image main-fmcg-2"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="mt-2"
              style={{ maxWidth: "1024px", margin: "auto" }}
            >
              <Link to="/">
                <div className="rounded-lg main-image rice-image"></div>
              </Link>
            </div>
            <div
              className="mt-2"
              style={{ maxWidth: "1024px", margin: "auto" }}
            >
              <Link to="/">
                <div className="rounded-lg main-image oil-image"></div>
              </Link>
            </div>
            <div
              style={{ maxWidth: "1024px", margin: "auto" }}
              className="mt-2"
            >
              <Link to="/">
                <div className="rounded-lg main-image masala-image"></div>
              </Link>
            </div>
            <div
              style={{ maxWidth: "1024px", margin: "auto" }}
              className="mt-2"
            >
              <Link to="/">
                <div className="rounded-lg main-image aata-image"></div>
              </Link>
            </div>
          </div>

        </Container>
        
        <Footer />
      </div>

      {verificationStatus === null ?
        <div className="kycfooter bg-blue-500 h-20 px-6">
          
          <div>
            <div className="text-white text-lg font-bold">
              <AssignmentIcon /> Want to see prices?
            </div>
            <div className="text-white text-sm font-semibold">
              &nbsp;&nbsp;&nbsp;&nbsp;Complete your shop kyc
            </div>
          </div>

          <IconButton 
            onClick={() => navigate("/verifydocument")}
            aria-label="upload document" 
            size="large" 
            className="floatright"
          >
            <ChevronRightIcon fontSize="inherit" sx={{color: "white"}} />
          </IconButton>

        </div>
      : 
        verificationStatus === "pending" && (
          <div className="kycfooter bg-blue-500 h-20 px-6">
            
            <div>
              <div className="text-white text-lg font-bold">
                <AssignmentIcon /> Want to see prices?
              </div>
              <div className="text-white text-smfont-semibold">
                Your account is under verification once verify you will get notification
              </div>
            </div>

            <a className="text-white">
              <i aria-hidden="true" class="angle right big icon floatright"></i>
            </a>

          </div>
        )
      }
       
    </>
  );
}

export default LandingPage;

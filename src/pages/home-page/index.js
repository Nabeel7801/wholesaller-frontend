import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getList } from "dataProvider";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import MainNavbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footers/Footer";

import { Container, IconButton, Box, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from "axios";

import { Carousel } from "antd";
import SuccessCheck from "assets/img/success/check.gif";
import SubCategories from "./SubCategories";
import CategoriesModal from "./CategoriesModal";
import HorizontalList from "./HorizontalList";

import { populateMainCategories } from "store/reducers/categories";
import { populateProducts } from "store/reducers/products";
import TopSection from "./TopSection";

const useStyles = makeStyles(() => ({
  carousel: {
    borderRadius: "20px",
    background: "#364d79",
    boxShadow: "0px 0px 20px 5px rgba(0, 0, 0, 0.05)"
  },
  banner: {
    width: '100%',
    height: "350px",
    objectFit: 'fill'
  },
  categoryBox: {
    borderRadius: "10px",
    margin: "10px",
    backgroundColor: "rgb(156,156,156)",
    background: "linear-gradient(135deg, rgba(213,211,211,1) 0%, rgba(250,250,252,1) 48%, rgba(250,250,252,1) 52%, rgba(213,211,211,1) 100%)"
  },
  categoryImage: {
    width: "200px",
    height: "200px",
    objectFit: 'contain'
  }
}));

function HomePage() {
  
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.auth.user);
  const { selected: categorySelected, list: categoriesList } = useSelector(state => state.categories);

  const [banners, setBanners] = useState([]);
  const [success, setSuccess] = useState(false);
  const [verificationStatus, setVerificationstatus] = useState(null);

  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    // Fetch Main Category
    getList("admin/categories").then(({ data : categories }) => {
      dispatch(populateMainCategories(categories || []))
    })

    //Read Cart Items
    const orderPlaced = JSON.parse(localStorage.getItem("orderPlaced"));
    if (orderPlaced) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        localStorage.removeItem("orderPlaced");
      }, 3500);
    }
  }, [])

  useEffect(() => {
    // Fetch Products based on Products
    getList("admin/products", categorySelected?.id ? { filter: { main_category: categorySelected.id } }: {})
    .then(response => {
      dispatch(populateProducts(response.data || []))

    }).catch(err => console.log(err))

    // Fetch Banners
    getList("admin/banners", {sort: { reference: 1 }}).then(({ data }) => {
      const filteredData = data?.filter(d => !categorySelected?.id || d.categories?.includes(categorySelected?.id)) || [];
      setBanners(filteredData)
    })
    
  }, [categorySelected])

  useEffect(() => {
    //Check Document Status
    if (user.document) {
      axios.post(`${window["apiLocation"]}/getStatus/${user.document}`)
        .then(response => {
          const status = response.data ? response.data.status : null;
          setVerificationstatus(status)

        }).catch(err => console.log(err))
    }

  }, [user.document]);

  const bannerClick = (categories) => {
    axios.post(`${window["apiLocation"]}/getProductByCategories`, categories)
    .then(response => {
      dispatch(populateProducts(response.data || []))
      navigate("/products");

    }).catch(err => console.log(err))

  }

  return (
    <>

      { user ? <MainNavbar /> : <IndexNavbar /> }
      
      <CategoriesModal />

      <Container maxWidth="lg" style={{ padding: '20px 5px 40px 5px' }}>

        <TopSection />

        <SubCategories />
        <br />

        <Carousel autoplay className={classes.carousel}>
          {banners.map(banner => (
            <img 
              alt="banner"
              className={classes.banner}
              src={`${window["apiLocation"]}/file/${banner.image}`}
              onClick={() => bannerClick(banner?.redirect_categories || [])}
              onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `${window["apiLocation"]}/file/default.png`;
              }}
            />
          ))}
        </Carousel>
        <br />

        <HorizontalList 
          title="Top Rated Products"
          filter="TopRatedProducts"
        />
        <br />
        
        <HorizontalList 
          title="New Arrivals"
          filter="NewArrivals"
        />
        <br />

        <Box className="flex flex-no-wrap overflow-auto">
          {categoriesList
            .filter(c => categorySelected.id ? c.parent === categorySelected.id : c.parent !== "none")
            .map(category => (
              <div style={{ flex: "0 0 200px" }}>
                <Card className={classes.categoryBox} onClick={() => navigate(`/categories/${category.id}`)}>
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
              </div>
            ))
          }
        </Box>
        <br />

        <HorizontalList 
          title="Top Best Sellers"
          filter="TopBestSellers"
        />
        <br />

      </Container>
      
      <Footer />
      
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

      {verificationStatus === null ?
        <div className="kycfooter bg-blue-500 h-40 px-6 z-999">
          
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
            className="floatright"
          >
            <ChevronRightIcon fontSize="inherit" sx={{color: "white"}} />
          </IconButton>

        </div>
      : 
        verificationStatus === "pending" && (
          <div className="kycfooter bg-blue-500 h-40 px-6 z-999">
            
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

export default HomePage;

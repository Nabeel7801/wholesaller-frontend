import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import IndexPage from "pages/index-page";
import HomePage from "pages/home-page";
import OrderHistory from "pages/order-history";

import { GST, VerifyDocument, UploadDocument } from './pages/documents'
import { SignIn, SignUp, ForgotPassword, UpdatePassword } from "pages/authentication"

import SubCategory from "pages/sub-category";
import SubCategoryProducts from "./pages/sub-category-products";
import ProductDetails from "./pages/product-details";

import Cart from "./pages/cart";

import Account from "./pages/account";
import BusinessPage from "./pages/business-page";
import Settings from "./pages/settings";

import Support from "./pages/support";
import Returns from "./pages/returns";
import Payment from "./pages/payment";

import routersaller from "./views/Saller/routes";
import Addlisting from "./views/Saller/Addlisting";

import Sellerpage from "./views/examples/Sellerpage";
import ApplySeller from "./views/examples/Account/ApplySeller";

import AddAddress from "./views/examples/AddAddress";
import SigninCheck from "./views/examples/SigninCheck";

function App() {

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user)

  window["apiLocation"] = "https://wholesaller.com/api";
  //window["apiLocation"] = "http://localhost:5000/api";

  useEffect(() => {
    const { pathname } = window.location;
    if (!user && pathname !== "/") {
      if (pathname !== "/signin" && pathname !== "/signup" && pathname !== "/forgetpass" && pathname.split("/")[1] !== 'admin') {
        navigate("/signin")
      }
    }
  }, [user])

  return (

    <Routes>

      {/* ------------- Seller Routes ------------- */}
        <Route path="/saller" element={routersaller} />

      {/* ----------------------------------------- */}

      <Route path="/" element={user ? <HomePage /> : <IndexPage />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetpass" element={<ForgotPassword />} />
      
      {user &&
        <>
          <Route path="/categories/:parent" element={<SubCategory />} />
          <Route path="/products" element={<SubCategoryProducts />} />
          <Route path="/productdetail/:productID" element={<ProductDetails />} />
          
          <Route path="/cart" element={<Cart />} />

          <Route path="/account" element={<Account />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/setting" element={<Settings />} />

          <Route path="/gst" element={<GST />} />
          <Route path="/verifydocument" element={<VerifyDocument />} />
          <Route path="/uploaddocument/:documentType" element={<UploadDocument />} />
          
          <Route path="/updatepass/:email/:id" element={<UpdatePassword />} />

          <Route path="/order-history" element={<OrderHistory />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/support" element={<Support />} />

          {/* -------------------- Not Updated from here -------------------- */}
          <Route path="/applyseller" element={<ApplySeller />} />
          <Route path="/SigninCheck/:name" element={<SigninCheck />} />
          <Route path="/addlisting" element={<Addlisting />} />
          <Route path="/sellerpage/:id" element={<Sellerpage />} />
          <Route path="/add-address" element={<AddAddress />} />

        </>
      }
    </Routes>

  );
}

export default App;

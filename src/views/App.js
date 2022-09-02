import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Test from "./index-sections/Test";

import { localStorageData } from "./services/auth/localStorageData";
import LandingPage from "views/examples/LandingPage.js";
import Home from "components/Landingpage/Home";

import routersaller from "./Saller/routes";
import Addlisting from "./Saller/Addlisting";
import SubCategory from "./Saller/SubCategory";
import SubCategoryProducts from "./Saller/SubCategoryProducts";
import Support from "./Saller/Support";

import Sellerpage from "./examples/Sellerpage";
import ApplySeller from "./examples/Account/ApplySeller";

// import Setting from "./examples/Setting";
// import Account from "./examples/Account";
// import BusinessPage from "./examples/BusinessPage";

import GST from "./examples/VerifyDocument/GST";
import Order from "./examples/Order";
import Returns from "./examples/Returns";
import AddAddress from "./examples/AddAddress";
import UploadDocument from "./examples/VerifyDocument/UploadDocument";
import Payment from "./examples/Payment";
import Productdetails from "./examples/Productdetails";
import Cart from "./examples/Cart";
import SigninCheck from "./examples/SigninCheck";
import ForgetPass from "./examples/ForgetPass";
import Signup from "./examples/Signup";
import Verifydocument from "./examples/VerifyDocument/Verifydocument";
import Signin from "./examples/Signin";

function App() {
  return (

      <BrowserRouter>

        <Routes>

          {/* ------------- Index Page ------------- */}
          {
            localStorageData("_id") ? 
              <Route path="/" element={<LandingPage />} /> :
              <Route path="/" element={<Home />} />
          }

          {/* ------------- Seller Routes ------------- */}

          <Route path="/saller" element={routersaller} />

          <Route path="/categories/:parent" element={<SubCategory />} />
          <Route path="/products" element={<SubCategoryProducts />} />
          <Route path="/productdetail/:productID" element={<Productdetails />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/verifydocument" element={<Verifydocument />} />
          <Route path="/uploaddocument/:documentType" element={<UploadDocument />} />
          
          <Route path="/updatepass/:email/:id" element={<updatePass />} />

          <Route path="/applyseller" element={<ApplySeller />} />
          <Route path="/SigninCheck/:name" element={<SigninCheck />} />

          <Route path="/addlisting" element={<Addlisting />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/returns" element={<Returns />} />
          
          <Route path="/cart" element={<Cart />} />
{/* 
          <Route path="/account" element={<Account />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/setting" element={<Setting />} />
           */}
          <Route path="/sellerpage/:id" element={<Sellerpage />} />
          <Route path="/forgetpass" element={<ForgetPass />} />

          <Route path="/gst" element={<GST />} />
          <Route path="/order" element={<Order />} />

          <Route path="/test" element={<Test />} />
          <Route path="/support" element={<Support />} />
          <Route path="/add-address" element={<AddAddress />} />

        </Routes>

      </BrowserRouter>

  );
}

export default App;

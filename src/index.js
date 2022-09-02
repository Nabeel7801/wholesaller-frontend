import React, { useState } from "react";
import ReactDOM from "react-dom";

// styles
import "react-phone-input-2/lib/style.css";
import "assets/css/bootstrap.min.css";
import "assets/css/paper-kit.css";
import "assets/demo/demo.css";
import "assets/demo/style.css";
import "react-toastify/dist/ReactToastify.min.css";
import 'antd/dist/antd.css';

// pages
import App from "views/App.js";
import sellerStatus from "./views/reducers/sellerStatus";
import adminReducer from "./views/reducers/adminReducer";
import cartdetail from "./views/reducers/cartdetails";
import addlistingreducer from "./views/reducers/addlistingreducer";
import reducer1 from "./views/reducers/reducer1";
import allcategories from "views/reducers/allCategoryReducer";

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import productsdata from "./views/reducers/productreducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { QueryClient, QueryClientProvider } from "react-query";

//Portals
import { AppContext } from './portals/context';
import { AdminApp } from './portals/Admin'

const Portals = () => {
  const [appState, setAppState] = useState({
    ATLAS_URI: "http://localhost:5000"
  })

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <AdminApp />
    </AppContext.Provider>
  )

}

const master = combineReducers({
  productarray: productsdata,
  age: reducer1,
  cartdetailarray: cartdetail,
  addlisting: addlistingreducer,
  sellerStatus: sellerStatus,
  adminStatus: adminReducer,
  allcategories: allcategories,
});

const store = createStore(master, composeWithDevTools(applyMiddleware(thunk)));
const queryClient = new QueryClient();

ReactDOM.render(

  <>
    {/* ------------- Panels (Admin, Warehosuse, Seller) ------------- */}
    <Portals />

    {/* ------------- Rest of the App ------------- */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <ToastContainer />
    </Provider>
  </>,

document.getElementById("root")
);

import React, { useState } from "react";
import {createRoot} from 'react-dom/client';

// styles
import "react-phone-input-2/lib/style.css";
import "assets/css/bootstrap.min.css";
import "assets/css/paper-kit.css";
import "react-toastify/dist/ReactToastify.min.css";
import 'antd/dist/antd.min.css';

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
    ATLAS_URI: "https://wholesaller.com/api"
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

const AdminTheme = React.lazy(() => import('./assets/themes/AdminTheme'));
const AppTheme = React.lazy(() => import('./assets/themes/AppTheme'));

const ThemeSelector = () => {
  const pathname = window.location.pathname.split('/')[1];
  
  return (
    <React.Suspense fallback={() => null}>
      {pathname === "admin" ? 
        <AdminTheme />
      : 
        <AppTheme />
      }
    </React.Suspense>
  )
}

const store = createStore(master, composeWithDevTools(applyMiddleware(thunk)));
const queryClient = new QueryClient();

createRoot(document.getElementById("root"))
  .render(
    <>
      <ThemeSelector />

      {/* ------------- Panels (Admin, Warehosuse, Seller) ------------- */}
      <Portals />

      {/* ------------- Rest of the App ------------- */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <ToastContainer />
      </Provider>

    </>
  );

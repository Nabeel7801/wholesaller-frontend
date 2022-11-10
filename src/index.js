import React from "react";
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "App";
import Portals from "portals"
import { store, persistor } from 'store';
import ThemeSelector from "utils/ThemeSelector"
import Loader from 'components/Loader';

// styles
import "react-phone-input-2/lib/style.css";
import "assets/css/bootstrap.min.css";
import "assets/css/tailwind.css";
import "assets/css/paper-kit.css";
import "react-toastify/dist/ReactToastify.min.css";
import 'antd/dist/antd.min.css';

const queryClient = new QueryClient();

createRoot(document.getElementById("root"))
  .render(
    <>
      <ThemeSelector />
      <Portals />

      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </QueryClientProvider>
        <ToastContainer />
      </Provider>

    </>
  );

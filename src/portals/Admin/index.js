import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Admin, Title, Resource, CustomRoutes, NotFound } from 'react-admin';
import { Route } from 'react-router';

import { lightTheme } from './layout/themes';

import { Dashboard } from './pages/dashboard';
import { Login, Layout } from './layout';

import authProvider from './authProvider';
import dataProvider from './dataProvider';

import Settings from './pages/settings';

import SubCategoryList from './pages/categories/SubCategoryList';
import ChildCategoryList from './pages/categories/ChildCategoryList';

import banners from './pages/banners'
import categories from './pages/categories';
import orders from './pages/orders';
import invoices from './pages/invoices';
import payments from './pages/payments';
import products from './pages/products';
import customers from './pages/customers';
import warehouses from './pages/warehouses';
import users from './pages/users';

function AdminApp() {

  return (
    <BrowserRouter basename="/admin">
        <Admin 
            dashboard={Dashboard} 
            loginPage={Login}
            dataProvider={dataProvider} 
            layout={Layout}
            catchAll={NotFound}
            authProvider={authProvider}
            theme={lightTheme}
        >
          <Title title="Dashboard" />
          <Resource
              name="orders"
              {...orders}
              options={{ label: 'Orders' }}
          />

          <Resource name="banners" {...banners} />

          <Resource name="categories" {...categories} />
          <Resource name="subcategories" list={SubCategoryList} icon={categories.icon} />
          <Resource name="childcategories" list={ChildCategoryList} icon={categories.icon} />

          <Resource name="invoices" {...invoices} />
          <Resource name="products" {...products} />
          
          <Resource name="payments" {...payments} />

          <Resource name="users" {...users} />
          <Resource name="customers" {...customers} />
          <Resource name="warehouses" {...warehouses} />

          <CustomRoutes>
            <Route path="/settings" element={<Settings />} />
          </CustomRoutes>

        </Admin>
    </BrowserRouter>
  );
}

export { AdminApp };
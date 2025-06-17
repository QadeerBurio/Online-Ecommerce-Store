import React from "react";
import {
  Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
} from "./shop";

import {
  DashboardAdmin,
  Categories,
  Products,
  Orders,
} from "./admin";

import {
  UserProfile,
  UserOrders,
  SettingUser,
} from "./shop/dashboardUser";

import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/category/:catId" element={<ProductByCategory />} />

        {/* Cart Protected Route */}
        <Route element={<CartProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/dashboard/categories" element={<Categories />} />
          <Route path="/admin/dashboard/products" element={<Products />} />
          <Route path="/admin/dashboard/orders" element={<Orders />} />
        </Route>

        {/* User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/orders" element={<UserOrders />} />
          <Route path="/user/setting" element={<SettingUser />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
};

export default AppRoutes;

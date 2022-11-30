import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignUp from "../LoginSignUpPage";
import ProfilePage from "../ProfilePage";
import PrivateRoute from "../../components/Route/PrivateRoute";
import UpdateProfilePage from "../UpdateProfilePage";
import UpdatePasswordPage from "../UpdatePasswordPage";

import ForgotPasswordPage from "../users/ForgetPassword";
import ResetPasswordPage from "./ResetPasswordPage";

import Cart from "../users/CartPage";
import Wishlist from "../users/WishlistPage";
import Orders from "../OrdersPage";

import Checkout from "../CheckoutPage"
import ConfirmOrder from "../ConfirmOrderPage";
import Payment from "../PaymentPage";
import OrderCompleted from "../OrderCompletedPage";

function UserPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignUp />} />

      <Route path="/account" element={<ProfilePage />}>
      </Route>

      {/* <Route path="/account/update" element={<PrivateRoute />}>
        <Route path="" element={<UpdateProfilePage />} />
      </Route> */}
      {/* <Route path="/account/update" element={<PrivateRoute />}> */}
      <Route path="/account/update" element={<UpdateProfilePage />} />
      {/* </Route> */}

      <Route path="/account/password/update" element={<PrivateRoute />}>
        <Route path="" element={<UpdatePasswordPage />} />
      </Route>

      {/* <Route path="/cart" element={<Cart />}>
      </Route> */}
      {/* <Route path="/wishlist" element={<Wishlist />}>
      </Route> */}


      <Route path="/orders" element={<Orders />}>
      </Route>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirm_order" element={<ConfirmOrder />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order_completed" element={<OrderCompleted />} />
    
     
    </Routes>
  );
}

export default UserPages;
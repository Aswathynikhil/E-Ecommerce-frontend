import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { loadUser } from "./redux/actions/userAction";
import { useSelector } from "react-redux";
import { getShippingInfo, myCartItems } from "./redux/actions/cartAction";
import axios from "./axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import { toast } from "react-hot-toast";
// import { getWishlistItems } from "./redux/actions/wishlistAction";
import store from "./redux/store";
import UserPages from "./pages/users/UserPages";
import AdminPages from "./pages/Admin/AdminPages";


import "./App.css";
import Navbarnew from "./components/Navigation/Navbarnew";
import Navbar from "./components/Navigation/Navbar";
import Home from "./pages/Home";

import VerifyPhoneNumber from "./pages/VerifyPhoneNumberPage";
import ForgotPassword from "./pages/users/ForgetPassword";
import ResetPassword from "./pages/users/ResetPasswordPage";
import ProductsPage from "./pages/ProductsPage";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getWishlistItems } from "./redux/actions/wishlistAction";
import Cart from "./components/User/Cart";
import Wishlist from "./components/User/WishList";




const TOAST_LIMIT = 3;

function App() {

  // const { toasts } = useToasterStore();

  // Enforce Limit
  // useEffect(() => {
  //   toasts
  //     .filter((t) => t.visible) // Only consider visible toasts
  //     .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
  //     .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  // }, [toasts]);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  // console.log(isAuthenticated, "vvvvvvv");
  // console.log(user,"user");
  if (user) {
    user && localStorage.setItem("Userdetails", JSON.stringify(user));
  }

  // const [stripeApiKey, setStripeApiKey] = useState("");
  // async function getStripeApiKey() {
  //   const { data } = await axios.get(`/stripeapikey`);
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    // store.dispatch(getShippingInfo());
    store.dispatch(loadUser());
    store.dispatch(myCartItems());
    store.dispatch(getWishlistItems());
    // getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu",(e)=>e.preventDefault());

  const details = JSON.parse(localStorage.getItem("Userdetails"));

  // if (details && Object.keys(details).length === 0) {
  // } else {
  //   if (details && details.verified.phone === false) {
  //     toast((t) => (
  //       <div className="toastCustomAppDiv">
  //         <span className="toastCustomApp">
  //           '👏' hi {details && details.name}, Your Phone Number is not Verified
  //           <a href="/verify/phone">
  //             <button>Verify</button>
  //           </a>
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             style={{ margin: "0 .5vmax" }}
  //           >
  //             Later
  //           </button>
  //         </span>
  //       </div>
  //     ));
  //   }
  // }
  return (
    <>
      {/* <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 30000 }}
      /> */}
      <ToastContainer/>
      {isAuthenticated ? <Navbar /> : <Navbarnew />}

      <Routes>
        <Route path="/user/*" element={<UserPages />} />
        <Route path="/admin/*" element={<AdminPages />} />
        <Route path="/" element={<Home />} />

        <Route path="/verify/phone" element={<VerifyPhoneNumber />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/user/password/reset/:token" element={<ResetPassword />} />
        <Route path="/product/:keyword" element={<ProductsPage />} />
        <Route path="/cart" element={<Cart />}>
      </Route>

      <Route path="/wishlist" element={<Wishlist />}>
      </Route>

        <Route path="/product" element={<ProductsPage />} />
        <Route path="/*" element={<PageNotFound />} />

    

        {/* {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <PaymentPage />
                </Elements>
              }
            />
          )} */}
      </Routes>
    </>
  );
}

export default App;
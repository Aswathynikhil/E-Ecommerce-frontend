import React from "react";
import Footer from "../components/Footer";
import Navbarnew from "../components/Navigation/Navbarnew";
import Products from "../components/Products";
import Sidebaruser from "../components/SidebarUser";


const Productlist = () => {
  return (
    <>
      <div className="h-screen  ">
        <div>
          <Products />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Productlist;

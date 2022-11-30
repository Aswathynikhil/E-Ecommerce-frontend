import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPrivateRoute from "../../components/Route/AdminPrivateRoute";




import Dashboard from "../Admin/DashboardPage";
import AddCategory from "../Admin/AddCategoryPage";
import CategoryList from "../Admin/CategoryListPage";

import AddBanner from "../Admin/AddBannerPage";
import BannerImages from "../Admin/BannerImagePage";
import AddGalleryImage from "../Admin/AddGalleryImagePage";
import GalleryImages from "../Admin/GalleryImagePage";
import AddProduct from "../Admin/AddProductPage";
import ProductList from "../Admin/ProductListPage";
import UpdateProduct from "../Admin/UpdateProductPage";

import UserList from "../Admin/UserListsPage";
import OrderList from "../Admin/OrderListPage";

import ProfilePage from "../ProfilePage";
import UpdateProfilePage from "../UpdateProfilePage";
import UpdatePasswordPage from "../UpdatePasswordPage";
import UpdateOrder from "../../components/Admin/products/UpdateOrder";

function AdminPages() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add_category" element={<AddCategory />} />
            <Route path="/categoryList" element={<CategoryList />} />

            <Route path="/add_banner" element={<AddBanner />} />
            <Route path="/banner_images" element={<BannerImages />} />
            <Route path="/add_galleryImage" element={<AddGalleryImage />} />
            <Route path="/gallery_images" element={<GalleryImages />} />
            <Route path="/add_product" element={<AddProduct />} />
            <Route path="/products_list" element={<ProductList />} />
            <Route path="/product/:id" element={<UpdateProduct />} />
            <Route path="/order/:id" element={<UpdateOrder></UpdateOrder>}/>
            <Route path="/users" element={<UserList />} />
            <Route path="/orderlist" element={<OrderList />} /> 
            <Route path="/account" element={<ProfilePage />}></Route>
            <Route path="/account/update" element={<UpdateProfilePage />} />
            <Route path="/account/password/update" element={<UpdatePasswordPage />} />       
       

      
        </Routes>
    );
}

export default AdminPages;
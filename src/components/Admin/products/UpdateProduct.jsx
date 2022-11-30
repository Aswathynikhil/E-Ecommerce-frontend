
import React, { Fragment, useState } from "react";
import "./UpdateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductDetails,
    updateProduct,
    clearErrors,
} from "../../../redux/actions/productAction";
// import { useAlert } from "react-alert";
// import MetaData from "../../../layout/MetaData";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import DescriptionIcon from "@mui/icons-material/Description";
// import StorageIcon from "@mui/icons-material/Storage";
// import SpellcheckIcon from "@mui/icons-material/Spellcheck";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "../Dashboard/Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
// import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
// import Loader from "../../../layout/Loader/Loader";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import { ToastContainer, toast } from 'react-toastify';

function UpdateProduct() {
    const dispatch = useDispatch();
    //const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error: updateError, isUpdated } = useSelector(
        (state) => state.product
    );
    const { product, error } = useSelector((state) => state.productDetails);
    const { categoryList } = useSelector((state) => state.allCategories);

    const [name, setName] = useState("");
    const [mrp, setMrp] = useState();
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreviw, setImagesPreviw] = useState([]);
    const [qtyType, setQtyType] = useState();
    const [productType, setProductType] = useState("")
    const [discount, setDiscount] = useState()
    const [oldImages, setOldImages] = useState([]);
    const [gst, setGst] = useState()
    // const categories = [
    //     "Laptop",
    //     "Footwear",
    //     "Bottom Wear",
    //     "Top Wear",
    //     "Camera",
    //     "SmartPhone",
    // ];

    const productId = id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setMrp(product.mrp)
            // setDescription(product.description);
            // setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
            setQtyType(product.qtyType);
            setProductType(product.productType);
            setDiscount(product.discount);
            setGst(product.gst);

        }

        if (error) {
           toast.error(error.message);
            dispatch(clearErrors());
        }
        if (updateError) {
           toast.error(updateError.message);
            dispatch(clearErrors());
        }

        if (isUpdated) {
           toast.success("Product Updated Successfully");
            navigate("/admin/products_list");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }

        dispatch(getAllCategories());
    }, [
        dispatch,
        alert,
        error,
        isUpdated,
        navigate,
        productId,
        product,
        updateError,
    ]);


    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("mrp", mrp);
        // myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        myForm.set("qtyType", qtyType)
        myForm.set("productType", productType)
        myForm.set("discount", discount)
        myForm.set("gst", gst)

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreviw([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreviw((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };


    const createCategoryList = (categories, options = []) => {
        if (categories) {
            for (let category of categories) {
                options.push({ value: category._id, name: category.name });
                if (category && category.children.length > 0) {
                    createCategoryList(category.children, options);
                }
            }
            return options;
        }

    };

    return (
        <div>
            <>
                {/* <div className="container sm: w-screen"> */}
                {/* <MetaData
                          title={`${"Create Product -Admin"} -- ${process.env.REACT_APP_SITE_NAME
                              }`}
                      /> */}
                <div className="container dashboard parent md:h-screen md:grid md:grid-cols-6 ">
                    <section className="sidebar md:col-span-1 ">
                        {" "}
                        <SideBar />
                    </section>

                    <div className="newProductContainer  ">
                        <form
                            action=""
                            className="createCategoryForm  "
                            encType="multipart/form-data"
                            onSubmit={updateProductSubmitHandler}
                          >
                            <h1 className="mb-3 font-serif font-bold text-lg">Add Product</h1>
                            <div>
                                {/* <BiCategoryAlt /> */}
                                <input
                                    className=" mb-2"
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                {/* <AiOutlineBranches /> */}
                                {/* <select onChange={(e) => setParentId(e.target.value)}> */}
                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    className="mb-2"
                                >
                                    <option value="">Choose Category</option>

                                    {categoryList &&
                                        createCategoryList(categoryList).map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div>
                                {/* <AiOutlineBranches /> */}
                                {/* <select onChange={(e) => setParentId(e.target.value)}> */}
                                <select
                                    onChange={(e) => setQtyType(e.target.value)}
                                    value={qtyType}
                                    className="mb-2"
                                >
                                    <option value="">Choose(Kg/Lt)</option>

                                    <option value="Kg">Kg</option>
                                    <option value="Ltr">Ltr </option>
                                </select>
                                <select
                                    onChange={(e) => setProductType(e.target.value)}
                                    value={productType}
                                    className="mb-2"
                                >
                                    <option value="">Type of Product</option>

                                    <option value="New">New</option>
                                    <option value="Trending">Trending </option>
                                </select>
                            </div>
                            <div>
                                {/* <BiCategoryAlt /> */}
                                <input
                                    className=" mb-2"
                                    type="text"
                                    placeholder="MRP"
                                    required
                                    value={mrp}
                                    onChange={(e) => setMrp(e.target.value)}
                                />
                            </div>
                            <div>
                                {/* <BiCategoryAlt /> */}
                                <input
                                    className=" mb-2"
                                    type="text"
                                    placeholder="Discount in Percentage"
                                    required
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </div>
                            <div>
                                {/* <BiCategoryAlt /> */}
                                <input
                                    className=" mb-2"
                                    type="text"
                                    placeholder="GST"
                                    required
                                    value={gst}
                                    onChange={(e) => setGst(e.target.value)}
                                />
                            </div>
                            {/* <div > */}
                            {/* <BiCategoryAlt /> */}
                            {/* <textarea
                                    className=' mb-2'
                                    type="text"
                                    placeholder="Description"
                                    required
                                //value={name}
                                // onChange={(e) => setName(e.target.value)}
                                /> */}
                            {/* </div> */}

                            <div>
                                {/* <BiCategoryAlt /> */}
                                <input
                                    className=" mb-2"
                                    type="number"
                                    placeholder="Stock"
                                    required
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div id="createProductFormFile">
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProductImagesChange}
                                        multiple
                                    />
                                </div>

                                <div id="createProductFormImage">
                                    {oldImages &&
                                        oldImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.url}
                                                alt="Old Product Preview"
                                            />
                                        ))}
                                </div>

                                <div id="createProductFormImage">
                                    {imagesPreviw.map((image, index) => (
                                        <img key={index} src={image} alt="Product Preview" />
                                    ))}
                                </div>

                            <div className="bg-orange-900 w-full  border-r-5 flex justify-center text-white rounded-md m-2">
                                <button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={loading ? true : false}
                               >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* </div> */}
                </div>
            </>
        </div>
    );
}

export default UpdateProduct;
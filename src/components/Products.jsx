import React, { useState, useEffect } from "react";
import { FaThList } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Sidebar from "../components/SidebarUser";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../redux/actions/productAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import Counter from "./Counter";
import { ADD_TO_CART_RESET } from "../constants/cartConstants";
import { addItemsToCart } from "../redux/actions/cartAction";
import { ADD_TO_WISHLIST_RESET } from "../constants/wishListConstants";
import { addItemsToWishlist } from "../redux/actions/wishlistAction";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { getAllCategories } from "../redux/actions/categoryAction";
import Loader from "./Loader/Loader";

const Products = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");

  // const [quantity,setQuantity] = useState(0)

  const {
    loading: wishLoading,
    error: wishErr,
    message,
    success,
  } = useSelector((state) => state.newWishlist);
  const { isAuthenticated } = useSelector((state) => state.user);
  const {
    loading,
    error,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const {
    message: cartMsg,
    success: newCart,
    error: cartError,
  } = useSelector((state) => state.cart);

  const { categoryList } = useSelector((state) => state.allCategories);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getAllCategories());
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category, error]);

  let count = filteredProductsCount;


  const renderCategories = (categories) => {
    let categoryArray = [];

    for (let category of categories) {
      categoryArray.push(
        <li key={category.name} >
          {category.parentId ? (
          
            <a  href={category.name} onClick={() => setCategory(category.name)}>
              {category.name}
              </a>
         
          ) : (
            <a onClick={() => setCategory(category.name)}>
              {category.name}
            </a>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryArray;
  };

  const allproductsHandler = () => {
    window.location.reload();
    navigate("/product");
  };

  let [selectedAmount, setSelectedAmount] = useState();


  const addToWishlistHandler = (id,stock) => {
    if (isAuthenticated) {
      if (stock <= 0) return toast.info("The stock has run out");
     
      dispatch(addItemsToWishlist(id));
    } else {
      toast.info("Please Login");
    }
  };
  const addItemsToCartHandler = (id,selectedAmount,quantity = 1) => {
    if (isAuthenticated) {
      if(!selectedAmount){
        return toast.info("Please Select Option");
      }
        
        dispatch(addItemsToCart(id, selectedAmount, quantity));
        setSelectedAmount("")
        
        

     
    } else {
      navigate("/user/login");
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (cartError) {
      toast.error(cartError.message);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(message);
      dispatch({ type: ADD_TO_WISHLIST_RESET });
    }
    if (newCart) {
      toast.success(cartMsg);
      dispatch({ type: ADD_TO_CART_RESET });
    }
    dispatch(getProducts());
  }, [dispatch, error, success, message, newCart,cartError,cartMsg]);


  return (
    <>
    {loading ?
    (<Loader/>)
  :
  (
      <div className=" bg-gray-200 min-h-[470px] radius-for-skewed p-5 overflow-x-hidden ">
        <div className="container  md:px-12 lg:ml-20">
          <div className="flex flex-wrap md:p-20 ">
            {filteredProductsCount && filteredProductsCount ? (
              products &&
              products.map((product,key) => (
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  " key={key}>
                  <div className=" shadow rounded overflow-hidden group pl-5 pr-5 pt-5  ml-8  ">
                    {/* product image */}
                    <div className="relative flex justify-center w-">
                      <div>
                        <img
                          src={product?.images[0].url}
                          alt=""
                          className="w-[12rem] h-[8rem]"
                        />
                      </div>

                      <div className="absolute inset-0  grid  items-center justify-end ">
                        {product.productType === "New" ? (
                          <>
                            {/* <div className="mb-1 ml-10 h-6">
                              <span className=" pl-0.5   bg-black "></span>
                            </div> */}
                            <span className="badge rotate-90 mb-12 ml-8">
                              {product?.productType}
                            </span>
                            <button
                              onClick={() => addToWishlistHandler(product?._id,product?.stock)}
                              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center bg-red-500 "
                            >
                              <AiOutlineHeart />
                            </button>
                          </>
                        ) : product.productType === "Trending" ? (
                          <>
                            {/* <div className="mb-1 ml-10  h-6">
                              <span className=" pl-0.5  bg-black "></span>
                            </div> */}
                            <span className="badge rotate-90 mb-12 ml-6">
                              {product?.productType}
                            </span>
                            <button
                              onClick={() => addToWishlistHandler(product?._id,product?.stock)}
                              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center bg-red-500 "
                            >
                              <AiOutlineHeart />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => addToWishlistHandler(product?._id,product?.stock)}
                            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center bg-red-500 mr-12 mt-auto"
                          >
                            <AiOutlineHeart />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-10 flex-col gap-3 flex justify-center">
                      {/* product details */}
                      <div className="px-4 py-3 ">
                        <p className="product-title text-lg font-bold block truncate capitalize">
                          {product?.name}
                        </p>
                        {product?.qtyType === "Kg" ? (
                          <select
                            onChange={(e) => setSelectedAmount(e.target.value)}
                            value={product?.selectedAmount}
                            className="w-44 rounded-sm text-sm text-gray-600 px-1 py-1 border "
                          >
                            <option>Select Option</option>
                            <option value={(product.discountAmount).toFixed(2)}>
                              1 Kg - {product.discountAmount}
                            </option>
                            <option value={(product.discountAmount * 2).toFixed(2)}>
                              2 Kg - {product.discountAmount * 2}
                            </option>
                            <option value={(product.discountAmount * 3).toFixed(2)}>
                              3 Kg - {product.discountAmount * 3}
                            </option>
                          </select>
                        ) : product?.qtyType === "Ltr" ? (
                          <select
                            onChange={(e) => setSelectedAmount(e.target.value)}
                            value={product?.selectedAmount}
                            className="w-44 rounded-sm text-sm text-gray-600 px-1 py-1 border "
                          >
                            <option>Select Option</option>
                            <option value={(product.discountAmount).toFixed(2)}>
                              1 Ltr - {product.discountAmount}
                            </option>
                            <option value={(product.discountAmount * 2).toFixed(2)}>
                              2 Ltr - {product.discountAmount * 2}
                            </option>
                            <option value={(product.discountAmount * 3).toFixed(2)}>
                              3 Ltr - {product.discountAmount * 3}
                            </option>
                          </select>
                        ) : product?.qtyType === "gm" ? (
                          <select
                            onChange={(e) => setSelectedAmount(e.target.value)}
                            value={product?.selectedAmount}
                            className="w-44 rounded-sm text-sm text-gray-600 px-1 py-1 border "
                          >
                            <option>Select Option</option>
                            <option value={(product.discountAmount / 10).toFixed(2)}>
                              100 gm - {product.discountAmount / 10}
                            </option>
                            <option value={(product.discountAmount / 4).toFixed(2)}>
                              250 gm - {product.discountAmount / 4}
                            </option>
                            <option value={(product.discountAmount / 2).toFixed(2)}>
                              500 gm - {product.discountAmount / 2}
                            </option>
                          </select>
                        ) : (
                          <label className="w-44 rounded-sm text-sm text-gray-600 px-1 py-1 border cursor-not-allowed flex">
                            No Options{" "}
                            <MdKeyboardArrowDown className="flex ml-14 mt-2" />
                          </label>
                        )}

                        {product.discount ? (
                          <div className="flex items-center">
                            <p className="text-lg font-semibold my-3">
                              ₹{(product?.discountAmount).toFixed(2)}
                            </p>
                            <del>
                              <p className="text-sm text-gray-600 ml-2">
                                MRP ₹{(product?.mrp).toFixed(2)}
                              </p>
                            </del>
                            <span className="discount-percent ml-2">
                              Save {product?.discount}%
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <p className="text-lg font-semibold my-3">
                              ₹{(product?.mrp).toFixed(2)}
                            </p>
                          </div>
                        )}
                        {/* add to cart button */}

                        <div className="flex flex-row justify-between">
                          <button
                            className="button-primary  gap-1 flex flex-row uppercase"
                            onClick={() => addItemsToCartHandler(product?._id,selectedAmount)}
                          >
                            <AiOutlineShoppingCart className="mt-1" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center border rounded-md m-auto ">
                <p className="productsHeadingForNoRecord flex justify-center font-serif ">
                  We will have products soon...
                </p>
              </div>
            )}
            {/* </div> */}
          </div>

        </div> 


        
        {/* filterBox */}
        <div className="filterBox">

          <div className="categoryContainer min-h-[400px] ">

            <ul >
              <li className="text-2xl textslate-500 font-Semibold cursor-pointer" onClick={allproductsHandler}>
                All Categories</li>
              {categoryList && categoryList.length > 0
                ? renderCategories(categoryList)
                : null}
              {/* </li> */}
            </ul>

          </div>

        </div>

        {resultPerPage < count && (
          <div className="flex flex-1 justify-center ">

            <div className="flex flex-col items-center">

              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
        )}
      </div>
      )}
    </>
  );
};

export default Products;
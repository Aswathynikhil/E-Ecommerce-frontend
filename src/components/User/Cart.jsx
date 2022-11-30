import React, { useEffect, useState } from "react";
// import img from "../image/decor7.jpg";
// import Counter from "../components/Counter";
import Footer from "../../components/Footer";
// import NavBar from "../components/Navbarnew";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  clearErrors,
  myCartItems,
  deleteCartItem,
} from "../../redux/actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD_TO_CART_RESET,
  DELETE_CART_RESET,
} from "../../constants/cartConstants";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems, loading } = useSelector((state) => state.mycart);
  const { success } = useSelector((state) => state.cart);
  const { message, isDeleted, error } = useSelector(
    (state) => state.deleteCart
  );

  const [quantity, setQuantity] = useState(1);
  // console.log('cart page',cartItems)
  // console.log('catitems from redux in cart page',cartItems)
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success(message);
      dispatch({ type: DELETE_CART_RESET });
    }
    if (success) {
      dispatch({ type: ADD_TO_CART_RESET });
    }
    // if(qty){
    //     dispatch()
    // }

    dispatch(myCartItems());
  }, [dispatch, success, error, alert, message, isDeleted]);

  const increaseQuantity = (id, quantity, stock, price) => {
    if (stock <= quantity) return toast.info("The stock has run out");
    let newQty = quantity + 1;
    dispatch(addItemsToCart(id, price, newQty));
  };

  const decreaseQuantity = (id, quantity, price) => {
    if (1 >= quantity) return toast.info("The stock has run out");
    let newQty = quantity - 1;
    dispatch(addItemsToCart(id, price, newQty));
  };

  // useEffect(()=>{
  //     dispatch(addItemsToCart(quantity))
  // },[quantity])

  // const increaseQuantity = (id, quantity) => {
  //     // if (stock <= quantity) return toast.log("The stock has run out");
  //     // let newQty = quantity + 1;
  //     dispatch(addItemsToCart(id, quantity));
  // };

  // const decreaseQuantity = (id, quantity) => {
  //     // if (1 >= quantity) return toast.log("The stock has run out");
  //     // let newQty = quantity - 1;
  //     dispatch(addItemsToCart(id, quantity));
  // };

  const subtotal = Math.round(
    cartItems &&
      cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  const TaxPrice = Math.round(
    cartItems && cartItems.reduce((acc, item) => acc + item.tax, 0)
  );
  const TotalAmount = Number(subtotal + TaxPrice);
  console.log(subtotal, TaxPrice, TotalAmount, "=========");

  const checkoutHandler = () => {
    if (!isAuthenticated || isAuthenticated === false) {
      navigate("/user/login");
    } else {
      if (user.verified.phone === true) {
        navigate("/user/checkout");
      } else {
        navigate("/user/verify/phone");
      }
    }
  };
  const removeCartitemHandler = (id) => {
    dispatch(deleteCartItem(id));
  };
  return (
    <>
{loading ?(
  <Loader/>
)
:(
  <>
      {(cartItems && cartItems.length === 0) || !cartItems ? (
        <>
          <div className=" p-2 pt-16 mb-16  mobile:flex-col mobile:items-start grid grid-cols-1 ">
            <div className="flex-1 flex justify-center flex-wrap p-2 min-h-[350px]">
              <div className="flex flex-coloumn  justify-center font-serif mr-10">
                <h3 className="uppercase text-center">
                  No product in your Cart!
                </h3>
                {/* <h1>No product in your Cart</h1> */}
              </div>

              <div className="">
                <Link to="/product">
                  <button className="button-primary mt-2 uppercase">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* <div className='pb-16 mb-14'></div> */}
        </>
      ) : (
        <div className="p-9">
          <div className="flex justify-center text-5xl">Cart</div>
          <div className="flex items-center justify-between mt-4">
            {/* <Link to='/'> */}
            <a
              href="/product"
              className="button-primary bg-white text-[#eab308] border-2 border-[#eab308] hover:bg-white"
            >
              Continue Shopping
            </a>
            {/* </Link> */}

            <div className="flex unserline text-lg hover:cursor-pointer">
              {/* <p>Items in your Cart : {item.length}</p> */}
              {/* <p>Wishlist Item: 0</p> */}
            </div>
            {/* <Link to ="/checkout"> */}
            <button className="button-primary" onClick={checkoutHandler}>
              checkout
            </button>
            {/* </Link> */}
          </div>

          {/* central div */}

          <div className="flex mt-7 justify-between">
            <div className="flex-row ">
              {cartItems &&
                cartItems.map((item, index) => (
                  <>
                    <div className="flex flex-1  " key={index}>
                      {/* list of products div */}

                      <div className="flex w-[100%] h-auto items-center gap-6">
                        <div className="product flex self-start pl-5">
                          <img
                            src={item?.image}
                            alt="product_img"
                            className="w-[9rem] h-[80%] rounded-lg shadow-lg hover:scale-[1.1] ease-in duration-300"
                          />
                          <div className="description flex flex-col ml-5 h-auto justify-between">
                            <p className="mr-2">
                              <b>ID: </b>
                              {item?._id}
                            </p>
                            <p className="mr-2">
                              <b>PRoduct: </b>
                              {item?.name}
                            </p>
                            <p className="mr-2">
                              <b>Qty: </b>
                              {item?.quantity}
                            </p>
                            {/* <p className='mr-2'>
                        <b>Price: </b>₹ 100
                    </p> */}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center flex-auto">
                          {/* <Counter /> */}
                          <div className="flex items-center justify-center text-3l">
                            <div className="ml-1 shadow-md flex">
                              <div
                                className="bg-gray-500 border-gray-300 text-gray-900 w-3 flex items-center justify-center cursor-pointer rounded-l-md"
                                onClick={() =>
                                  decreaseQuantity(
                                    item.product,
                                    item.quantity,
                                    item.stock,
                                    item.price
                                  )
                                }
                              >
                                -
                              </div>
                              {/* <div className='bg-gray-500 border-gray-300 text-gray-900 w-3 flex items-center justify-center cursor-pointer rounded-l-md'
                                                            onClick={() =>
                                                          setQuantity(
                                                            item?.product,
                                                                    quantity-1
                                                                    )
                                                            }>
                                                            -
                                                        </div> */}
                              {/* <div className='w-8 flex item-center justify-center border-[1px] border-gray-300'>
            {counter < 0 ? 0 : counter}
        </div> */}
                              <input
                                type="number"
                                value={item?.quantity}
                                readOnly
                                className="w-8 flex item-center justify-center border-[1px] border-gray-300"
                              />
                              {/* <input type="number" value={quantity < 0 ? 0 : quantity} readOnly className='w-8 flex item-center justify-center border-[1px] border-gray-300' /> */}

                              <div
                                className="bg-gray-500 border-gray-300 text-gray-900 w-3 flex items-center justify-center cursor-pointer rounded-r-md"
                                onClick={() =>
                                  increaseQuantity(
                                    item.product,
                                    item.quantity,
                                    item.stock,
                                    item.price
                                  )
                                }
                              >
                                +
                              </div>
                              {/* <div className='bg-gray-500 border-gray-300 text-gray-900 w-3 flex items-center justify-center cursor-pointer rounded-r-md'
                                                            onClick={() =>
                                                                // increaseQuantity( 
                                                                    
                                                                    setQuantity(
                                                                    item?.product, 

                                                                    quantity+1
                                                                )
                                                                // )
                                                            }>
                                                            +
                                                        </div> */}
                            </div>
                          </div>

                          {/* <button
                          onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                          }
                        >
                          -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.product,
                              item.quantity,
                              item.stock
                            )
                          }
                        >
                          +
                        </button> */}
                          <p className="flex items-center justify-center text-4xl mt-3">
                            <b>₹ {(item?.price).toFixed(2)}</b>
                          </p>
                        </div>
                        <div className="text-gray-600 cursor-pointer">
                          {/* <i className="fas fa-trash"></i> */}
                          <RiDeleteBin6Fill
                            className="w-[20rem]"
                            onClick={() => removeCartitemHandler(item.product)}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-7 mb-7" />
                    {/* second product */}

                    {/* <hr className="mt-7 mb-7" /> */}
                  </>
                ))}
            </div>

            <div className="p-5 flex-[0.4] w-auto h-[40vh] border-2 border-[#eab308] rounded-md shadow-lg flex flex-col items-center">
              <h1 className="text-[2rem]">Summary</h1>
              <div className="flex justify-between mt-3 w-[100%]">
                <p>Subtotal</p>
                <p> {subtotal}</p>
              </div>
              <div className="flex justify-between mt-3 w-[100%]">
                <p>Total Tax</p>
                <p>{TaxPrice}</p>
              </div>
              {/* <div className="flex justify-between mt-3 w-[100%]">
                      <p>Shipping discount</p>
                      {/* </div> 
                      <p>₹ 140</p>
                    </div> */}
              <div className="flex justify-between mt-3 w-[100%] text-3xl font-bold">
                <p>Total</p>
                <p> {TotalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      
    </>
    )}
    </>
  );
};

export default Cart;

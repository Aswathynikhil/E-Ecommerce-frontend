import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getShippingInfo } from "../redux/actions/cartAction";
import Footer from '../components/Footer';
import Loader from "../components/Loader/Loader";


const ConfirmOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { cartItems, loading } = useSelector((state) => state.mycart);
  const { shippingInfo } = useSelector((state) => state.shippingDetails);

  function returnLastElement(shippingInfo) {
    return shippingInfo && shippingInfo.at(-1);
  }

  const value = returnLastElement(shippingInfo);
console.log('shipping info',value);

  const subtotal = Math.round(cartItems && cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0))

  // const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = Math.round(cartItems && cartItems.reduce((acc, item) => acc + item.tax, 0))

  // const totalPrice = subtotal + tax + shippingCharges;
  const totalPrice = subtotal + tax;


  // const address = `${value && value.address},${value && value.city},${value && value.state},${value && value.pincode},${value && value.country}`
  const address = `${value && value.address},${value && value.city},${value && value.pincode}`

console.log(address,'address')

  useEffect(() => {
    dispatch(getShippingInfo());
  }, [dispatch]);

  const proceedToPayment = () => {
    const data = {
      subtotal,
      // shippingCharges,
      tax,
      totalPrice
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate('/user/payment')
  }
  return (
    <>
    {loading ? (
      <Loader/>
    )
  :
  (
    <>
      {/* <NavBar /> */}
      <div className="container items-start pb-16 pt-4 flex justify-center h-auto mb-20 ">
        {/* <form action="" onSubmit={shippingSubmit}> */}
      
        <div className="col-span-8 border border-[#eab308] p-4 rounded w-[500px] mt-10">
           <h3 className="text-lg font-medium capitalize mb-10 text-center font-serif ">Shipping Details</h3>
           <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className='flex gap-1'>
               
                <p>Name: </p>
                <span>{user && user.name}</span>
              </div>

              <div className='flex gap-1'>
                <p>Phone: </p>
                <span>{user && user.phone}</span>
              </div>

            </div>
            <div className='flex gap-1'>

              <p>Address: </p>
              <span>{address}</span>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <img className='h-20 w-20' src={item.image} alt="Product-images" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
          <div className='flex gap-1'>

            <p>Subtotal:</p>
            <span>₹{subtotal}</span>
          </div>

          <div className='flex gap-1'>

            <p>GST:</p>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className='flex gap-1'>

            <p>
              <b>Total:</b>
            </p>
            <span>₹{(totalPrice).toFixed(2)}</span>
          </div>
          <div>

            <button className="w-full block button-primary mt-3 bg-orange-300" onClick={proceedToPayment}>Proceed To Payment</button>

          </div>
          <div>

          </div>
        </div>

      </div>


      <Footer />
      </>
      )}
    </>
  )
}

export default ConfirmOrderPage
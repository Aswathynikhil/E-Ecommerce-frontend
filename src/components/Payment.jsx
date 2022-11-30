import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import { useRef } from "react";
import { craeteOrder, clearErrors } from "../redux/actions/orderAction";
import Footer from '../components/Footer';
import {  toast } from 'react-toastify';
import { loadUser } from '../redux/actions/userAction';
import { getShippingInfo, myCartItems } from '../redux/actions/cartAction';


const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const payBtn = useRef(null);
    

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    console.log('orderinfo', orderInfo)
    const { user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.mycart);
    const { shippingInfo } = useSelector((state) => state.shippingDetails);
    const { error } = useSelector((state) => state.newOrder);
    //const { error } = useSelector((state) => state.newOrder);

    console.log(user&&user,"==========user");
    console.log(cartItems&&cartItems,"==========cartItems");
    console.log(shippingInfo&&shippingInfo,"==========shippingInfo");


    function returnLastElement(shippingInfo) {
        return shippingInfo && shippingInfo.at(-1);
    }

    const value = returnLastElement(shippingInfo);


  


    const order = {
        shippingInfo: value && value,
        orderItems: cartItems && cartItems,
        itemPrice: orderInfo && orderInfo.subtotal,
        taxPrice: orderInfo && orderInfo.tax,
        totalPrice: orderInfo && orderInfo.totalPrice,

    }




    const initPayment = (resData) => {
        const options = {
            key: "rzp_test_QNfRnyTDRNLcvf",
            amount: resData.amount,
            currency: "INR",
            name: "Pooja Store",
            description: "Test Transaction",
            image: "",
            order_id: resData.id,
            handler: async (response) => {
               
                try {
                    
                    const verifyUrl = "https://dword-pooja-store.onrender.com/api/v1/payment/razorpay/verify";

                    const { data } = await axios.post(verifyUrl, response)
                 
                    if(data?.success === true){
                        order.paymentInfo = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            status: "Success",
                        }
                        dispatch(craeteOrder(order))
                        toast.success(data?.message)
                        navigate('/user/order_completed')

                    }
                } catch (error) {
                    toast.warn(`Hi ${user&&user?.name}, your payment was rejected due to some technical difficulties. Try again later`)
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    //Razorpay Payment//
    const handlePayment = async (e) => {
        e.preventDefault();

       
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
          
            const orderUrl = "https://dword-pooja-store.onrender.com/api/v1/payment/razorpay/process";

            const { data } = await axios.post(orderUrl, { amount: order.totalPrice }, config)
         
            if(data?.success === true){
                initPayment(data.data);
            }else{
                toast.warn(`Hey ${user&&user?.name}, We're unable to process your payment at the moment. Please try again later`)
            }
           
        } catch (error) {
            toast.warn(`Sorry ${user&&user?.name}, we can't process your payment right now. Please try again later`)
            

        }
    }




    useEffect(() => {
        if (error) {
            toast.error(error.message);
            dispatch(clearErrors())
        }
        dispatch(getShippingInfo())
        dispatch(myCartItems());
        dispatch(loadUser())
    }, [dispatch, error,])
    return (
        <>
            {/* <NavBar /> */}

            <div className=" p-2 mt-[200px] mb-20 mobile:flex-col mobile:items-start flex justify-center min-h-[200px]">
                <form className='h-[100px]' onSubmit={handlePayment}>


                    <div className="flex flex-row  justify-center">
                        <h3 className='uppercase '>Total Amount</h3>


                    </div>

                    <div className='flex justify-center'>

                        <button className="button-primary mt-2 bg-orange-300  w-[300px] border rounded-md" type='submit'>{`pay - ₹${orderInfo && Math.ceil(orderInfo.totalPrice)}`} </button>
        

                    </div>
                </form>

            </div>

            <Footer />
        </>)
}

export default Payment
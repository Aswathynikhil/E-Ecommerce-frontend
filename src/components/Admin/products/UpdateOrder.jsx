import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../../redux/actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import Sidebar from "../Dashboard/Sidebar";
import { ToastContainer, toast } from "react-toastify";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
console.log(user)
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError.message);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };
  return (
   <>
   <div className="container dashboard parent md:h-screen md:grid md:grid-cols-6 border-r-0">
        <section class="sidebar md:col-span-1 ">
          {" "}
          <Sidebar />

          </section>

          <div>
                <div className="confirmShippingArea">
                  <h1> Shipping Info </h1>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{user && user.phone}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order &&
                          order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <h1>Payment</h1>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>₹{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <h1>Order Status</h1>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItem">
                  <h1>Your Cart Items</h1>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product-images" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display:
                    order && order.orderStatus === "Delivered"
                      ? "none"
                      : "block",
                }}
              >
                <form
                  action=""
                  className="updateOrderForm"
                  encType="multipart/form-data"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    {/* <AccountTreeIcon /> */}
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>
        {/* </div> */}
   </>
  );
}

export default UpdateOrder;

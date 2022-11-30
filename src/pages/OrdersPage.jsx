


import React,{ useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux";
import {myOrders,clearErrors} from "../redux/actions/orderAction"
import { Link } from 'react-router-dom';
// import NavBar from '../components/Navbarnew';
import Footer from '../components/Footer';
import Loader from '../components/Loader/Loader';
// import { DataGrid} from '@mui/x-data-grid';
// import { Typography } from '@mui/material';



const MyOrders = () => {
    const dispatch = useDispatch();
    // const alert  = useAlert();
    const {loading, error, orders} = useSelector((state)=> state.myOrders);

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if(error) {
        //   alert.error(error.message);
          dispatch(clearErrors());
        }
        dispatch(myOrders())
      }, [dispatch,alert,error])

    const columns = [
        {field : "id", headerName : "Order ID", minWidth: 300, flex: 1},
        {field : "status", headerName : "Status" ,minWidth: 150,flex:0.5,cellClassName:
        (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
        }
    },
        {field : "itemQty", headerName : "Item Qty" , type : "number",minWidth: 150,flex:0.3},
        {field : "amount", headerName : "Amount" , type : "number",minWidth: 270,flex:0.5},
        {field : "actions", headerName : "Actions" ,type : "number",minWidth: 270,flex:0.3,sortable:false,
        renderCell : (params)=> {
            return (
                <Link to={`/order/${params.getValue(params.id,"id")}`}>
                    {/* <LaunchIcon/> */}
                    <h1>Launch icon</h1>
                </Link>
            )
        }
    },

    ];
    const rows = []

        orders && orders.forEach((item,index) => {
            console.log('order item',item)
            rows.push({
                itemQty : item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount : item.totalPrice,
                // image : item.orderItems[0].image
            })
        })
  return (
<>
{loading ? (
  <Loader/>
):
(
<>
        <div class="overflow-x-auto relative sm:rounded-lg border-l-0 min-h-[300px]">
          <h1 className="flex justify-center font-bold mt-20 text-[40px]">
           Order Details
          </h1>
          <table class="w-full mt-20 text-sm text-left text-gray-500 dark:text-gray-400 border-l-0">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Order ID
                </th>
                <th scope="col" class="py-3 px-6">
                Status
                </th>
                <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Item Qty
                </th>
                <th scope="col" class="py-3 px-6">
                Amount
                </th>
                {/* <th scope="col" class="py-3 px-6">
                Image
                </th> */}
              </tr>
            </thead>
            <tbody>
              {rows &&
                rows.map((product) => (
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      {product?.id}{" "}
                    </td>
                    {/* {product.discount ?
                     (
                    <td class="py-4 px-6">₹{product?.discountAmount} </td>

                     )
                    :
                    (
                    <td class="py-4 px-6">₹{product?.mrp} </td>

                    )} */}
                    <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {product?.status}{" "}
                    </td>
                    <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {product?.itemQty}{" "}
                    </td>
                    <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {product?.amount}{" "}
                    </td>
                    {/* <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {product?.image}{" "}
                    </td> */}
                    {/* <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {product?.status}{" "}
                    </td> */}
                    {/* <td class="py-4 px-6">
                      <img src={product?.images[0]?.url} alt="" className=" mt-4 w-10 h-10 object-cover rounded"/>{" "}
                    </td> */}
                    {/* <td> */}
                      {/* <button
                        className="m-5"
                        onClick={() =>
                          actionHandler(product?._id, product?.name)
                        }
                      >
                        Delete
                      </button> */}
                      {/* <button>Update</button> */}
                    {/* </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className='pb-16 mb-16'></div>
<div className=' pt-16 mb-9'></div>
<Footer/>
</>
)}
</>
  )
}

export default MyOrders

import React, { useEffect } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
    getAdminProducts,
    deleteProduct,
    clearErrors,
} from "../../../redux/actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';


function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
              toast.error(error.message);
            dispatch(clearErrors());
        }
        if (deleteError) {
              toast.error(deleteError.message);
            dispatch(clearErrors());
        }

        if (isDeleted) {
              toast.success("Product Deleted Successfully");
            navigate(`/admin/products_list`);
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const actionHandler = (id, name) => {
        swal("What do you want to do?", {
            buttons: {
                Edit: true,
                Delete: true,
                cancel: true,
            },
        }).then((value) => {
            switch (value) {
                case "Delete":
                    swal({
                        title: "Are you sure?",
                        text: `Once deleted, you will not be able to recover this ${name} product !`,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            dispatch(deleteProduct(id));
                        } else {
                        }
                    });

                    break;

                case "Edit":
                    navigate(`/admin/product/${id}`);
                    break;

                default:
            }
        });
    };
    return (
        <>
            <div className="container dashboard parent md:h-screen md:grid md:grid-cols-6 border-r-0">
                <section class="sidebar md:col-span-1 ">
                    {" "}
                    <Sidebar />
                </section>

                <div class="overflow-x-auto relative sm:rounded-lg border-l-0 ">
                    <h1 className="flex justify-center font-bold mt-20 text-[40px]">
                        All Products
                    </h1>
                    <table class="w-full mt-20 text-sm text-left text-gray-500 dark:text-gray-400 border-l-0">
                        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                                    Product name
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Price
                                </th>
                                <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                                    Category
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Image
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((product) => (
                                    <tr class="border-b border-gray-200 dark:border-gray-700">
                                        <td
                                            scope="row"
                                            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                                        >
                                            {product?.name}{" "}
                                        </td>
                                        <td class="py-4 px-6">₹{product?.mrp} </td>
                                        <td class="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                                            {product?.category}{" "}
                                        </td>
                                        <td class="py-4 px-6">
                                            <img className="w-6 h-6" src={product?.images[0]?.url} alt="" />{" "}
                                        </td>
                                        <td>
                                            <button
                                                className="m-5"
                                                onClick={() =>
                                                    actionHandler(product?._id, product?.name)
                                                }
                                            >
                                              Actions
                                            </button>
                                            {/* <button>Update</button> */}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className="  "></div>
            </div>
        </>
    );
}

export default ProductList;




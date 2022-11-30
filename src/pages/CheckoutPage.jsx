import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
// import NavBar from "../components/Navbarnew";
import { useSelector, useDispatch } from "react-redux";
// import CheckoutStep from "../../Product/Cart/CheckoutStep.js"
import {
  clearErrors,
  getShippingInfo,
  savaShippingInfo,
} from "../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

// const initialValues = {
//   address: "",
//   pincode: "",
//   city: "",
  // state: '',
  // country: '',
// };

// const onSubmit = values => {
//   console.log('form data',values)
// }
// const validate = (values) => {
//   let errors = {};
//   if (!values.address) {
//     errors.address = "Required";
//   }
//   if (!values.pincode) {
//     errors.pincode = "Required";
//   }
//   if (!values.city) {
//     errors.city = "Required";
//   }
  // if(!values.state){
  //   errors.state = 'Required'
  // }
  // if(!values.country){
  //   errors.country = 'Required'
  // }

//   return errors;
// };
const Checkout = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  // const formik = useFormik({
  //   initialValues,
  //   // {
  //   //   address: '',
  //   //   pincode: '',
  //   //   city: '',
  //   //   state: '',
  //   //   country: '',
  //   // },
  //   onSubmit: (values) => {
  //     console.log("Form data", values);
  //     dispatch(savaShippingInfo( values ));

  //     naviagte("/user/confirm_order");
  //   },
  //   validate,
  //   // values => {
  //   //   let errors = {}
  //   //   if(!errors.address){
  //   //     errors.name = 'Required'
  //   //   }
  //   //   if(!errors.pincode){
  //   //     errors.name = 'Required'
  //   //   }
  //   //   if(!errors.city){
  //   //     errors.name = 'Required'
  //   //   }
  //   //   if(!errors.state){
  //   //     errors.name = 'Required'
  //   //   }
  //   //   if(!errors.country){
  //   //     errors.name = 'Required'
  //   //   }

  //   //   return errors
  //   // }
  // });
  // console.log('visited fields',formik.touched)
  // const dispatch = useDispatch();
  // const naviagte = useNavigate()

  // const { shippingInfo,error } = useSelector((state) => state.shippingDetails);
  const { shippingInfo, error } = useSelector((state) => state.shippingDetails);

  function returnLastElement(shippingInfo) {
    return shippingInfo && shippingInfo.at(-1);
  }

  const value = returnLastElement(shippingInfo);

  //   const [name,setName] = useState(value && value.name)
  //   const [addresstype,setAddressType] = useState(value && value.addresstype)
  // const [address, setAddress] = useState(value &&  value.address)
  // const [phonenumber,setPhonenumber] = useState(value && value.phonenumber)
  // const [email,setEmail] = useState(value && value.email)
  // const [pincode,setPincode] = useState(value && value.pincode)
  // const [area,setArea] = useState(value && value.area)
  // const [city, setCity] = useState(value && value.city)
  // const [stateregion, setStateRegion] = useState(value && value.stateregion)
  // const [country, setCountry] = useState(value && value.country)

  const [address, setAddress] = useState(value && value.address);
  const [city, setCity] = useState(value && value.city);
  const [state, setState] = useState(value && value.state);
  const [country, setCountry] = useState(value && value.country);
  const [pincode, setPincode] = useState(value && value.pincode);

  const shippingSubmit = (e) => {
    e.preventDefault();
    // dispatch(savaShippingInfo({name,addresstype,address,phonenumber,email,pincode,area,city,stateregion,country}))
    // dispatch(savaShippingInfo({ address, city, state, country, pincode }))
    dispatch(savaShippingInfo({ address, city, pincode }));

    naviagte("/user/confirm_order");
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
    dispatch(getShippingInfo());
  }, [dispatch, error]);

  return (
    <>
      {/* <NavBar /> */}
      <div className="  w-full">
        <div className="md:m-20 border border-orange-900">
          <form action="" onSubmit={shippingSubmit} className="w-full">
          {/* <form onSubmit={formik.handleSubmit}> */}
            <div className="col-span-8   p-16 rounded ml-30 w-full ">
              <h3 className="text-3xl font-medium capitalize mb-4 text-center font-serif ">
                Shipping Details
              </h3>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="text-gray-600 mb-2 block" htmlFor="address">
                    House/Office Name
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600  text-sm rounded placeholder-gray-400 focus-border-primary focus:ring-0"
                    value={address}
                    id="address"
                    name="address"
                    required
                    // onChange={formik.handleChange}
                    // value={formik.values.address}
                    // onBlur={formik.handleBlur}
                     onChange={(e) => setAddress(e.target.value)}
                  />
                  {/* {formik.touched.address && formik.errors.address ? (
                    <div className="error">{formik.errors.address}</div>
                  ) : null} */}
                </div>

                <div className="form-control">
                  <label className="text-gray-600 mb-2 block">
                    Pincode
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600  text-sm rounded placeholder-gray-400 focus-border-primary focus:ring-0"
                    value={pincode}
                    name="pincode"
                    onChange={(e) => setPincode(e.target.value)}
                    // onChange={formik.handleChange}
                    // value={formik.values.pincode}
                    // onBlur={formik.handleBlur}
                    required

                  />
                  {/* {formik.touched.pincode && formik.errors.pincode ? (
                    <div className="error">{formik.errors.pincode}</div>
                  ) : null} */}
                </div>

                <div className="form-control">
                  <label className="text-gray-600 mb-2 block">
                    City
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600  text-sm rounded placeholder-gray-400 focus-border-primary focus:ring-0"
                    value={city}
                    name="city"
                     onChange={(e) => setCity(e.target.value)}
                    // onChange={formik.handleChange}
                    // value={formik.values.city}
                    // onBlur={formik.handleBlur}
                    required

                  />
                  {/* {formik.touched.city && formik.errors.city ? (
                    <div className="error">{formik.errors.city}</div>
                  ) : null} */}
                </div>
                {/* <div className="form-control">
                <label className="text-gray-600 mb-2 block">
                  State_Region
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600  text-sm rounded placeholder-gray-400 focus-border-primary focus:ring-0"
                  // value={state}
                  name='state'
                  //  onChange={(e) => setState(e.target.value)}
                  onChange={formik.handleChange} value={formik.values.state}
                  onBlur={formik.handleBlur}


                />
                {formik.touched.state && formik.errors.state ?( <div className="error">{formik.errors.state}</div>):null}

              </div>
              <div className="form-control">
                <label className="text-gray-600 mb-2 block">
                  Country
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600  text-sm rounded placeholder-gray-400 focus-border-primary focus:ring-0"
                  // value={country}
                  name='country' 
                  // onChange={(e) => setCountry(e.target.value)}
                  onChange={formik.handleChange} value={formik.values.country}
                  onBlur={formik.handleBlur}


                />
                {formik.touched.country && formik.errors.country ? (<div className="error">{formik.errors.country}</div>):null}

              </div> */}
              </div>
            </div>

            {/* <div className="col-span-4 w-[43rem] flex align-middle"> */}

            <button
              className="w-70 h-full bg-orange-300  button-primary flex items-end  mt-3 mb-2 mx-auto"
              type="submit"
            >
              Place Order
            </button>

            {/* </div> */}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

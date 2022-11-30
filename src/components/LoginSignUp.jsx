import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSignUp.css";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockOpenAlt } from "react-icons/bi";
import { CiFaceSmile } from "react-icons/ci";
import { BsPhone } from "react-icons/bs";
import profile from "../image/Profile.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, login, register } from "../redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader/Loader";
import {useFormik} from 'formik';




// const initialValues = {
//   name: "",
//   email: "",
//   phone: "",
//   password: "",
// }

// const validate = values => {
//   let errors = {}
//   if(!values.name){
//     errors.name = 'please enter your name'
//   }
//   if(!values.email){
//     errors.email = 'Please enter proper email'
//   }
//   if(!values.phone){
//     errors.phone = 'Please enter valid number'
//   }
//   if(!values.password){
//     errors.password = 'Required maximum 8 digits'
//   }
//   return errors

// }

function LoginSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    error,
    loading,
    isAuthenticated,
    user: isLogin,
  } = useSelector((state) => state.user);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
  });

  const { name, email, phone, password } = user;
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/doya08pdl/image/upload/v1661379244/avatars/eulivilfagoufudqjc9q.png"
  );
  const [avatarPreview, setAvatarPreview] = useState(profile);


  // formik

  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: values =>{
  //     const userData = {
  //       name: values.name,
  //       email: values.email,
  //       phone:values.phone,
  //       password:values.password,
  //       avatar:values.avatar
  //     }
  //     console.log('userdata',userData)
  // //     const myForm = new FormData();
  // //     myForm.set("name", name);
  // //     myForm.set("email", email);
  // //     myForm.set("phone", phone);
  // //     myForm.set("password", password);
  // //     myForm.set("avatar", avatar);
  // // console.log('111',myForm)
  //     dispatch(register(userData));
  //     navigate("/verify/phone");

  //   },
  //   validate,
  // })



  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
    navigate("/verify/phone");
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (isLogin && isLogin.role === "admin") {
      toast.success("Successfully logged");
      navigate("/admin/dashboard");
    } else if (isLogin && isLogin.role === "user") {
      navigate("/product");
    }
  }, [dispatch, error, navigate, isAuthenticated, isLogin]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
    {loading ?(
      <Loader/>
    ):(
      <div className="container LoginSignUpContainer bg-orange-50">
        <div className="LoginSignUpBox xs:mt-[50px] md:mt-0 lg:mt-0  ">
          <div className="bg-yellow-900 text-white">
            <div className="Login_signUp_toggle flex flex-row justify-center   ">
              <p className="mt-5" onClick={(e) => switchTabs(e, "login")}>
                LOGIN
              </p>
              <p
                className="ml-12 mt-5 "
                onClick={(e) => switchTabs(e, "register")}
              >
                REGISTER
              </p>
            </div>
            <button className="" ref={switcherTab}></button>
          </div>
          <form
            action=""
            className="loginForm mt-10  "
            ref={loginTab}
            onSubmit={loginSubmit}
          >
            <div className="loginEmail">
              <HiOutlineMail />
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="loginPassword">
              <BiLockOpenAlt />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center text-md text-gray-500">
              <Link className="" to="/password/forgot">
                Forget Password ?
              </Link>
            </div>

            <input type="submit" value="Login" className="loginBtn " />
          </form>
          <form
            action=""
            className="signUpForm mt-3"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
        {/* <form onSubmit={formik.handleSubmit}  action=""
            className="signUpForm mt-3"
            ref={registerTab}
            encType="multipart/form-data"> */}

            <div className="singUpName mt-3 ">
              <CiFaceSmile />
              <input
                type="text"
                placeholder="Name"
                name="name"
                // id="name"
                value={name}
                onChange={registerDataChange}
                // onChange={formik.handleChange} value={formik.values.name}
                // onBlur={formik.handleBlur}
                required
              />
                {/* {formik.touched.name && formik.errors.name ? ( <div className="error">{formik.errors.name}</div>) : null} */}

            </div>
            <div className="signUpEmail m-2">
              <HiOutlineMail />
              <input
                type="email"
                placeholder="Email"
                name="email"
                // id="email"
                value={email}
                onChange={registerDataChange}
                required
                // onChange={formik.handleChange} value={formik.values.email}
                // onBlur={formik.handleBlur}
              />
                {/* {formik.touched.email && formik.errors.email ? ( <div className="error">{formik.errors.email}</div>) : null}          */}
                   </div>
                {/* </div> */}
            <div className="signUpPhone m-2">
              <BsPhone />
              <input
                type="number"
                placeholder="Mobile Number"
                name="phone"
                // id="phone"
                value={phone}
                onChange={registerDataChange}
                required
                // onChange={formik.handleChange} value={formik.values.phone}
                // onBlur={formik.handleBlur}
              />
                {/* {formik.touched.phone && formik.errors.phone ? ( <div className="error">{formik.errors.phone}</div>) : null}         */}
                    </div>
                {/* </div> */}
            <div className="signUpPassword m-2 ">
              <BiLockOpenAlt />
              <input
                type="password"
                placeholder="Password"
                name="password"
                // id="password"
                value={password}
                onChange={registerDataChange}
                required
                // onChange={formik.handleChange} value={formik.values.password}
                // onBlur={formik.handleBlur}
              />
                {/* {formik.touched.password && formik.errors.password ? ( <div className="error">{formik.errors.password}</div>) : null}         */}
                    </div>            
                {/* </div> */}
            <div id="registerImage" className="m-2 ">
              <img src={avatarPreview} alt="" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
                
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn " />
          </form>
        </div>
      </div>
      )}
    </>
  );
}
export default LoginSignup;

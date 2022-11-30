import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import React, { useState } from 'react'
import Button from '../Button';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from '../../image/logo.png'
import { AiOutlineSearch, AiFillBackward } from "react-icons/ai";
import { logout } from "../../redux/actions/userAction";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const AdminNavbar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated, user } = useSelector(
        (state) => state.user
    );

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        // if(isAuthenticated){
            if (keyword.trim()) {
                navigate(`/product/${keyword}`);
              } else {
                navigate(`/product`);
              }
        // }else{
        //     navigate("/user/login")}
       
      };
    let Links = [
        // { name: "Cart", link: "/" },
        { name: "Dashboard", link: "/admin/dashboard", icon: <AiFillBackward size={30} color={'orange'} /> },
        // { name: "Profile", link: "/account" },
        // { name: "Logout", link: "/logout" },

    ];
    const userNavigation = [
        { name: "Your Profile", href: `/admin/account` },
        // { name: "Orders", href: "/orders" },


    ];
    let [open, setOpen] = useState(false);

    function logoutAdmin() {
        dispatch(logout());
        navigate("/")
        toast.success("Logout Successfully");
    }
    return (

        <nav className='shadow-md w-full  sticky top-0 left-0 z-50 max-sm md:max-md md:mr-0 '>
            <div className='md:flex items-center justify-between bg-orange-100 py-4 md:px-10 px-7 '>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
                text-gray-800'>

                    <a href="/">
                        <img className="h-[60px] w-[60px] ml-15px" src={logo} alt={logo} />

                    </a>
                </div>
                <div className=" flex justify-center max-w-md items-center  lg:w-full">
                <form action="" onSubmit={searchSubmitHandler}>
                    <div className=" flex border-[2px] border-solid border-orange-200 rounded-md items-center h-[40px] w-full  ml-2   lg:w-full">
                        < AiOutlineSearch className=" text-orange-300 text-xl  ml-2 " />
                        <input type='text' className="border-none bg-orange-100 outline-none ml-3  lg:w-full " placeholder="Search" 
                onChange={(e) => setKeyword(e.target.value)}
                />
                         {/* <Search/> */}
                    </div>
                    </form>
                </div>

                <div>
                    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                    </div>

                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-orange-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top:8rem ' : 'top-[-490px]'}`}>
                        {
                            Links.map((link) => (
                                <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7 font-semibold'>
                                    <div className='  text-center rounded-lg pt-2  '>
                                        <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500 h-5 w-5'>{link.icon}</a>
                                    </div>
                                </li>
                            ))
                        }
                        {/* <div className='bg-orange-300 w-[100px] h-10 text-center rounded-lg pt-1 ml-2 '> */}
                            <button
                                onClick={() => logoutAdmin()}
                                type="button"

                            >
                            <BiLogOut size={25} color={'orange'} 
                                className="ml-4 mr-2 mt-2"
                                aria-hidden="true"
                            />
                                {/* <span className='md:ml-5 text-xl md:my-0 my-7 font-semibold'>Logout</span> */}
                            </button>
                        {/* </div> */}

                        <Disclosure>
                            <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative z-10">
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className="bg-orange-400 ml-4 mt-6 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    {/* <span className="sr-only">Open user menu</span> */}
                                                    <img
                                                        className="h-8 w-8 rounded-full "
                                                        src={user?.avatar?.url}
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                                <div>
                                                    <span className=" text-orange-400 font-bold ml-2">{user?.name}</span>
                                                </div>
                                            </div>


                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg shadow-gray-400 py-1 bg-orange-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    {userNavigation.map(item => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? "bg-orange-200" : "",
                                                                        "block px-4 py-2 text-sm text-orange-700"
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>

                                        </>

                                    )}
                                </Menu>
                            </div>
                        </Disclosure>


                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar
import React, { useState } from 'react'
import Button from '../Button';
import logo from '../../image/logo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai"



const Navbarnew = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    let Links = [
        // { name: "Cart", link: "/" },
        { name: "", link: "/", icon: <AiOutlineHome size={25} color={ 'orange'} /> },
        { name: "SignIn", link: "/user/login", icon: <FaSignInAlt size={25} color={'orange'} /> },

    ];
    let [open, setOpen] = useState(false);

    
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/product/${keyword}`);
    } else {
      navigate(`/product`);
    }
  };




    return (

        <nav className='shadow-md w-full  sticky top-0 left-0 z-50 max-sm md:max-md md:mr-0 '>
            <div className='md:flex items-center justify-between bg-orange-100 py-4 md:px-10 px-7 '>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
                text-gray-800'>

                    <a href="/">
                        <img className="h-[60px] w-[60px] ml-15px" src={logo} alt={logo} />

                    </a>
                </div>
                <form className="" onSubmit={searchSubmitHandler}>
                <div className=" flex justify-center max-w-md items-center  lg:w-full">
                
                        <div className=" flex border-[2px] border-solid border-orange-200 rounded-md items-center h-[40px] w-full  ml-2   lg:w-full">
                            < AiOutlineSearch className=" text-orange-300 text-xl  ml-2 " />
                        <input type='text' className="border-none bg-orange-100 outline-none ml-3  lg:w-full " placeholder="Search"  onChange={(e) => setKeyword(e.target.value)} />
                  
                    </div>
                    
                </div>
                </form>

                <div>
                    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
                    </div>

                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-orange-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top:8rem ' : 'top-[-490px]'}`}>
                        {
                            Links.map((link) => (
                                <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7 font-semibold'>
                                    
                                    <div className='  h-10 text-center rounded-lg pt-1 flex flex-row '>
                                        {/* <FaSignInAlt size={25}/> */}
                                        <a href={link.link} className='  text-orange-300 hover:text-orange-600 duration-500 '>{link.icon} {link.name}</a>
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbarnew
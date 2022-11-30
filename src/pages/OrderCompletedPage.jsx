import React from 'react'
// import Footer from '../component/Footer'
// import NavBar from '../component/Navbar'
import { TiTick } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
// import NavBar from '../components/Navbarnew'
const OrdercompletedPage = () => {
    return (
        <>
     
            <div className=" p-2 pt-16 mb-16  mobile:flex-col mobile:items-start grid grid-cols-1 min-h-[320px] ">
                <div className="flex-1 flex justify-center flex-wrap p-2">
                    <TiTick className='  w-10 h-10 rounded-full bg-yellow-500/90 fill-white' />
                </div>
                <div className="flex flex-row  justify-center">
                    <h3 className='uppercase '>your order is completed!</h3>

                </div>

                <div><hr className="flex justify-items-center absolute mb-5 h-px w-10px  bg-white" /></div>

                <div className='flex justify-center'>
                    <Link to='/user/orders'>
                        <button className='button-primary mt-2 uppercase'>View Order</button>

                    </Link>

                </div>

            </div>


            <Footer />
        </>
    )
}

export default OrdercompletedPage
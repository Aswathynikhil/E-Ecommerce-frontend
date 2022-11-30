import React from 'react'
import Slider from '../components/Slider'
import Galleryimgs from '../components/Galleryimgs'

import Categorycard from '../components/Categorycard'
import Footer from '../components/Footer'

 
function Home() {
  return (
    <>
      <div className='container'>
      <Slider />
      <Categorycard/>
      <Slider />
      <Galleryimgs />
      <Footer/>
      </div>
    </>
  )
}

export default Home
import React, { Fragment } from 'react'
import WishList from '../../components/User/WishList'
import Footer from '../../components/Footer';

function WishlistPage() {
  return (
      <div>
          <Fragment>
        <WishList />
        <Footer/>
          </Fragment>    

    </div>
  )
}

export default WishlistPage
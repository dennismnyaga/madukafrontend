import React from 'react'
import Header from './Header'
import Banner from './Banner'
import LeftLinks from './LeftLinks'
import { useMediaQuery } from "react-responsive";
import Footer from './Footer'
import RightProductFiltered from './RightProductFiltered'


const ProductSearched = () => {
    const isDesktopOrLaptop = useMediaQuery({query: "(min-width: 1224px)",});
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });


  return (
    <div className='home-page'>
      <Header />
      <Banner />
      {isDesktopOrLaptop && 
        <div className='products-body'>
          <LeftLinks />
          <RightProductFiltered />
        </div>
      }
      {isTabletOrMobile && 
        <div className='products-body-mobile'>
        <LeftLinks />
        <RightProductFiltered />
        </div>
      }
      <Footer />
    </div>
  )
}

export default ProductSearched
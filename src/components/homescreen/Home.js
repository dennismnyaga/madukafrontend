import React from 'react'
import Banner from './Banner'
import Header from './Header'
import LeftLinks from './LeftLinks'
import RightProducts from './RightProducts'
import './Home.css'
import Footer from './Footer'
import { useMediaQuery } from 'react-responsive'

const Home = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  
  return (
    <div className='home-page'>
      <Header />
      <Banner />
      {isDesktopOrLaptop && 
        <div className='products-body'>
          <LeftLinks />
          <RightProducts />
        </div>
      }
      {isTabletOrMobile && 
        <div className='products-body-mobile'>
        <LeftLinks />
        <RightProducts />
        </div>
      }
      <Footer />
    </div>
  )
}

export default Home

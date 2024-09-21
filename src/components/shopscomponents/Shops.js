import React from "react";
import Banner from "../homescreen/Banner";
import Header from "../homescreen/Header";
import LeftLinks from "../homescreen/LeftLinks";
import RightShops from "./RightShops";
import { useMediaQuery } from "react-responsive";
import Footer from "../homescreen/Footer";

const Shops = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <div className="home-page">
      <Header />
      <Banner />
      {isDesktopOrLaptop && (
        <div className="products-body">
          <LeftLinks />
          <RightShops />
        </div>
      )}
      {isTabletOrMobile && (
        <div className="products-body-mobile">
          <LeftLinks />
          <RightShops />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Shops;

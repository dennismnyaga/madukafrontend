import React, { useState } from "react";
import "./Banner.css";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearches,
  getSearchesError,
  selectAllsearches,
} from "../searchFunctionality/SearcherSlice";

// ====================================
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { FormattedNumber } from "react-intl";
import ProductLocation from "../../features/products/ProductLocation";
import ProductShop from "../../features/products/ProductShop";
import { Alert } from "@mui/material";




const Banner = () => {
  const [adTitle, setAdTitle] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const searchResults = useSelector(selectAllsearches);
  const searchErrors = useSelector(getSearchesError)

  console.log("Search error ", searchErrors)

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Am called!");
    dispatch(fetchSearches({ ad_title: adTitle, location__name: location }));
  };

  const handleTitleChange = (event) => {
    setAdTitle(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });




  
  return (
    <div>
      {isDesktopOrLaptop && (
        <>
        <div className="banner">
          <div className="search-button">
            <input
              type="text"
              placeholder="Search for product"
              value={adTitle}
              onChange={handleTitleChange}
            />
            <div className="divider"></div>
            <input
              type="text"
              placeholder="Product Location"
              value={location}
              onChange={handleLocationChange}
            />
            <SearchIcon className="search" onClick={handleSearchSubmit} />
          </div>
        </div>
        <div className="searche">
        {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div key={product.id} className="searched-product">
                <Link to={`/product/${product.id}`} className="searhed-link">
                  <div className="searched-result">
                  <div className="searched-product-image">
                  <img src={product.images[0].image} alt="product" />
                  </div>
                  <div className="product-info">
                    <div className="searched-name">
                    <div className="product-title">{product.ad_title}</div>
                    <div className="product-price">
                      <FormattedNumber
                        value={product.price}
                        style="currency"
                        currency="KSH"
                      />
                    </div>
                    </div>
                    
                    <div className="searched-location">
                    <LocationOnIcon className="location-icon" />
                    <span className="searched-location-name"><ProductLocation locationId={product.location} /></span>
                    
                    </div>
                    <div className="posted-by-who">
                      <p>Sold By:</p>
                      <span className='posted-by-who-shop'><ProductShop shopId={product.shop}  /></span>
                      
                    </div>
                  </div>
                  </div>
                </Link>

              </div>
            ))
        ):(
          searchErrors && (<Alert severity="warning">{searchErrors} !</Alert>)
        )} </div>
       
        </>
        
      )}
      {isTabletOrMobile && (
        <>
        <div className="banner banner-mobile">
          <div className="search-button  search-button-mobile">
            <input type="text"
              placeholder="Search for product"
              value={adTitle}
              onChange={handleTitleChange}/>
            <SearchIcon className="search" onClick={handleSearchSubmit} />
          </div>
        </div>
        <div className="searche-mobile">
        {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div key={product.id} className="searched-product-mobile">
                <Link to={`/product/${product.id}`} className="searhed-link">
                  <div className="searched-result-mobile">
                  <div className="searched-product-image-mobile">
                  <img src={product.images[0].image} alt="product" />
                  </div>
                  <div className="product-info-mobile">
                    <div className="searched-name">
                    <div className="product-title">{product.ad_title}</div>
                    <div className="product-price">
                      <FormattedNumber
                        value={product.price}
                        style="currency"
                        currency="KSH"
                      />
                    </div>
                    </div>
                    
                    <div className="searched-location">
                    <LocationOnIcon className="location-icon" />
                    <span className="searched-location-name"><ProductLocation locationId={product.location} /></span>
                    
                    </div>
                    <div className="posted-by-who">
                      <p>Sold By:</p>
                      <span className='posted-by-who-shop'><ProductShop shopId={product.shop}  /></span>
                      
                    </div>
                  </div>
                  </div>
                </Link>

              </div>
            ))
        ) : (
          searchErrors && (<Alert severity="warning">{searchErrors} !</Alert>)
        )} </div>
        </>
      )}
    </div>
  );
};

export default Banner;

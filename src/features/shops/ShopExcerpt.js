import React from "react";
import ShopLocation from "./ShopLocation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./ShopExcerpt.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const ShopExcerpt = ({ shop, shopId }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="product">
          <div className="product-image">
            <FavoriteBorderIcon className="love" />
            <Link to={`/singleshop/${shopId}`}>
              <img src={shop.shopimages[0].image} alt="product 3" />
            </Link>
          </div>
          <div className="product-details">
            <div className="price-name">
              <h5>{shop.name}</h5>
              <div className="shop-location">
                <LocationOnIcon className="location-icon" />
                <h6>
                  <ShopLocation locationId={shop.location} />
                </h6>
              </div>
            </div>
            <div className="visit-shop">
              
                <button><Link to={`/singleshop/${shopId}`} className="vit">VISIT SHOP</Link></button>
              

            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="product-mobile">
          <div className="product-image-mobile shop-img">
            <FavoriteBorderIcon className="love-mobile" />
            <Link to={`/singleshop/${shop.id}`}>
              <img src={shop.shopimages[0].image} alt="product 3" />
            </Link>
          </div>
          <div className="product-details-mobile-shop">
            <div className="price-name-mobile">
              <h5>{shop.name}</h5>
              <div className="location-contact-mobile">
                <LocationOnIcon className="location-icon-mobile" />
                <h6>
                  <ShopLocation locationId={shop.location} />
                </h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopExcerpt;

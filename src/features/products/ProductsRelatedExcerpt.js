import React from "react";
import "./ProductsExcerpt.css";
import ProductLocation from "./ProductLocation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";
import { FormattedNumber } from "react-intl";
import { useMediaQuery } from "react-responsive";

const selectPhoneNumber = (state, userId) => {
  const users = selectAllUsers(state);
  const owner = users.find((user) => user.id === userId);
  return owner ? owner.phone_number : "unknown";
};



const ProductsRelatedExcerpt = ({ p }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  
  const phoneNumber = useSelector((state) =>
    selectPhoneNumber(state, p.owner)
  );

  return (
    <div className=" p-4">
      {isDesktopOrLaptop && (
        <div className="product">
          <div className="product-image">
            <FavoriteBorderIcon className="love" />
            <Link to={`/product/${p.id}`}>
              <img src={p.images[0].image} alt="product" />
            </Link>
          </div>
          <div className="product-details">
            <div className="price-name">
              <h5>{p.ad_title}</h5>
              <h6 className=" !ms-2 underline tracking-tighter">
              <FormattedNumber
                    value={p.price}
                    style="currency"
                    currency="Ksh"
                  />
              </h6>
            </div>
            <div className="location-contact mt-0.5">
              <LocationOnIcon className="location-icon" />
              <h6>
                <ProductLocation locationId={p.location} />
              </h6>
            </div>
            <div className=" call-contact ">
              <button className="contact-seller">
                <a href={`tel:${phoneNumber}`}>CONTACT SELLER</a>
              </button>
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="product-mobile">
          <div className="product-image-mobile">
            <FavoriteBorderIcon className="love-mobile" />
            <Link to={`/product/${p.id}`}>
              <img src={p.images[0].image} alt="product" />
            </Link>
          </div>
          <div className="product-details-mobile">
            <div className="price-name-mobile">
              <h3>{p.ad_title}</h3>
              <div className="location-contact-mobile">
                <LocationOnIcon className="location-icon-mobile" />
                <h6>
                  <ProductLocation locationId={p.location} />
                </h6>
              </div>
              <h5>
                
                <FormattedNumber
                    value={p.price}
                    style="currency"
                    currency="Ksh"
                  />
              </h5>
            </div>
            {/*  */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsRelatedExcerpt;



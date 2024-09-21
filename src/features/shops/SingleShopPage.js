import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

import ShopOwner from "./ShopOwner";
import { useMediaQuery } from "react-responsive";
import ShopLocation from "./ShopLocation";
import { useSelector } from "react-redux";
import { getShopsError, getShopsStatus, selectAllShops } from "./shopsSlice";
import { getProductsError, getProductsStatus, selectAllProducts } from "../products/productsSlice";
import RightLoader from "../../components/homescreen/RightLoader";
import ProductsRelatedExcerpt from "../products/ProductsRelatedExcerpt";

const SingleShopPage = ({ shop }) => {
  const shops = useSelector(selectAllShops)
  const shopstatus = useSelector(getShopsStatus);
  const error = useSelector(getShopsError)

  const products = useSelector(selectAllProducts)
  const productstatus = useSelector(getProductsStatus)
  const producterror = useSelector(getProductsError)


  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
console.log("this is the data name:", shop.name)
  const [settings] = useState({
    dots: true,
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
  });

  const date =
    shop && shop.date_posted ? new Date(shop.date_posted) : new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  if (!shop) {
    return (
      <section>
        <h2>Product not found!</h2>
      </section>
    );
  }

  let content;
  
  if (shopstatus === "loading") {
    content = <div className="load">
      <RightLoader />
    </div>
    
  } else if (shopstatus === "succeeded") {
    const shopProducts = products.filter((p) => p.shop === shop.id);
    if (shopProducts.length === 0) {
      content = <p>Shop has no Products</p>;
    }
    else {
      content = shopProducts.map((p) => (
        <ProductsRelatedExcerpt key={p.id} productId={p.id} p={p} userId={p.owner} />
      ));
    }
  } else if (productstatus === "failed") {
    content = <p>Failed {error}</p>;
  }

  var setter = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  var setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="single-product">
          <div className="single-upper">
            <div className="single-left">
              <div className="single-image">
                <Slider {...settings}>
                  {shop.shopimages.map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt={`shop ${index + 1}`}
                    />
                  ))}
                </Slider>
              </div>
              <div className="ad-info">
                <div className="views">
                  <p>Ad Views</p>
                  <p>{shop.views}</p>
                </div>
                <div className="views">
                  <p>Ad Likes</p>
                  <p>{shop.likes}</p>
                </div>
                <div className="views">
                  <p>Shop Registered:</p>
                  <p>{shop && shop.registered_on ? formattedDate : "N/A"}</p>
                </div>
              </div>
              <div className="product-des">
                <p>{shop.description}</p>
              </div>
              <h4 className="report feedback">
                <a href="https://twitter.com/madukaonline">LEAVE FEEDBACK</a>
              </h4>
            </div>
            <div className="single-right">
              <div className="title">
                <h2>{shop.name}</h2>
                <p>{shop && shop.registered_on ? formattedDate : "N/A"}</p>
                <div className="product-location">
                  <FmdGoodIcon />
                  {/* <ProductLocation locationId={product.location} /> */}
                  <span className="location-name"><ShopLocation locationId={shop.location}/></span>
                </div>
              </div>
              <div className="sold-by">
                <div className="profile-pic">
                  <ShopOwner userImageId={shop.owner} />
                </div>
              </div>
              <div className="seller-reach-out">
                <button className="con">CONTACT SELLER</button>
                <button className="start-chat">START CHAT</button>
              </div>
              <div className="safety">
                <h4>Safety Tips:</h4>
                <h6>
                  <ol>
                    <li>
                      Verify the seller's identity: Before making a purchase,
                      it's important to make sure the seller is legitimate. Look
                      for information about the seller on their profile page,
                      such as their name, location, and contact information.
                    </li>
                    <li>
                      Read product descriptions carefully: Make sure you
                      understand what you're buying, including the size, color,
                      and any other important details about the product.
                    </li>
                    <li>
                      Use a secure payment method: To protect your financial
                      information, it's best to use a secure payment method,
                      such as PayPal or a credit card, when making a purchase on
                      your webstore.
                    </li>
                    <li>
                      Check the return policy: Make sure you understand the
                      seller's return policy in case the product doesn't meet
                      your expectations.
                    </li>
                    <li>
                      Read reviews from other users: Look for reviews from other
                      users who have purchased products from the same seller.
                      This can give you an idea of the quality of the products
                      and the reliability of the seller.
                    </li>
                    <li>
                      Keep records of your transactions: Save a record of your
                      transaction, including the product description, payment
                      information, and shipping information. This will be useful
                      in case of any disputes.
                    </li>
                    <li>
                      Report any suspicious activity: If you encounter any
                      suspicious activity on your webstore, such as a seller
                      offering fake products or asking for personal information,
                      report it to the webstore's customer support team
                      immediately.
                    </li>
                  </ol>
                </h6>
                <h4 className="report">
                  <a href="https://twitter.com/madukaonline">Report Abuse</a>
                </h4>
              </div>
              <div className="seller-reach-out">
                <button className="con">VISIT SHOP</button>
                <button className="start-chat">POST A SIMILAR AD</button>
              </div>
            </div>
          </div>
          <div className="single-lower">
            <h3>{shop.name} Shop Products</h3>
            <Slider {...setting}>
              {content}
            </Slider>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="single-product-mobile">
          <div className="single-upper-mobile">
            <div className="single-left-mobile">
              <div className="single-image-mobile">
                <Slider {...settings}>
                  {shop.shopimages.map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt={`shop ${index + 1}`}
                    />
                  ))}
                </Slider>
              </div>
              <div className="ad-info">
                <div className="views">
                  <p>Ad Views</p>
                  <p>{shop.views}</p>
                </div>
                <div className="views">
                  <p>Ad Likes</p>
                  <p>{shop.likes}</p>
                </div>
                <div className="views">
                  <p>Shop Registered:</p>
                  <p>{shop && shop.date_posted ? formattedDate : "N/A"}</p>
                </div>
              </div>
              <div className="product-des">
                <p>{shop.description}</p>
              </div>
              <h4 className="report feedback">
                <a href="https://twitter.com/madukaonline">LEAVE FEEDBACK</a>
              </h4>
            </div>
            <div className="single-right">
              <div className="title">
                <h2>{shop.name}</h2>
                <p>{shop && shop.registered_on ? formattedDate : "N/A"}</p>
                <div className="product-location">
                  <FmdGoodIcon />
                  <span className="location-name">{shop.location}</span>
                </div>
              </div>
              <div className="sold-by">
                <div className="profile-pic">
                  <ShopOwner userImageId={shop.owner} />
                </div>
              </div>
              <div className="seller-reach-out">
                <button className="con">CONTACT SELLER</button>
                <button className="start-chat">START CHAT</button>
              </div>
              <div className="safety">
                <h4>Safety Tips:</h4>
                <span>
                  <ol>
                    <li>
                      Verify the seller's identity: Before making a purchase,
                      it's important to make sure the seller is legitimate. Look
                      for information about the seller on their profile page,
                      such as their name, location, and contact information.
                    </li>
                    <li>
                      Read product descriptions carefully: Make sure you
                      understand what you're buying, including the size, color,
                      and any other important details about the product.
                    </li>
                    <li>
                      Use a secure payment method: To protect your financial
                      information, it's best to use a secure payment method,
                      such as PayPal or a credit card, when making a purchase on
                      your webstore.
                    </li>
                    <li>
                      Check the return policy: Make sure you understand the
                      seller's return policy in case the product doesn't meet
                      your expectations.
                    </li>
                    <li>
                      Read reviews from other users: Look for reviews from other
                      users who have purchased products from the same seller.
                      This can give you an idea of the quality of the products
                      and the reliability of the seller.
                    </li>
                    <li>
                      Keep records of your transactions: Save a record of your
                      transaction, including the product description, payment
                      information, and shipping information. This will be useful
                      in case of any disputes.
                    </li>
                    <li>
                      Report any suspicious activity: If you encounter any
                      suspicious activity on your webstore, such as a seller
                      offering fake products or asking for personal information,
                      report it to the webstore's customer support team
                      immediately.
                    </li>
                  </ol>
                </span>
                <h4 className="report">
                  <a href="https://twitter.com/madukaonline">Report Abuse</a>
                </h4>
              </div>
              <div className="seller-reach-out">
                <button className="con">VISIT SHOP</button>
                <button className="start-chat">POST A SIMILAR AD</button>
              </div>
            </div>
          </div>
          <div className="single-lower-mobile">
          <h3>{shop.name} Shop Products</h3>
          <Slider {...setter}>
          {content}
        </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleShopPage;

import React, { useEffect } from "react";
import "./ProductsExcerpt.css";
import ProductLocation from "./ProductLocation";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";
import { FormattedNumber } from "react-intl";
import { useMediaQuery } from "react-responsive";
import CallIcon from '@mui/icons-material/Call';
import { fetchLikes, getLikesById, postLike, postUnlike } from "./likesstatus/likesSlice";
import { selectIsAuthenticated } from "../auth/authSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

const selectPhoneNumber = (state, userId) => {
  const users = selectAllUsers(state);
  const owner = users.find((user) => user.id === userId);
  return owner ? owner.phone_number : "unknown";
};

const ProductsExcerpt = ({ product }) => {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(state => state.auth.user);
  
  const userId = user?.user_id;

  const user_id = userId;
  
  const productId = product.id;

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  

  const likedProducts = useSelector(getLikesById);
  const likesStatus = useSelector((state) => state.likes.status);

  const phoneNumber = useSelector((state) =>
    selectPhoneNumber(state, product.owner)
  );

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLikes({ productId: productId, user_id: user_id}));
  }, [dispatch, productId, user_id]);


  console.log('All Likes ', likedProducts)
  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      alert("Please log in to like this product.");
      return;
    }
  
    try {
      if (likedProducts && likedProducts.has_likes) {
        await dispatch(postUnlike({ productId, userId }));
      } else {
        await dispatch(postLike({ productId, userId }));
      }
      
      // Fetch the updated likes after liking or unliking
      await dispatch(fetchLikes({ productId, user_id }));
    } catch (error) {
      console.error('Error liking/unliking product:', error);
    }
  };


  return (
    <>
      {isDesktopOrLaptop && (
        <div className="product">
          <div className="product-image">
          <div
                  className={` absolute top-3 left-3 cursor-pointer bg-white rounded-full p-1  ${likedProducts && likedProducts.has_likes ? "liked" : ""}`}
                  onClick={handleLikeClick}
                >
                  {likedProducts && likedProducts.has_likes ? (
                    <FavoriteIcon sx={{ color: pink[500] }} className="" />
                  ) : (
                    <FavoriteBorderIcon className="" />
                  )}
                </div>
            {/* <FavoriteBorderIcon className="love" /> */}
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0].image} alt="product" />
            </Link>
          </div>
          <div className="  ">
            <div className="price-name ">
              <h5>{product.ad_title}</h5>

              <h6 className=" !ms-2.5 tracking-tighter underline">
                <FormattedNumber
                  value={product.price}
                  style="currency"
                  currency="Ksh"
                />
              </h6>
            </div>
            <div className="location-contact mt-1 !flex">
              <LocationOnIcon className="location-icon !me-0" />
              <h6 className=" !ms-0">
                <ProductLocation locationId={product.location}  />
              </h6>
            </div>
            <div className=" ms-2.5">
              <a href={`tel:${phoneNumber}`}><CallIcon className=" !text-lg" /> contact seller</a>
            </div>
            {/* <div className=" call-contact ">
              <button className="contact-seller">
                <a href={`tel:${phoneNumber}`}>CONTACT SELLER</a>
              </button>
            </div> */}
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="product-mobile">
          <div className="product-image-mobile">
            <FavoriteBorderIcon className="love-mobile" />
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0].image} alt="product" />
            </Link>
          </div>
          <div className="product-details-mobile">
            <div className="price-name-mobile">
              <h3>{product.ad_title}</h3>
              <div className="location-contact-mobile">
                <LocationOnIcon className="location-icon-mobile" />
                <h6>
                  <ProductLocation locationId={product.location} />
                </h6>
              </div>
              <h5>
                <FormattedNumber
                  value={product.price}
                  style="currency"
                  currency="Ksh"
                />
              </h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsExcerpt;

import "./SingleProductPage.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ProductLocation from "./ProductLocation";
import { FormattedNumber } from "react-intl";
import ProductShop from "./ProductShop";
import ProductOwnerImage from "./ProductOwnerImage";
import { useMediaQuery } from "react-responsive";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fetchProducts, getProductsError, getProductsStatus, selectAllProducts} from "./productsSlice";
import { fetchLikes, getLikesById, postLike, postUnlike } from "./likesstatus/likesSlice";
import { selectIsAuthenticated } from "../auth/authSlice";
import RightLoader from "../../components/homescreen/RightLoader";
import { fetchCategories } from "../categories/categorySlice";
import ProductsRelatedExcerpt from "./ProductsRelatedExcerpt";
import { selectAllUsers } from "../users/usersSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
import { pink } from '@mui/material/colors';


const SingleProductPage = ({ product }) => {
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  const dispatch = useDispatch();
  const productId = product.id;


  const selectPhoneNumber = (state, userId) => {
    const users = selectAllUsers(state);
    const owner = users.find((user) => user.id === userId);
    return owner ? owner.phone_number : "unknown";
  };

  const phoneNumber = useSelector((state) =>
    selectPhoneNumber(state, product.owner)
  );

  


  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(state => state.auth.user);
  
  const userId = user?.user_id;

  const user_id = userId;
  
  useEffect(() => {
    dispatch(fetchLikes({ productId: productId, user_id: user_id}));
  }, [dispatch, productId, user_id]);


  const likedProducts = useSelector(getLikesById);
  const likesStatus = useSelector((state) => state.likes.status);

  if (likedProducts && likedProducts.has_likes) {
    // Perform actions if has_likes is true
    console.log('Product is liked by you');
    // Perform other actions...
  } else {
    console.log('product is not liked by you')
  }
  


const isProductLiked = async () => {
  await likesStatus;

  if (likesStatus === 'fulfilled' && likedProducts && likedProducts.length > 0) {
    const likedProduct = likedProducts[0].product === productId && likedProducts[0]['user'] === userId;
    return Boolean(likedProduct);
  } else {
    return false;
  }
};


// const isProductLiked = async () => {
//   try {
//     const result = await likesStatus; // Assuming likesStatus is a promise

//     if (result === 'fulfilled' && likedProducts && likedProducts.length > 0) {
//       // Assuming likedProducts is an array of liked products
//       const likedProduct = likedProducts.some(product => product.product === productId && product.user === userId);
//       return likedProduct;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Error occurred:', error);
//     return false;
//   }
// };

// console.log('is product liked? ', isProductLiked)

  
 
  

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    isProductLiked().then((result) => {
      setLiked(result);
    });
  }, [likesStatus, likedProducts,isProductLiked, isAuthenticated, userId, productId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  
  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      alert("Please log in to like this product.");
      return;
    }
  
    try {
      if (likedProducts && likedProducts.has_likes) {
        console.log('UnLiking....')
        await dispatch(postUnlike({ productId, userId }));
      } else {
        console.log('Liking...')
        await dispatch(postLike({ productId, userId }));
      }
      
      // Fetch the updated likes after liking or unliking
      await dispatch(fetchLikes({ productId, user_id }));
    } catch (error) {
      console.error('Error liking/unliking product:', error);
    }
  };

  
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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


  const desksettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };


  const mobisettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  var setter = {
    dots: false,
    infinite: true,
    
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }


  const date =
    product && product.date_posted ? new Date(product.date_posted) : new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  if (!product) {
    return (
      <section>
        <h2>Product not found!</h2>
      </section>
    );
  }


  let content;
  
  if (productStatus === "loading") {
    content = <div className="load">
      <RightLoader />
    </div>
    
  } else if (productStatus === "succeeded") {
    const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id);
    if (relatedProducts.length === 0) {
      content = <p>No related products found.</p>;
    }
    else {
      content = relatedProducts.map((p) => (
        <ProductsRelatedExcerpt key={p.id} productId={p.id} p={p} userId={p.owner} />
      ));
    }
  } else if (productStatus === "failed") {
    content = <p>Failed {error}</p>;
  }




  var setting = {
    
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        setting: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        setting: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        setting: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="single-product">
          <div className="single-upper">
            <div className="single-left">
              <div className="single-image">
                <Slider {...settings}>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt={`product ${index + 1}`}
                    />
                  ))}
                </Slider>
              
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
              </div>
              <div className="ad-info">
                <div className="views">
                  {/* <p>Ad Views: <FontAwesomeIcon icon={fa} style={{color: "#ff0000",}} /></p> */}
                  <p>Ad Views: <FontAwesomeIcon icon="fa-solid fa-camera-retro" /></p>
                  
                  <p>{product.views}</p>
                </div>
                <div className="views">
                  <p>Ad Likes</p>
                  <p>{product.likes}</p>
                </div>
                <div className="views">
                  <p>Shop Created: </p>
                  <p>
                    {product && product.date_posted ? formattedDate : "N/A"}
                  </p>
                </div>
              </div>
              <div className="product-des">
                <p>{product.description}</p>
              </div>
              <h4 className="report feedback">
                <a href="https://twitter.com/madukaonline">LEAVE FEEDBACK</a>
              </h4>
            </div>
            <div className="single-right">
              <div className="title font-bold">
                <h2>{product.ad_title}</h2>
                
                <div className="product-location">
                  <FmdGoodIcon />
                  <span className="location-name">
                    <ProductLocation locationId={product.location} />
                  </span>
                </div>
              </div>
              <div className="single-product-price">
                <h4 className=" tracking-tighter font-medium">
                  <FormattedNumber
                    value={product.price}
                    style="currency"
                    currency="Ksh"
                  />
                </h4>
              </div>
              <div className="sold-by mt-1">
                <div className="profile-pic">
                  <ProductOwnerImage userImageId={product.owner} />
                </div>
                <div className="profile">
                  <div className=" flex mb-2 items-center">
                    <p className=" me-2 font-bold">Sold by:</p>
                    <span className=" !text-sm">
                      <ProductShop shopId={product.shop} />
                    </span>
                  </div>
                  <div className=" flex items-center">
                  <p className=" me-2 font-bold">
                    Online:
                  </p>
                  <span className=" !text-sm">Now</span>
                  </div>                 
                </div>
              </div>
              <div className="seller-reach-out">
              <p className=" mb-2">posted on: {product && product.date_posted ? formattedDate : "N/A"}</p>
                <button className="con"> <a href={`tel: ${phoneNumber}`}>SHOW CONTACT</a> </button>
                <button className="start-chat bg-gray-400 mb-3"><a target="blank" href={`https://wa.me/${phoneNumber}`}>START CHAT</a></button>
              </div>
              <div className="safety">
                <h4 className=" font-bold">Safety Tips:</h4>
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
                <button className="con ">VISIT SHOP</button>
                <button className="start-chat bg-gray-400">POST A SIMILAR AD</button>
              </div>
            </div>
          </div>
          <div className="single-lower">
            <h3 className=" font-bold mb-4 text-lg">Similar Products</h3>
          <Slider {...desksettings}>
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
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt={`product ${index + 1}`}
                    />
                  ))}
                </Slider>
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
                {/* <div
                  className={`single-image-mobile-love ${liked ? "liked" : ""}`}
                  onClick={handleLikeClick}
                >
                  <FavoriteBorderIcon className={`love-icon ${liked ? "liked-icon" : ""}`} />
                </div> */}

                
              </div>
              <div className="ad-info-mobile">
                <div className="views-mobile">
                  <p>Ad Views</p>
                  <p>{product.views}</p>
                </div>
                <div className="views-mobile">
                  <p>Ad Likes</p>
                  <p>{product.likes}</p>
                </div>
                <div className="views-mobile">
                  <p>Shop Registered:</p>
                  <p>
                    {product && product.date_posted ? formattedDate : "N/A"}
                  </p>
                </div>
              </div>
              <div className="product-des">
                <p>{product.description}</p>
              </div>
              <h4 className="report feedback">
                <a href="https://twitter.com/madukaonline">LEAVE FEEDBACK</a>
              </h4>
            </div>
            <div className="single-right">
              <div className="title">
                <h2>{product.ad_title}</h2>
                <p>{product && product.date_posted ? formattedDate : "N/A"}</p>
                <div className="product-location">
                  <FmdGoodIcon />
                  <span className="location-name">
                    <ProductLocation locationId={product.location} />
                  </span>
                </div>
              </div>
              <div className="single-product-price">
                <h4>
                  <FormattedNumber
                    value={product.price}
                    style="currency"
                    currency="Ksh"
                  />
                </h4>
              </div>
              <div className="sold-by">
                <div className="profile-pic">
                  <ProductOwnerImage userImageId={product.owner} />
                </div>
                <div className="profile">
                  <p>Sold by:</p>
                  <span>
                    <ProductShop shopId={product.shop} />
                  </span>
                  <p>
                    Last Online: <span>Now</span>
                  </p>
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
                <button className="con"> <a href={`tel: ${phoneNumber}`}>CONTACT SELLER</a> </button>
                <button className="start-chat"><a target="blank" href={`https://wa.me/${phoneNumber}`}>START CHAT</a></button>
              </div>
            </div>
          </div>
          <div className="single-lower-mobile">
          <h3>Similar Products</h3>
          <Slider {...setter}>
          {content}
        </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;

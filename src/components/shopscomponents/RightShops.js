import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopExcerpt from "../../features/shops/ShopExcerpt";

import {
  fetchShops,
  getShopsError,
  getShopsStatus,
  selectAllShops,
} from "../../features/shops/shopsSlice";
import "swiper/css";
import "swiper/css/pagination";
import { useMediaQuery } from "react-responsive";
import RightLoader from "../homescreen/RightLoader";
import { fetchProducts } from "../../features/products/productsSlice";

const RightShops = () => {


  const isDesktopOrLaptop = useMediaQuery({query: "(min-width: 1224px)",});
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const dispatch = useDispatch();
  const shops = useSelector(selectAllShops);
  const shopStatus = useSelector(getShopsStatus);
  const error = useSelector(getShopsError);

  useEffect(() => {
    if (shopStatus === "idle") {
      dispatch(fetchShops());
    }
  }, [shopStatus, dispatch]);

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let content;
    if(shopStatus === 'loading'){
      content = <div className="load">
      <RightLoader />
     
    </div>
    } else if(shopStatus === 'succeeded'){
        content = shops.map(shop => <ShopExcerpt key={shop.id} shop={shop} shopId = {shop.id} />)
    }else if(shopStatus === 'failed'){
        content = <p>Failed {error}</p>
    }


  
  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="right-products">
        <div className="products-list">{content}</div>
        
        <div className="products-list">
          
        </div>
      </div>
      )}
      {isTabletOrMobile && (
        <div className="right-products-mobile">
        <div className="products-list-mobile">{content}</div>
       
      </div>
      )}
    </div>
    
  );
};

export default RightShops;

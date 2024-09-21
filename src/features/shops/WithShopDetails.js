import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchShopById, getShopById, getShopByIdError, getShopByIdStatus } from "./singleShopSlice";
import SingleShopPage from "./SingleShopPage";

const WithShopDetails = () => {
  const {shopId } = useParams();
  const shopIdNum = shopId;
  console.log("This is the is:", shopId);


  const dispatch = useDispatch();
  const shop = useSelector(getShopById);
  const shopStatus = useSelector(getShopByIdStatus);
  const error = useSelector(getShopByIdError);

  useEffect(() => {
    dispatch(fetchShopById(shopIdNum));
    console.log("Am called in here! Shop Id");
  }, [dispatch, shopIdNum]);


  let content;
 
  if (shopStatus === "loading") {
    content = <div className="load">
      <p>Loading...</p>
    </div>
    
  } else if (shopStatus === "succeeded") {
    content = <SingleShopPage shop={shop} />
    
  } else if (shopStatus === "failed") {
    content = <p>Failed {error}</p>;
  }

  return (
    <div>
      {content}
    </div>
  )
};

export default WithShopDetails;

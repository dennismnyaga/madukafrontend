import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, getProductById, getProductByIdError, getProductByIdStatus } from './singleProductSlice';
import SingleProductPage from './SingleProductPage';
import { useParams } from 'react-router-dom';

const WithProductDetails = () => {
  const {productId} = useParams();
  const productIdNum = productId;
  


  const dispatch = useDispatch();
  const product = useSelector(getProductById);
  const productStatus = useSelector(getProductByIdStatus);
  const error = useSelector(getProductByIdError);




  useEffect(() => {
    dispatch(fetchProductById(productIdNum ));
   
  }, [dispatch, productIdNum]);



  let content;
 
  if (productStatus === "loading") {
    content = <div className="load">
      <p>Loading...</p>
    </div>
    
  } else if (productStatus === "succeeded") {
    content = <SingleProductPage product={product} />
    
  } else if (productStatus === "failed") {
    content = <p>Failed {error}</p>;
  }
  return (
    <div>
      {content}
    </div>
  )
}

export default WithProductDetails


import "./RightProducts.css";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import RightLoader from "./RightLoader";
import CategoryProductExcerpt from "../../features/categories/CategoryProductExcerpt";
import { fetchCategoryProducts, getCategoryProductError, getCategoryProductStatus, selectAllCategoryProduct } from "../../features/categories/categoryProductsSlice";
import { useParams } from "react-router-dom";

const RightProductFiltered = () => {
  const  categoryId  = useParams();
  const categoryIdNum = categoryId.id;
  console.log(categoryIdNum)
 
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });


  const dispatch = useDispatch();
  const products = useSelector(selectAllCategoryProduct);
  const productStatus = useSelector(getCategoryProductStatus);
  const error = useSelector(getCategoryProductError);




  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryIdNum));
    console.log("Am called!")
  }, [dispatch, categoryIdNum]);
  

  let content;
  if (productStatus === "loading") {
    content = <div className="load">
      <RightLoader />
    </div>
    
  } else if (productStatus === "succeeded") {
    
    content = products.map((product) => (
      <CategoryProductExcerpt key={product.id} product={product} />
    ));
    
  } else if (productStatus === "failed") {
    content = <p>Failed {error}</p>;
  }

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="right-products">
          
          <div className="products-list">{content}</div>
          
        </div>
        
      )}
      {isTabletOrMobile && (
        <div className="right-products-mobile">
          <div className="products-list-mobile">{content}</div>
        </div>
      )}
    </div>
  );
}

export default RightProductFiltered
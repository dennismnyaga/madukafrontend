import "./RightProducts.css";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getProductsError,
  getProductsStatus,
  selectAllProducts,
} from "../../features/products/productsSlice";
import { useEffect } from "react";
import ProductsExcerpt from "../../features/products/ProductsExcerpt";
import { useMediaQuery } from "react-responsive";
import RightLoader from "./RightLoader";

const RightProducts = ({ categoryId }) => {
  const isDesktopOrLaptop = useMediaQuery({query: "(min-width: 1224px)",});
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });


  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  let content;
  let latercontent;
  if (productStatus === "loading") {
    content = <div className="load">
      <RightLoader />
    </div>
    
  } else if (productStatus === "succeeded") {
    const firstFourProducts = products.slice(0, 6);
    content = firstFourProducts.map((product) => (
      <ProductsExcerpt key={product.id} productId={product.id} product={product} />
    ));
    latercontent = products.slice(4).map((product) => (
      <ProductsExcerpt key={product.id} productId={product.id} product={product} />
    ));
  } else if (productStatus === "failed") {
    content = <p>Failed {error}</p>;
  }

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="right-products">
          <div className="products-list">{content}</div>
          {/* <div className="swipe">
            <div className="slider-inbox">
              <div className="slides">
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                  }}
                  className="mySwiper"
                  modules={[Pagination]}
                  effect="fade"
                >
                  <SwiperSlide>
                    <div className="slider-image">
                      <img
                        src="https://imgs.search.brave.com/ik8QUJxFS2Uw5KrC4gCVtwdtFJC_eP0x0m9kqrLNSEs/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxz/ZGVzay5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDEv/U3RyYXdiZXJyeS1C/YWNrZ3JvdW5kLS5q/cGc"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="slider-image">
                      <img
                        src="https://imgs.search.brave.com/ik8QUJxFS2Uw5KrC4gCVtwdtFJC_eP0x0m9kqrLNSEs/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxz/ZGVzay5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDEv/U3RyYXdiZXJyeS1C/YWNrZ3JvdW5kLS5q/cGc"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="slider-image">
                      <img
                        src="https://imgs.search.brave.com/ik8QUJxFS2Uw5KrC4gCVtwdtFJC_eP0x0m9kqrLNSEs/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxz/ZGVzay5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDEv/U3RyYXdiZXJyeS1C/YWNrZ3JvdW5kLS5q/cGc"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="slider-image">
                      <img
                        src="https://imgs.search.brave.com/ik8QUJxFS2Uw5KrC4gCVtwdtFJC_eP0x0m9kqrLNSEs/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxz/ZGVzay5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDEv/U3RyYXdiZXJyeS1C/YWNrZ3JvdW5kLS5q/cGc"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="slider-image">
                      <img
                        src="https://imgs.search.brave.com/ik8QUJxFS2Uw5KrC4gCVtwdtFJC_eP0x0m9kqrLNSEs/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxz/ZGVzay5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDEv/U3RyYXdiZXJyeS1C/YWNrZ3JvdW5kLS5q/cGc"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="slider-image">
                      <img
                        src="https://imgs.search.brave.com/ik8QUJxFS2Uw5KrC4gCVtwdtFJC_eP0x0m9kqrLNSEs/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxz/ZGVzay5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDEv/U3RyYXdiZXJyeS1C/YWNrZ3JvdW5kLS5q/cGc"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="slider-image">
                      <img
                        src="https://imgs.search.brave.com/ik8QUJxFS2Uw5KrC4gCVtwdtFJC_eP0x0m9kqrLNSEs/rs:fit:1200:1200:1/g:ce/aHR0cDovL3dhbGxz/ZGVzay5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTcvMDEv/U3RyYXdiZXJyeS1C/YWNrZ3JvdW5kLS5q/cGc"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="slide-details">
                <h5>Chicken Inn -Thika Road Mall, Roysambu</h5>
                <button>GO TO HOTEL</button>
              </div>
            </div>
          </div> */}
          <div className="products-list">{latercontent}</div>
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

export default RightProducts;

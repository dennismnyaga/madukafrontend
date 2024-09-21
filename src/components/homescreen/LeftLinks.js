import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./LeftLinks.css";
import { useDispatch, useSelector } from "react-redux";
import MovingIcon from "@mui/icons-material/Moving";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import LeftLoader from "./LeftLoader";
import {
  fetchCategories,
  getCategoriesStatus,
  selectAllCategories,
} from "../../features/categories/categorySlice";
import CategoriesExcerpt from "../../features/categories/CategoriesExcerpt";
import { useMediaQuery } from "react-responsive";

const LeftLinks = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleCateClick = () => {
    setIsVisible(!isVisible);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const location = useLocation();
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const categoryStatus = useSelector(getCategoriesStatus);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  let content;
  if (categoryStatus === "loading") {
    content = <LeftLoader />;
  } else if (categoryStatus === "succeeded") {
    content = categories.map((category) => (
      <CategoriesExcerpt
        key={category.id}
        category={category}
        categoryId={category.id}
      />
    ));
  }

  function getActiveLink(pathname) {
    switch (pathname) {
      case "/":
        return "featured";
      case "/shops":
        return "shops";
      default:
        return "";
    }
  }
  const [activeLink, setActiveLink] = useState(
    getActiveLink(location.pathname)
  );

  return (
    <div>
      {isDesktopOrLaptop && (
        <div className="left-links">
          <div className="top-links">
            <Link
              className={`link ${activeLink === "featured" ? "active" : ""}`}
              onClick={() => setActiveLink("featured")}
              to="/"
            >
              FEATURED
            </Link>
            <Link
              className={`link ${activeLink === "near-you" ? "active" : ""}`}
              onClick={() => setActiveLink("near-you")}
              to="/shops"
            >
              NEAR YOU
            </Link>
            <Link
              className={`link ${activeLink === "shops" ? "active" : ""}`}
              onClick={() => setActiveLink("shops")}
              to="/shops"
            >
              SHOPS
            </Link>
          </div>
          <div className="bottom-links">
            <ul>{content}</ul>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="left-links-mobile">
          <div className="left-links-mobile-head">
            <h4>CATEGORIES</h4>
            <p className="Cate" onClick={handleCateClick}>
              All Categories
            </p>
          </div>
          <div className="top-links-mobile">
            <Link
              className={`link-mobil ${
                activeLink === "featured" ? "active" : ""
              }`}
              to="/"
              onClick={() => setActiveLink("featured")}
            >
              <div className="linked f-linked">
                <MovingIcon className="linked-icon" />
                <h5>FEATURED</h5>
              </div>
            </Link>

            <Link
              className={`link-mobil ${
                activeLink === "near-you" ? "active" : ""
              }`}
              to="/"
              onClick={() => setActiveLink("near-you")}
            >
              <div className="linked">
                <LocationOnOutlinedIcon className="linked-icon" />
                <h5> NEAR YOU</h5>
              </div>
            </Link>

            <Link
              className={`link-mobil ${activeLink === "shops" ? "active" : ""}`}
              to="/shops"
              onClick={() => setActiveLink("shops")}
            >
              <div className="linked l-linked">
                <StoreOutlinedIcon className="linked-icon" />
                <h5>SHOPS</h5>
              </div>
            </Link>
          </div>
          <div className={`bottom-links-mobile ${isVisible ? "visible" : ""}`}>
            <div className="category-more">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftLinks;

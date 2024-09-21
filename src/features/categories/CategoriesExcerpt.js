import React from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { selectAllProducts } from "../products/productsSlice";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const CategoriesExcerpt = ({ category, categoryId }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const products = useSelector(selectAllProducts);
  const productCount = products.filter(
    (product) => product.category === category.id
  ).length;
  return (
    <div>
      {isDesktopOrLaptop && (
        <li>
          <Link className="link" to={`/categories/${categoryId}`}>
            <span>{category.name}</span>
            <div className="counters">
              {productCount} Ads
              <ChevronRightIcon />
            </div>
          </Link>
        </li>
      )}
      {isTabletOrMobile && (
        <div className="cat">
          <Link className="link" to={`/categories/${categoryId}`}>
            <img src={category.image} alt="images" />
            <p>{category.name}</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoriesExcerpt;

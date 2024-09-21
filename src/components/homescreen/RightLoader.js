import { Skeleton } from "@mui/material";
import React from "react";
import { useMediaQuery } from "react-responsive";

const RightLoader = (props) => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <>
      {isDesktopOrLaptop && (
        <div className="home-loaders">
          <div className="per-loader">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="loader-frame"
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
              width={150}
            />
          </div>
          <div className="per-loader">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="loader-frame"
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
              width={150}
            />
          </div>
          <div className="per-loader">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="loader-frame"
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
              width={150}
            />
          </div>
          <div className="per-loader">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="loader-frame"
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
              width={150}
            />
          </div>
          <div className="per-loader">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="loader-frame"
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
              width={150}
            />
          </div>
          <div className="per-loader">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="loader-frame"
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
              width={150}
            />
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="home-loaders-mobile">
          
          
          <div className="per-loader">
            <Skeleton
              variant="rectangular"
              animation="wave"
              className="loader-frame"
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1rem" }}
              width={150}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RightLoader;

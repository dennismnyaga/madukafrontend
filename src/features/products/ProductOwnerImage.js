import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import defaultImage from "../images/default.png"
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";


const ProductOwnerImage = ({ userImageId }) => {
  const usersImage = useSelector(selectAllUsers);

  const ownerImage = usersImage.find(
    (userimage) => userimage.id === userImageId
  );
  const shapeStyles = { bgcolor: "primary.main", width: 40, height: 40 };
  const shapeCircleStyles = { borderRadius: "50%" };
  const circle = (
    <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
  );

  return (
    <div className="product-owner-image">
      <Badge color="secondary" overlap="circular" badgeContent=" ">
      <img src={ownerImage ? ownerImage.profile_pic : defaultImage} alt="Pr" />
      </Badge>
      {/* <img src={ownerImage ? ownerImage.profile_pic : defaultImage} alt="Pr" />
      <div
        className={`online-dot ${ownerImage?.online ? "online" : "offline"}`}
      /> */}
    </div>
  );
};

export default ProductOwnerImage;

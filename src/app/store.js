import { configureStore} from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import usersReducer from "../features/users/usersSlice";
import locationsReducer from "../features/location/locationsSlice";
import shopsReducer from "../features/shops/shopsSlice";
import categoriesReducer from "../features/categories/categorySlice";
import authReducer from "../features/auth/authSlice"
import productReducer from "../features/products/singleProductSlice"
import categoryproductReducer from "../features/categories/categoryProductsSlice"
import shopReducer from "../features/shops/singleShopSlice"
import likesReducer from "../features/products/likesstatus/likesSlice"
import searchReducer from "../components/searchFunctionality/SearcherSlice"
import postsReducer from "../features/products/ProductForm/postProductSlice"
import shoppostsReducer from "../features/products/ProductForm/postShopSlice"




export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
    users: usersReducer,
    locations: locationsReducer,
    shops: shopsReducer,
    shop: shopReducer,
    categories: categoriesReducer,
    categoryproduct: categoryproductReducer,
    likes: likesReducer,
    searches: searchReducer,
    posts: postsReducer,
    shoppost: shoppostsReducer,
  },
  
});
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/homescreen/Home";
import Shops from "./components/shopscomponents/Shops";
import Header from "./components/homescreen/Header";
import Banner from "./components/homescreen/Banner";
import Footer from "./components/homescreen/Footer";
import AboutPage from "./components/about/AboutPage";
import Login from "./features/users/Login";
import SignUp from "./features/users/SignUp";
import AddProductForm from "./features/products/ProductForm/AddProductForm";
import AddShopForm from "./features/products/ProductForm/AddShopForm";
import ProductCategory from "./components/homescreen/ProductCategory";
import WithProductDetails from "./features/products/WithProductDetails";
import WithShopDetails from "./features/shops/WithShopDetails";


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Home /></>}/>
          <Route path="/shops" element={<><Shops /></>} />
          <Route path="/singleshop/:shopId" element={<><Header/><Banner/><WithShopDetails /><Footer /></>} />
          <Route path="/product/:productId" element={<><Header/><Banner/><WithProductDetails /><Footer /></>} />
          <Route path="/about" element={<><Header/><Banner/><AboutPage/><Footer/></>} />
          <Route path="/login" element={<><Header/><Banner/><Login/><Footer/></>} />
          <Route path="/signup" element={<><Header/><Banner/><SignUp/><Footer/></>} />
          <Route path="/addproduct" element={<><Header/><Banner/><AddProductForm/><Footer/></>} />
          <Route path="/addshop" element={<><Header/><Banner/><AddShopForm/><Footer/></>} />
          <Route path="/categories/:id" element={<><ProductCategory/></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


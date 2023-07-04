import React from "react";
import "./Home.css";
import Product from "./ProductCard";
const product = {
  name: "Blue SHirt",
  images: [
    {
      url: "https://media.wired.com/photos/6425ef2984ccb2dd1d2ac6cb/16:9/w_2399,h_1349,c_limit/asuszenbooks13oled_GEAR-Featured.jpg",
    },
  ],
  price: "3000",
  _id: "rroshan",
};

const Home = () => {
  return (
    <>
      <div className="banner h-[100vh] bg-[gray] flex flex-col justify-center items-center">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>

        <a href="#container">
          <button>Scroll me</button>
        </a>
      </div>
      <h2 className="text-center text-[20px]">Featured Products</h2>
      <div className="classname flex flex-wrap justify-center gap-9 m-[auto]">

        <Product product={product} />
        <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
    <Product product={product}/>
      </div>

      
    </>
  );
};

export default Home;

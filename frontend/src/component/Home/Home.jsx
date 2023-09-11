import React from "react";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
const product ={
    name:"silencer",
    photos: [{url: "https://images.pexels.com/photos/12350402/pexels-photo-12350402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}],
    price: 1000,
    _id:'abhishek'
}
const Home = () => {
  const backgroundStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')",
  };
  return (
    <>
    <MetaData title='Home page working'/>
      <div
        style={backgroundStyle}
        className=" bg-cover bg-center  h-[40vh] text-white py-24 px-10 object-fill"
      >
        <div className="md:w-1/2">
          <p className="font-bold text-sm uppercase">Services</p>
          <p className="text-3xl font-bold">Multimedia products</p>
          <p className="text-2xl mb-10 leading-none">
            Atractive designs for your brand
          </p>
          <a
            href="#container"
            className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
          >
            Contact us
          </a>
        </div>
      </div>

      <h1 className="text-center">Featured Product</h1>
      <div id='container' className=" flex flex-wrap justify-center gap-10 ">
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
      </div>
    </>
  );
};

export default Home;

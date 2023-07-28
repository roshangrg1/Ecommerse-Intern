import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import About from "./component/About/About";
import Products from "./component/Products/Products";
import Contact from "./component/Contact/Contact";
import SingleProduct from "./component/SingleProduct/SingleProduct";
import Cart from "./component/Cart/Cart";
import Error from "./component/Error/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/products" exact element={<Products />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/product/:id" exact element={<SingleProduct />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="*" exact element={<Error/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

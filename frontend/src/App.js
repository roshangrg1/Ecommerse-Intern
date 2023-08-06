import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
function App() {
  return (

    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        {/* <Route path="/about" exact element={<About />} />
        <Route path="/products" exact element={<Products />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/product/:id" exact element={<SingleProduct />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="*" exact element={<Error/>} /> */}

      </Routes>
      <Footer/>
    </BrowserRouter>

  );
}

export default App;

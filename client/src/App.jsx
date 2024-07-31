import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import { useState } from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./pages/Cart";

function App() {
  const [cartItem, setCartItem] = useState([]);

  return (
    <div className="App">
      <Router>
        <ToastContainer theme="dark"/>
        <Header cartItem={cartItem} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<HomePage />} />
          <Route
            path="/product/:id"
            element={<ProductDetails cartItem={cartItem} setCartItem={setCartItem} />}
          />
          <Route
            path="/Cart"
            element={<Cart cartItem={cartItem} setCartItem={setCartItem} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

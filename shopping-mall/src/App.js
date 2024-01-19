import "./App.css";
import "firebase/auth";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProductDetail from "./components/productList/ProductDetail";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;

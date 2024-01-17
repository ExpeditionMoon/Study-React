import "./App.css";
import "firebase/auth";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProductDetail from "./components/productList/ProductDetail";
import ProductLists from "./components/productList/ProductLists";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} >
            <Route path="/products" element={<ProductLists />}  />
          </ Route>
          <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;

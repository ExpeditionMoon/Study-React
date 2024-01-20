import "./App.css";
import "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./components/home/Home";
import ProductDetail from "./components/productList/ProductDetail";
import Cart from "./components/Cart/Cart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearUser, setUser } from "./redux/authSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const isAuthenticated = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid }));
      } else {
        dispatch(clearUser());
      }
    });
    return () => isAuthenticated();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;

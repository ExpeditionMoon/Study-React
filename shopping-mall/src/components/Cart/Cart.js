import React, { useEffect, useState } from "react";
import "./Cart.css";
import Header from "../header/Header";

export default function Cart() {
  const [cart, setCart] = useState([]);

  // 장바구니 불러오기
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const removeCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="home">
      <Header />
      <div className="cartBox">
        <h2>장바구니</h2>
        {cart.map((product) => (
          <div className="cartDetail" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="cartInfo">
              <h3>{product.title}</h3>
              <h2>${product.price}</h2>
            </div>
            <button onClick={() => removeCart(product)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

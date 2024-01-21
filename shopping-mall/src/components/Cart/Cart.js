import React, { useEffect } from "react";
import "./Cart.css";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getCartLists, removeFromCart } from "../../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.uid) {
      dispatch(getCartLists(user.uid));
    }
  }, [user, dispatch]);

  const handleRemoveFromCart = (product) => {
    if (user && user.uid) {
      dispatch(removeFromCart({ userId: user.uid, productId: product.id }));
    } else {
      console.log("로그인하지 않았습니다.");
    }
  };

  return (
    <div className="home">
      <Header />
      <div className="cartBox">
        <h2>장바구니</h2>
        {cart.length === 0 ? (
          <p>장바구니가 비어 있습니다.</p>
        ) : (
          cart.map((product) => (
            <div className="cartDetail" key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className="cartInfo">
                <h3>{product.title}</h3>
                <h2>${product.price}</h2>
              </div>
              <button onClick={() => handleRemoveFromCart(product)}>
                삭제
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export default function useCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((cart) => [...cart, product]);
    alert("장바구니에 상품이 담겼습니다.");
  };

  return [cart, addToCart];
}

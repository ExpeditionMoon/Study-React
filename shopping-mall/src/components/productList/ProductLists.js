import React, { useEffect, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import instance from "../api/instance";
import useCart from "../hook/useCart";

export default function ProductLists() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [cart, addToCart] = useCart();

  useEffect(() => {
    const getProduct = async () => {
      const axios = instance();
      try {
        let url = "";
        if (category) {
          url += `/category/${category}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("error : ", error);
      }
    };
    getProduct();
  }, [category]);

  return (
    <>
      <div className="categoryBtn">
        <button onClick={() => setCategory("")}>전체</button>
        <button onClick={() => setCategory("men's clothing")}>남성의류</button>
        <button onClick={() => setCategory("women's clothing")}>
          여성의류
        </button>
        <button onClick={() => setCategory("jewelery")}>악세사리</button>
        <button onClick={() => setCategory("electronics")}>전자기기</button>
      </div>
      <div className="lists">
        {products.map((product) => (
          <div className="item">
            <Link to={`products/${product.id}`} key={product.id}>
              <img src={product.image} alt={product.title} />
              <h5>{product.title}</h5>
            </Link>
            <div>
              <button onClick={() => addToCart(product)}>장바구니 담기</button>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

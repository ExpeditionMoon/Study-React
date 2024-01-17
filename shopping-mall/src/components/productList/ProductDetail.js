import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/instance";
import Header from "../header/Header";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const product = async () => {
      const axios = instance();
      try {
        let url = `${id}`;
        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        console.error("error : ", error);
      }
    };
    product();
  }, [id]);

  if (!product) {
    return <div>상품에 대한 정보가 존재하지 않습니다.</div>;
  }

  const handleCart = () => {};

  return (
    <div>
      <Header />
      <div className="infoBox">
        <div className="detail" key={id}>
          <img src={product.image} alt={product.title} />
          <div className="info">
            <h3>{product.title}</h3>
            <h2>${product.price}</h2>
            <p>{product.description}</p>
            <div>
              <button onCart={handleCart}>장바구니 담기</button>
              <button onCart={handleCart}>장바구니 이동</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

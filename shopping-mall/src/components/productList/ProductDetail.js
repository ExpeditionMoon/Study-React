import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../api/instance";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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

  const handleAddToCart = (product) => {
    if (user && user.uid) {
      dispatch(addToCart({ userId: user.uid, product: product }));
    } else {
      console.log("로그인하지 않았습니다.");
    }
  };

  const navigateCart = () => {
    navigate("/cart");
  };

  return (
    <div className="detailBox">
      <Header />
      <div className="infoBox">
        <div className="detail" key={id}>
          <img src={product.image} alt={product.title} />
          <div className="info">
            <h3>{product.title}</h3>
            <h2>${product.price}</h2>
            <p>{product.description}</p>
            <div>
              <button onClick={() => handleAddToCart(product)}>
                장바구니 담기
              </button>
              <button onClick={navigateCart}>장바구니 이동</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

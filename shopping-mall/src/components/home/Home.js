import React from "react";
import './Home.css';
import Header from "../header/Header";
import ProductLists from "../productList/ProductLists";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <ProductLists />
    </div>
  );
}

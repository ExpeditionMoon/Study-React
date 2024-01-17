import React from "react";
import './Home.css';
import { initializeApp } from "firebase/app";
import "firebase/auth";
import Header from "../header/Header";
import ProductLists from "../productList/ProductLists";

export default function Home() {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };
  // Firebase 앱 초기화
  const app = initializeApp(firebaseConfig);

  return (
    <div className="home">
      <Header />
      <ProductLists />
    </div>
  );
}

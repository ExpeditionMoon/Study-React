import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Nav from "./nav/Nav";

export default function Header() {
  return (
    <div className="head">
      <Link to={"/"} className="logo">
        SHOP
      </Link>
      <Nav />
    </div>
  );
}

import React, { useState } from "react";
import "./Header.css";
import SignUpModal from "../modal/SignUpModal";
import LoginModal from "../modal/LoginModal";

export default function Header() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSingUp, setShowSingUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // 모달창 열기
  const handleShowSignUp = () => {
    setShowSingUp(true);
  };
  const handleShowLogin = () => {
    setShowLogin(true);
  };
  // 모달창 닫기
  const handleCloseSignUp = () => {
    setShowSingUp(false);
    setEmail("");
    setPassword("");
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="head">
      <a href="/" className="logo">
        SHOP
      </a>
      {/* 로그인, 회원가입 버튼 */}
      <div className="modalBtn">
        <button>Cart</button>
        <button onClick={handleShowSignUp}>Sign Up</button>
        <SignUpModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          show={showSingUp}
          onClose={handleCloseSignUp}
        />
        <button onClick={handleShowLogin}>Login</button>
        <LoginModal
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          show={showLogin}
          onClose={handleCloseLogin}
        />
      </div>
    </div>
  );
}

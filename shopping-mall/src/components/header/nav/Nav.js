import React, { useEffect, useState } from "react";
import SignUpModal from "./modal/SignUpModal";
import LoginModal from "./modal/LoginModal";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSingUp, setShowSingUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginState = localStorage.getItem("isLogin") === "true";
    setIsLogin(loginState);
  }, []);

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

  // 로그인할 경우
  const handleLogin = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", true);
  };
  // 로그아웃할 경우
  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("isLogin");
  };

  const navigateCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <div className="modalBtn">
        <button onClick={navigateCart}>Cart</button>
        {!isLogin ? (
          <>
            <button onClick={handleShowSignUp}>Sign Up</button>
            <SignUpModal
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              show={showSingUp}
              link={handleShowLogin}
              onClose={handleCloseSignUp}
            />
            <button onClick={handleShowLogin}>Login</button>
            <LoginModal
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              link={handleShowSignUp}
              show={showLogin}
              onClose={handleCloseLogin}
              onLogin={handleLogin}
            />
          </>
        ) : (
          <>
            <button>My Page</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

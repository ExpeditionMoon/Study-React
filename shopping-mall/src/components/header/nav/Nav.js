import React, { useState } from "react";
import SignUpModal from "./modal/SignUpModal";
import LoginModal from "./modal/LoginModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";

export default function Nav() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSingUp, setShowSingUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
  // 로그아웃
  const handleLogout = () => {
    dispatch(logout());
    handleCloseLogin();
  };

  const navigateCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <div className="modalBtn">
        <button onClick={navigateCart}>Cart</button>
        {!isAuthenticated ? (
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

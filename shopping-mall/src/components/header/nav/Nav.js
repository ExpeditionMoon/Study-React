import React, { useState } from "react";
import SignUpModal from "./modal/SignUpModal";
import LoginModal from "./modal/LoginModal";

export default function Nav() {
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
    <div>
      <div className="modalBtn">
        <button>Cart</button>
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
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginModal({
  link,
  show,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const modalRef = useRef();
  const navgate = useNavigate();
  const [message, setMessage] = useState("");

  // 모달 외부 클릭할 경우
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
        setEmail("");
        setPassword("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!show) {
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navgate('/');
      onClose();
    } catch (error) {
      return error && setMessage("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const hadleModalChange = () => {
    link();
    onClose();
  };

  return (
    <div className="modalBox">
      <div className="modal" ref={modalRef}>
        <form className="inputTxt">
          <div>
            <p> ID: </p>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p>Password: </p>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {message && <span>{message}</span>}
        </form>
        <p>
          계정이 있습니까? <button onClick={hadleModalChange}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}

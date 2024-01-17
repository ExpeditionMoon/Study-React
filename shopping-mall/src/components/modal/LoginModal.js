import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginModal({ show, onClose, email, setEmail, password, setPassword }) {
  const modalRef = useRef();

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

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공!");
    } catch (error) {
      console.error("error : ", error);
    }
  };

  return (
    <div className="modalBox">
      <div className="modal" ref={modalRef}>
        <div className="inputTxt">
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
        </div>
      </div>
    </div>
  );
}

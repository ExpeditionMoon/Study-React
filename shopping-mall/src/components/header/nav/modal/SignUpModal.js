import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../../firebase";

export default function SignUpModal({
  link,
  show,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const modalRef = useRef();
  const [message, setMessage] = useState("");

  // 모달 외부 클릭할 경우
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
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

  const handleSingUp = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      link();
      onClose();
    } catch (error) {
      return error && setMessage("비밀번호는 6자리 이상입니다.");
    }
  };

  const hadleModalChange = () => {
    link();
    onClose();
  };

  return (
    <>
      <div className="modalBox">
        <div className="modal" ref={modalRef}>
          <form className="inputTxt" onSubmit={handleSingUp}>
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
            <button>Sign Up</button>
            {message && <span>{message}</span>}
          </form>
          <p>
            이미 계정이 있습니까?
            <button onClick={hadleModalChange}>Login</button>
          </p>
        </div>
      </div>
    </>
  );
}

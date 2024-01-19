import React, { useRef, useState } from "react";
import "./Modal.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../../../firebase";
import useOutsideClick from "../../../hook/useOutsideClick";

export default function LoginModal({
  link,
  show,
  onClose,
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
}) {
  const modalRef = useRef();
  const [message, setMessage] = useState("");

  useOutsideClick(modalRef, onClose);

  if (!show) {
    return null;
  }

  const hadleModalChange = () => {
    link();
    onClose();
  };

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
      onClose();
    } catch (error) {
      return error && setMessage("이메일 또는 비밀번호가 잘못되었습니다.");
    }
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
              placeholder="6자리 이상 비밀번호"
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

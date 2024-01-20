import React, { useRef } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/authSlice";
import useOutsideClick from "../../../hook/useOutsideClick";

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
  const dispatch = useDispatch();
  const message = useSelector(state => state.auth.error);

  useOutsideClick(modalRef, () => {
    onClose();
    dispatch({ type: "auth/resetError" });
  });

  if (!show) {
    return null;
  }

  const hadleModalChange = () => {
    link();
    onClose();
    dispatch({ type: "auth/resetError" });
  };

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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

import React, { useEffect, useRef } from "react";
import "./Modal.css";
import useOutsideClick from "../../../hook/useOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { singUp } from "../../../../redux/authSlice";

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
  const dispatch = useDispatch();
  const message = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);

  useEffect(() => {
    if (success === "success") {
      link();
      onClose();
    }
  }, [success, link, onClose]);

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

  // 회원가입
  const handleSingUp = async (e) => {
    e.preventDefault();
    dispatch(singUp({ email, password }));
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
                placeholder="6자리 이상 비밀번호"
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

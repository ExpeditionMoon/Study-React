import React, { useRef, useState } from "react";
import "./Modal.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import useOutsideClick from "../../../hook/useOutsideClick";
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

  useOutsideClick(modalRef, onClose);

  if (!show) {
    return null;
  }

  const hadleModalChange = () => {
    setMessage("");
    link();
    onClose();
  };

  // 중복 이메일인지 확인
  const isEmail = (email) => {
    const saveEmails = localStorage.getItem("userEmails");
    if (!saveEmails) {
      return false;
    }
    const emails = JSON.parse(saveEmails);
    return emails.includes(email);
  };
  // 회원가입할 경우, 이메일 저장
  const saveEmailToLocalStorage = (email) => {
    const saveEmails = localStorage.getItem("userEmails");
    const emails = saveEmails ? JSON.parse(saveEmails) : [];
    emails.push(email);
    localStorage.setItem("userEmails", JSON.stringify(emails));
  };

  // 회원가입
  const handleSingUp = async (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      setMessage("이미 등록된 이메일입니다.");
      return;
    }

    const auth = getAuth(app);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      saveEmailToLocalStorage(email);
      setMessage("");
      link();
      onClose();
    } catch (error) {
      return error && setMessage("유효하지 않은 형식입니다.");
    }
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

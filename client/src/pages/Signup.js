import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
require("dotenv").config();

export const SignupBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: grid;
  place-items: center;
  height: 100vh;
`;
export const SignupView = styled.div`
  box-sizing: border-box;
  width: 45vh;
  height: 65vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
`;

export const SignupHeading = styled.h2``;

export const SignupInputContainer = styled.div`
  //   border: 1px solid black;
  //   text-align: left;
`;

export const SignupInputValue = styled.div`
  font-weight: bold;
  margin: 5px 0px 5px 0px;
`;

export const SignupInput = styled.input``;

export const SignupInputBirthyear = styled.select``;

export const SignupBtn = styled.button``;

export const Alertbox = styled.div``;

export const CheckInfo = styled.div`
  color: red;
  font-size: 11px;
  opacity: 0.8;
`;

function Signup({ handleModal }) {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    password: "",
    birthYear: "",
  });

  const [checkNickname, setCheckNickname] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const isValidNickname = (e) => {
    if (e.target.value.length >= 2 && e.target.value.length <= 15) {
      if (e.target.value.search(/\s/) !== -1) {
        setCheckNickname(false);
      } else {
        setCheckNickname(true);
      }
    } else {
      setCheckNickname(false);
    }
  };

  const isValidEmail = (e) => {
    let regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };
  const isValidPassword = (e) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regExp.test(e.target.value)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== "" && e.target.value === userInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };

  let yearList = [];
  let today = new Date();
  let year = today.getFullYear();
  for (let i = year; i >= 1921; i--) {
    yearList.push(i);
  }

  const handleSignupRequest = () => {
    if (
      userInfo.nickname === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.birthYear === "" ||
      checkNickname !== true ||
      checkEmail !== true ||
      checkPassword !== true ||
      checkRetypePassword !== true
    ) {
      setErrorMsg("모든 항목을 바르게 작성해주세요");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/signup`, userInfo, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            handleModal();
            window.location.replace("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setErrorMsg("이미 가입된 이메일입니다");
          }
        });
    }
  };

  const inputCheck = (key) => (e) => {
    handleInputValue(key)(e);
    if (key === "nickname") {
      isValidNickname(e);
    }
    if (key === "email") {
      isValidEmail(e);
    }
    if (key === "password") {
      isValidPassword(e);
    }
  };

  const closeModal = () => {
    handleModal();
    history.push("/");
  };

  return (
    <SignupBackdrop>
      <SignupView>
        <SignupHeading>SIGN UP </SignupHeading>
        <SignupInputContainer>
          <SignupInputValue>Nickname</SignupInputValue>
          <SignupInput onChange={inputCheck("nickname")} />
          <CheckInfo>
            {checkNickname ? null : "닉네임은 공백없이 2~15자 입니다"}
          </CheckInfo>
          <SignupInputValue>Email</SignupInputValue>
          <SignupInput onChange={inputCheck("email")} />
          <CheckInfo>
            {checkEmail ? null : "올바른 이메일 주소를 입력해주세요"}
          </CheckInfo>
          <SignupInputValue>Password</SignupInputValue>
          <SignupInput type="password" onChange={inputCheck("password")} />
          <CheckInfo>
            {checkPassword ? null : "올바른 비밀번호를 입력해주세요"}
          </CheckInfo>
          <SignupInputValue>Password Check</SignupInputValue>
          <SignupInput type="password" onChange={handleCheckPassword} />
          <CheckInfo>
            {checkRetypePassword ? null : "비밀번호가 일치하지 않습니다"}
          </CheckInfo>
          <SignupInputValue>Birth Year</SignupInputValue>
          <select onChange={handleInputValue("birthYear")}>
            {/* <option value="">-------</option> */}
            <option value="" selected disabled hidden>
              선택
            </option>
            {yearList.map((el, idx) => {
              return <option key={idx}>{el}</option>;
            })}
          </select>
        </SignupInputContainer>
        <SignupBtn onClick={handleSignupRequest}>Sign up</SignupBtn>
        <Alertbox>{errorMsg}</Alertbox>
        <button onClick={closeModal}>창닫기</button>
      </SignupView>
    </SignupBackdrop>
  );
}

export default Signup;

import styled from "styled-components";
import { useState } from "react";

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

function Signup() {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    password: "",
    birthyear: "",
  });
  console.log(userInfo);
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const isValidEmail = (e) => {
    let regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
    console.log("email :", regExp.test(e.target.value));
  };
  const isValidPassword = (e) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regExp.test(e.target.value)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
    console.log("password :", regExp.test(e.target.value));
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== "" && e.target.value === userInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };
  console.log(checkRetypePassword);

  return (
    <SignupBackdrop>
      <SignupView>
        <SignupHeading>SIGN UP </SignupHeading>
        <SignupInputContainer>
          <SignupInputValue>Nickname</SignupInputValue>
          <SignupInput onChange={handleInputValue("nickname")} />
          <SignupInputValue>Email</SignupInputValue>
          <SignupInput
            onChange={handleInputValue("email")}
            onBlur={isValidEmail}
          />
          <SignupInputValue>Password</SignupInputValue>
          <SignupInput
            type="password"
            onChange={handleInputValue("password")}
            onBlur={isValidPassword}
          />
          <SignupInputValue>Password Check</SignupInputValue>
          <SignupInput type="password" onChange={handleCheckPassword} />
          <SignupInputValue>Birth Year</SignupInputValue>
          {/* <SignupInputBirthyear /> */}
          <select>
            <option value="">-------</option>
          </select>
        </SignupInputContainer>
        <SignupBtn>Sign up</SignupBtn>
      </SignupView>
    </SignupBackdrop>
  );
}

export default Signup;

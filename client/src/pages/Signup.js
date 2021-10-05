import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { notify } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
require('dotenv').config();

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
  // font-size: 20px;
  padding-top: 10px;
  box-shadow: 10px 10px grey;
`;

export const SignupHeading = styled.h2``;

export const SignupInputContainer = styled.div`
  // border: 1px solid black;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SignupInputValue = styled.div`
  // font-weight: bold;
  margin: 10px 0px 5px 0px;
  // border: 1px solid black;
  width: 184px;
  position: relative;
  text-align: left;
`;

export const SignupInput = styled.input``;

export const Button = styled.button`
  margin: 0.4rem 0.4rem 0.1rem 0.4rem;
  cursor: pointer;
  font-family: 'NeoDunggeunmo';
  font-size: 15px;
`;

export const Alertbox = styled.div`
  color: red;
  font-family: 'NeoDunggeunmo';
  font-size: 15px;
  margin-top: 5px;
`;

export const CheckInfo = styled.div`
  color: red;
  font-size: 11px;
  opacity: 0.8;
`;

export const ButtonContainer = styled.div`
  margin: 10px;
`;

export const Select = styled.select`
  width: 185px;
  text-align: center;
  font-size: 15px;
`;

function Signup ({ handleModal, handleNotice, handleMessage }) {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    password: '',
    birthYear: '',
    kakao: false
  });

  const [checkNickname, setCheckNickname] = useState('');
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [checkEmail, setCheckEmail] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [code, setCode] = useState('');
  const [checkCode, setCheckCode] = useState(true);
  const notiState = useSelector((state) => state.notiReducer).notifications;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const isValidNickname = (e) => {
    const regExpSpec = /[~!@#$%^&*()_+|<>?:{}`=,.]/;
    const regExpKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    if (e.target.value.search(/\s/) !== -1) {
      setCheckNickname('공백을 포함하면 안됩니다');
    } else if (regExpKor.test(e.target.value)) {
      setCheckNickname('올바른 한글 형식을 따라주세요');
    } else if (regExpSpec.test(e.target.value)) {
      setCheckNickname('특수문자를 포함하면 안됩니다.');
    } else if (e.target.value.length < 2 || e.target.value.length > 15) {
      setCheckNickname('닉네임은 2-15자입니다');
    } else {
      setCheckNickname('ok');
    }
  };

  const isValidEmail = (e) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };
  const isValidPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    if (regExp.test(e.target.value)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== '' && e.target.value === userInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };

  const yearList = [];
  const today = new Date();
  const year = today.getFullYear();
  for (let i = year; i >= 1921; i--) {
    yearList.push(i);
  }

  const handleSignupRequest = () => {
    if (
      userInfo.nickname === '' ||
      userInfo.email === '' ||
      userInfo.password === '' ||
      userInfo.birthYear === '' ||
      code === '' ||
      checkNickname !== 'ok' ||
      checkEmail !== true ||
      checkPassword !== true ||
      checkRetypePassword !== true
    ) {
      setErrorMsg('모든 항목을 바르게 작성해주세요');
    } else if (checkCode !== true) {
      setErrorMsg('인증코드를 확인해주세요');
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/signup`, userInfo, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 201) {
            handleModal();
            handleNotice(true);
            handleMessage('회원가입 성공!');
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.message === 'conflict: email') {
            setErrorMsg('이미 가입된 이메일입니다');
          }
        });
    }
  };

  const inputCheck = (key) => (e) => {
    handleInputValue(key)(e);
    if (key === 'nickname') {
      isValidNickname(e);
    }
    if (key === 'email') {
      isValidEmail(e);
    }
    if (key === 'password') {
      isValidPassword(e);
    }
  };

  const emailRequest = () => {
    if (userInfo.email !== '') {
      axios
        .post(
          process.env.REACT_APP_API_URL + '/auth',
          { email: userInfo.email },
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        )
        .then((res) => {
          setCode(res.data);
        });
    } else {
      setErrorMsg('이메일 입력');
    }
  };

  const verifyCode = (e) => {
    if (code === Number(e.target.value)) {
      setCheckCode(true);
    } else {
      setCheckCode(false);
    }
  };

  return (
    <SignupBackdrop>
      <SignupView>
        <SignupHeading>회원가입</SignupHeading>
        <SignupInputContainer>
          <SignupInputValue>닉네임</SignupInputValue>
          <SignupInput
            onChange={inputCheck('nickname')}
            placeholder='공백 / 특수문자 제외 2-15자'
          />
          <CheckInfo>{checkNickname === 'ok' ? null : checkNickname}</CheckInfo>
          <SignupInputValue>이메일</SignupInputValue>
          <span>
            <SignupInput onChange={inputCheck('email')} placeholder='입력 후 인증을 눌러주세요' />
            <button
              onClick={emailRequest}
              style={{ fontFamily: 'NeoDunggeunmo', fontSize: '15px' }}
            >
              이메일 인증
            </button>
          </span>
          <CheckInfo>{checkEmail ? null : '올바른 이메일 주소를 입력해주세요'}</CheckInfo>
          <SignupInputValue>인증 코드</SignupInputValue>
          <SignupInput onChange={verifyCode} placeholder='메일로 받은 코드를 입력해주세요' />
          <CheckInfo>{checkCode ? null : '코드가 일치하지 않습니다'}</CheckInfo>
          <SignupInputValue>비밀번호</SignupInputValue>
          <SignupInput
            type='password'
            onChange={inputCheck('password')}
            placeholder='영문 / 숫자 조합 8~10자'
          />
          <CheckInfo>{checkPassword ? null : '올바른 비밀번호를 입력해주세요'}</CheckInfo>
          <SignupInputValue>비밀번호확인</SignupInputValue>
          <SignupInput type='password' onChange={handleCheckPassword} />
          <CheckInfo>{checkRetypePassword ? null : '비밀번호가 일치하지 않습니다'}</CheckInfo>
          <SignupInputValue>Birth Year</SignupInputValue>
          <Select onChange={handleInputValue('birthYear')}>
            <option value='' selected disabled hidden>
              선택
            </option>
            {yearList.map((el, idx) => {
              return <option key={idx}>{el}</option>;
            })}
          </Select>
        </SignupInputContainer>
        <ButtonContainer>
          <Button onClick={handleSignupRequest}>회원가입</Button>
          <Button onClick={handleModal}>창닫기</Button>
        </ButtonContainer>
        <Alertbox>{errorMsg}</Alertbox>
      </SignupView>
    </SignupBackdrop>
  );
}

export default Signup;

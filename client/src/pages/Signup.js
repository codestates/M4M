import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { media } from '../components/utils/_media-queries';
import { Colors } from '../components/utils/_var';
import m4mlogo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
  height: 100%x;
`;
export const SignupView = styled.div`
  box-sizing: border-box;
  width: 20;
  height: 25rem;
  ${media.tabletMini`width: 22rem; height: 27rem;`}
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  padding-top: .7rem;
  box-shadow: 10px 10px grey;

  .logo {
    width: 6rem;
    margin: .5rem auto;
  }
`;

export const CloseIcon = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
`;

export const SignupInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 60%;
`;

export const SignupInput = styled.input`
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  width: 70%;
  height: 11%;
  padding: .7rem;
  color: ${Colors.darkGray};
  :focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: .75rem;
  }
`;

export const SignupButton = styled.button`
  margin: 0 .4rem .1rem .4rem;
  cursor: pointer;
  /* font-family: 'Arial'; */
  font-size: .9rem;
  background-color: ${Colors.pastelPurple};
  width: 11.5rem;
  height: 2.2rem;
  border-radius: 7px;
  border: none;
  color: white;
  :hover {
    background-color: ${Colors.purple};
  }
`;

export const Alertbox = styled.div`
  color: red;
  margin-top: .5rem;
  /* font-family: 'Arial'; */
  font-size: .85rem;
`;

export const CheckInfo = styled.div`
  color: red;
  font-size: 11px;
  /* font-family: 'Arial'; */
  opacity: .7;
`;

export const ButtonContainer = styled.div`
  margin: .8rem 0 0;
`;

export const Select = styled.select`
  width: 70%;
  height: 11%;
  padding-left: .4rem;
  text-align: left;
  font-size: 12.5px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  opacity: .5;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export const VerifyButton = styled.button`
  margin: 0 .4rem .1rem .4rem;
  cursor: pointer;
  /* font-family: 'Arial'; */
  font-size: 14px;
  background-color: ${Colors.pastelPurple};
  background-color: transparent;
  border: none;
  color: white;
  font-size: .75rem;
  padding: 0;
  text-decoration: underline;
  color: ${Colors.gray};
  :hover {
    color: ${Colors.purple};
    border-color: ${Colors.purple};
  }
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

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const isValidNickname = (e) => {
    const regExpSpec = /[~!@#$%^&*()_+|<>?:{}`=,.]/;
    const regExpKor = /[???-???|???-???]/;
    if (e.target.value.search(/\s/) !== -1) {
      setCheckNickname('????????? ???????????? ????????????');
    } else if (regExpKor.test(e.target.value)) {
      setCheckNickname('????????? ?????? ????????? ???????????????');
    } else if (regExpSpec.test(e.target.value)) {
      setCheckNickname('??????????????? ???????????? ????????????.');
    } else if (e.target.value.length < 2 || e.target.value.length > 8) {
      setCheckNickname('???????????? 2-8????????????');
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
      setErrorMsg('?????? ????????? ????????? ??????????????????');
    } else if (checkCode !== true) {
      setErrorMsg('??????????????? ??????????????????');
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
            handleMessage('???????????? ??????!');
          }
        })
        .catch((error) => {
          if (error.response.data.message === 'conflict: email') {
            setErrorMsg('?????? ????????? ??????????????????');
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
    if (userInfo.email !== '' && checkEmail === true) {
      axios
        .post(
          process.env.REACT_APP_API_URL + '/auth',
          { email: userInfo.email },
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        )
        .then((res) => {
          setCode(res.data);
          setErrorMsg('????????? ?????? ???????????? ?????????????????? ??????????????????');
        })
        .catch((error) => {
          if (error.response.data.message === 'conflict: email') {
            setErrorMsg('?????? ????????? ??????????????????');
          } else console.log(error.response);
        });
    } else {
      setErrorMsg('????????? ???????????? ??????????????????');
    }
  };

  const verifyCode = (e) => {
    // console.log(code === Number(e.target.value));
    if (code === Number(e.target.value)) {
      setCheckCode(true);
    } else {
      setCheckCode(false);
    }
  };

  return (
    <SignupBackdrop>
      <SignupView>
        <CloseIcon>
          <FontAwesomeIcon icon={faTimes} color={Colors.gray} onClick={handleModal} />
        </CloseIcon>
        <img className='logo' src={m4mlogo} alt='logo' />
        <SignupInputContainer>
          <SignupInput onChange={inputCheck('nickname')} placeholder='?????????' />
          <CheckInfo>{checkNickname === 'ok' ? null : checkNickname}</CheckInfo>
          <SignupInput onChange={inputCheck('email')} placeholder='?????????' />
          <CheckInfo>{checkEmail ? '  ' : '????????? ????????? ????????? ??????????????????'}</CheckInfo>
          <VerifyButton onClick={emailRequest}>????????? ??????</VerifyButton>
          <SignupInput onChange={verifyCode} placeholder='????????? ?????? ??????' />
          <CheckInfo>{checkCode ? null : '????????? ???????????? ????????????'}</CheckInfo>
          <SignupInput type='password' onChange={inputCheck('password')} placeholder='????????????' />
          <CheckInfo>{checkPassword ? null : '????????? ??????????????? ??????????????????'}</CheckInfo>
          <SignupInput type='password' onChange={handleCheckPassword} placeholder='???????????? ??????' />
          <CheckInfo>{checkRetypePassword ? null : '??????????????? ???????????? ????????????'}</CheckInfo>
          <Select onChange={handleInputValue('birthYear')}>
            <option
              value=''
              selected
              disabled
              hidden
              style={{ fontWeight: 'bold', borderRadius: '10px' }}
            >
              ????????????
            </option>
            {yearList.map((el, idx) => {
              return (
                <option key={idx} style={{ fontWeight: 'bold', borderRadius: '10px' }}>
                  {el}
                </option>
              );
            })}
          </Select>
        </SignupInputContainer>
        <ButtonContainer>
          <SignupButton onClick={handleSignupRequest}>????????????</SignupButton>
        </ButtonContainer>
        <Alertbox>{errorMsg}</Alertbox>
      </SignupView>
    </SignupBackdrop>
  );
}

export default Signup;

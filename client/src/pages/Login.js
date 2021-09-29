import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import kakaoImage from '../kakao_login_medium_narrow.png';
import { useDispatch } from 'react-redux';
import { notify, userLogin } from '../redux/action';
require('dotenv').config();
const { Kakao } = window;

export const LoginBackdrop = styled.div`
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
export const LoginView = styled.div`
  box-sizing: border-box;
  width: 45vh;
  height: 65vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
`;

export const LoginInputContainer = styled.div``;

export const LoginHeading = styled.h2``;

export const LoginInputValue = styled.div`
  //   font-weight: bold;
  margin: 5px 0px 5px 0px;
`;

export const LoginInput = styled.input``;

export const Alertbox = styled.div``;

export const LoginBtn = styled.button``;

function Login({ handleModal }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLoginRequest = () => {
    if (loginInfo.email === '' || loginInfo.password === '') {
      setErrorMsg('이메일과 비밀번호를 입력해주세요');
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, loginInfo, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then((res) => {
          dispatch(notify('로그인 성공!'));
          localStorage.setItem('accessToken', res.data.accessToken);
          history.push('/mainpage');
          //   window.location.replace('/mainpage');
          return res.data.accessToken;
        })
        .then((token) => {
          axios
            .get(process.env.REACT_APP_API_URL + '/user-info', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
            .then((res) => {
              dispatch(userLogin(res.data.data, token));
              localStorage.setItem('userinfo', JSON.stringify(res.data.data));
            });
        })
        .catch((error) => {
          console.log('error :', error.response);
        });
    }
  };

  const enter = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      handleLoginRequest();
    }
  };

  const closeModal = () => {
    handleModal();
    history.goBack();
  };

  const kakaoLogin = () => {
    Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: (res) => {
        localStorage.setItem('kakaoToken', res.access_token);
        Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            const data = {
              nickname: res.kakao_account.profile.nickname,
              email: res.id.toString(),
              password: null,
              birthYear: null,
              kakao: true
            };
            axios
              .post(process.env.REACT_APP_API_URL + '/signup', data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              })
              .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken);
                dispatch(userLogin(res));
                history.push('/mainpage');
                return res.data.accessToken;
              })
              .then((token) => {
                axios
                  .get(process.env.REACT_APP_API_URL + '/user-info', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  })
                  .then((res) => {
                    localStorage.setItem(
                      'userinfo',
                      JSON.stringify(res.data.data)
                    );
                  });
              })
              .catch((err) => console.log(err.response));
          }
        });
      }
    });
  };

  return (
    <LoginBackdrop>
      <LoginView>
        <LoginHeading>로그인</LoginHeading>
        <LoginInputContainer>
          <LoginInputValue>이메일</LoginInputValue>
          <LoginInput onChange={handleInputValue('email')}></LoginInput>
          <LoginInputValue>비밀번호</LoginInputValue>
          <LoginInput
            type="password"
            onChange={handleInputValue('password')}
            onKeyPress={(e) => {
              enter(e);
            }}></LoginInput>
        </LoginInputContainer>
        <Alertbox>{errorMsg}</Alertbox>
        <LoginBtn onClick={handleLoginRequest}>로그인</LoginBtn>
        <button onClick={closeModal}>창닫기</button>
        <a onClick={kakaoLogin}>
          <img src={kakaoImage}></img>
        </a>
      </LoginView>
    </LoginBackdrop>
  );
}

export default Login;

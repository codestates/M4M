import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
// import kakaoImage from '../images/kakao_login_medium_narrow.png';
import kakaoLogo from '../images/kakao_logo.png';
import { useDispatch } from 'react-redux';
import { notify, userLogin } from '../redux/action';
import { media } from '../components/utils/_media-queries';
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
  height: 45vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
  padding-top: 10px;
  box-shadow: 10px 10px grey;
`;

export const LoginInputContainer = styled.div``;

export const LoginHeading = styled.h2``;

export const LoginInputValue = styled.div`
  //   font-weight: bold;
  margin: 10px 0px 5px 0px;
`;

export const LoginInput = styled.input``;

export const Alertbox = styled.div`
  color: red;
  font-family: 'NeoDunggeunmo';
  font-size: 15px;
  margin-top: 10px;
`;

export const Button = styled.button`
  margin: 0rem 0.4rem 0.1rem 0.4rem;
  cursor: pointer;
  font-family: 'NeoDunggeunmo';
`;

export const ButtonContainer = styled.div`
  margin: 10px;
`;

export const KakaoButton = styled.div`
  width: 11.5rem;
  height: 2.5rem;
  margin: .8rem auto;
  padding: .7rem .2rem .7rem 0;
  background-color: #FEE500;
  border-radius: 7px;
  border: none;

  &:hover {
    cursor: pointer;
  }

  img {
    vertical-align: middle;
    margin-right: 1.6rem;
  }
`;

export const KakaoContent = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: auto 1.8rem auto 0;
  font-family: 'Arial';
  font-size: .75rem;
  ${media.tablet`font-size: .85rem;`}
  color: #000000 85%;
`;

function Login ({ handleModal, signup }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState(' ');
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
          localStorage.setItem('accessTokenTime', new Date().getTime());
          history.push('/mainpage');
          handleModal();
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
          if (error.response.data.message === 'please check your password and try again') {
            setErrorMsg('잘못된 비밀번호입니다');
          }
          if (error.response.data.message === 'Invalid user') {
            setErrorMsg('등록되지 않은 이메일입니다');
          }
          console.log('error :', error.response.data.message);
        });
    }
  };

  const enter = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      handleLoginRequest();
    }
  };

  const kakaoLogin = () => {
    Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: (res) => {
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
                localStorage.setItem('accessTokenTime', new Date().getTime());
                dispatch(notify('로그인 성공!'));
                history.push('/mainpage');
                handleModal();
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
              .catch((err) => console.log(err.response));
          }
        });
      }
    });
  };

  const goSignup = () => {
    handleModal();
    signup();
  };

  return (
    <LoginBackdrop>
      <LoginView>
        <LoginHeading>로그인</LoginHeading>
        <LoginInputContainer>
          <LoginInputValue>이메일</LoginInputValue>
          <LoginInput onChange={handleInputValue('email')} />
          <LoginInputValue>비밀번호</LoginInputValue>
          <LoginInput
            type='password'
            onChange={handleInputValue('password')}
            onKeyPress={(e) => {
              enter(e);
            }}
          />
        </LoginInputContainer>
        <ButtonContainer>
          <Button onClick={handleLoginRequest}>로그인</Button>
          <Button onClick={handleModal}>창닫기</Button>
        </ButtonContainer>
        <KakaoButton onClick={kakaoLogin}>
          {/* <img
            src={kakaoImage}
            style={{ width: '140px', cursor: 'pointer' }}
            onClick={kakaoLogin}
          /> */}
          <img src={kakaoLogo} alt='kakao-logo' width='20px' />
          <KakaoContent>카카오 로그인</KakaoContent>
        </KakaoButton>
        <div style={{ marginTop: '5px' }}>
          <span style={{ fontSize: '13px', marginTop: '10px' }}>아직 회원이 아니신가요? </span>
          <span
            style={{ fontSize: '13px', marginTop: '10px', color: 'blue', cursor: 'pointer' }}
            onClick={goSignup}
          >
            회원가입
          </span>
        </div>
        <Alertbox>{errorMsg}</Alertbox>
      </LoginView>
    </LoginBackdrop>
  );
}

export default Login;

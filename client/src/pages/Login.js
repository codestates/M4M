import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
// import kakaoImage from '../images/kakao_login_medium_narrow.png';
import kakaoLogo from '../images/kakao_logo.png';
// import m4mlogo from '../images/m4mlogo4.png';
import m4mlogo from '../images/logo.png';
import { useDispatch } from 'react-redux';
import { notify, userLogin } from '../redux/action';
import { media } from '../components/utils/_media-queries';
import { Colors } from '../components/utils/_var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

require('dotenv').config();
const { Kakao } = window;
axios.defaults.withCredentials = true;

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
  height: 100%;
`;

export const LoginView = styled.div`
  box-sizing: border-box;
  width: 19rem;
  height: 21rem;
  ${media.tabletMini`width: 20rem; height: 22.5rem;`}
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  padding-top: .7rem;
  box-shadow: 10px 10px grey;

  .logo {
    width: 6rem;
    margin: .7rem auto;
  }

  .signup {
    font-size: .85rem;
    margin: .9rem .4rem 0 0;
    font-family: 'Arial';
    color: ${Colors.gray};
  }
`;

export const CloseIcon = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
`;

<<<<<<< HEAD
export const LoginHeading = styled.h2`
  font-family: 'NeoDunggeunmo';
`;

export const LoginInputValue = styled.div`
  //   font-weight: bold;
  margin: 10px 0px 5px 0px;
  font-family: 'NeoDunggeunmo';
`;

export const LoginInput = styled.input`
  //   font-family: 'NeoDunggeunmo';
`;
=======
export const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 30%;
`;

export const LoginInput = styled.input`
  background-color: #f2f2f2;
  border: none;
  border-radius: 15px;
  width: 70%;
  height: 32%;
  padding: .8rem;
  color: ${Colors.darkGray};
  :focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: 12px;
  }
`;

function blinkEffect () {
  return keyframes`
  50% {
    opacity:0;
  }
  `;
}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822

export const Alertbox = styled.div`
  color: red;
  font-family: 'Arial';
  font-size: .9rem;
  margin-top: .8rem;
`;

export const LoginButton = styled.button`
  margin: .2rem .4rem 0;
  cursor: pointer;
<<<<<<< HEAD
  font-family: 'NeoDunggeunmo';
  font-size: 16px;
=======
  font-family: 'Arial';
  font-size: .9rem;
  ${media.tablet`font-size: .9rem;`}
  background-color: #caa6fe;
  width: 12.2rem;
  height: 2.5rem;
  border-radius: 7px;
  border: none;
  color: white;
  :hover {
    background-color: #9c57ff;
  }
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
`;

export const ButtonContainer = styled.div`
  // margin: 10px;
  // border: 1px solid black;
`;

export const KakaoButton = styled.div`
  width: 12.2rem;
  height: 2.5rem;
  margin: .6rem auto;
  padding: .7rem .2rem .7rem 0;
  background-color: #fee500;
  border-radius: 7px;
  border: none;

  &:hover {
    cursor: pointer;
    background-color: #ffd500;
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
  font-size: .9rem;
  ${media.tablet`font-size: .9rem;`}
  color: #000000 85%;
`;

<<<<<<< HEAD
=======
export const SignupSpan = styled.span`
  font-size: .85rem;
  color: #9c57ff;
  cursor: pointer;
  font-family: 'Arial';
  /* font-weight: bold; */
  :hover {
    color: #7b3cd6;
  }
`;

>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
function Login ({ handleModal, signup, handleMessage, handleNotice }) {
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
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('accessTokenTime', new Date().getTime());
          handleModal();
          handleNotice(true);
          handleMessage('로그인 성공!');
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
                handleModal();
                handleNotice(true);
                handleMessage('로그인 성공!');
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
        <CloseIcon>
          <FontAwesomeIcon icon={faTimes} color={Colors.gray} onClick={handleModal} />
        </CloseIcon>
        {/* <img src={m4mlogo} style={{ width: '200px' }} /> */}
        <img className='logo' src={m4mlogo} />
        <LoginInputContainer>
          <LoginInput onChange={handleInputValue('email')} placeholder='이메일' />
          <LoginInput
            type='password'
            onChange={handleInputValue('password')}
            onKeyPress={(e) => {
              enter(e);
            }}
            placeholder='비밀번호'
          />
        </LoginInputContainer>
        <ButtonContainer>
          <LoginButton onClick={handleLoginRequest}>로그인</LoginButton>
        </ButtonContainer>
        <KakaoButton onClick={kakaoLogin}>
          <img src={kakaoLogo} alt='kakao-logo' width='20px' />
          <KakaoContent>카카오 로그인</KakaoContent>
        </KakaoButton>
        <span className='signup'>
          아직 회원이 아니신가요?
        </span>
        <SignupSpan onClick={goSignup}>회원가입</SignupSpan>
        <Alertbox>{errorMsg}</Alertbox>
      </LoginView>
    </LoginBackdrop>
  );
}

export default Login;

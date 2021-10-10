import styled from 'styled-components';
import { LoginButton, ButtonContainer, CloseButton } from '../pages/Login';
import m4mlogo from '../images/m4mlogo4.png';
<<<<<<< HEAD
=======
import axios from 'axios';
import { changeHeader, userEdit } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { media } from '../components/utils/_media-queries';
import { Colors } from '../components/utils/_var';
import { useEffect } from 'react';
require('dotenv').config();
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822

export const NoticeBackdrop = styled.div`
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
<<<<<<< HEAD
export const NoticeView = styled.div`
  box-sizing: border-box;
  width: 35vh;
  height: 18vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
  padding-top: 10px;
  box-shadow: 10px 10px grey;
`;

export const NoticeButton = styled.button`
  margin-top: 0.4rem;
  background-color: #caa6fe;
  border: none;
  border-radius: 10px;
  width: 7rem;
  height: 1.7rem;
  font-size: 15px;
  font-family: 'Arial';
  font-weight: bold;
=======

export const NoticeView = styled.div`
  box-sizing: border-box;
  position: relative;
  text-align: center;
  width: 15.5rem;
  height: 9.2rem;
  ${media.tabletMini`width: 16rem; height: 9.5rem;`}
  ${media.tablet`width: 16.5rem; height: 9.5rem;`}
  background-color: rgb(255, 255, 255);
  color: ${Colors.darkGray};
  box-shadow: 10px 10px grey;
  padding: .8rem;
`;

export const Message = styled.div`
  margin-top: ${props => props.topMargin};
  font-family: 'Arial';
  font-size: 1rem;
`;

export const NoticeButton = styled.button`
  margin-top: 1rem;
  background-color: #caa6fe;
  border: none;
  border-radius: 10px;
  width: 6.5rem;
  height: 1.7rem;
  font-size: .85rem;
  ${media.tabletMini`font-size: 1rem; width: 7rem;`}
  font-family: 'Arial';
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  color: white;
  cursor: pointer;
  :hover {
    background-color: #9c57ff;
  }
`;

export const NoticeClose = styled.button`
<<<<<<< HEAD
  background-color: white;
  border: none;
  margin-top: 0.4rem;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  color: grey;
  :hover {
    color: black;
  }
`;

function Notice ({ message, login, handleNotice }) {
  return (
    <NoticeBackdrop>
      <NoticeView>
        <img src={m4mlogo} style={{ width: '90px' }} />
        <div
          style={{ marginTop: '5px', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}
        >
          {message}
        </div>
=======
  margin-top: 1rem;
  background-color: #caa6fe;
  border: none;
  border-radius: 10px;
  width: 7rem;
  height: 1.7rem;
  font-size: 1rem;
  font-family: 'Arial';
  color: white;
  cursor: pointer;
  :hover {
    background-color: #9c57ff;
  }
`;

export const CloseIcon = styled.div`
  display: flex;
  justify-content: right;
  padding-bottom: .5rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

function Notice ({ message, login, handleNotice, handleMessage }) {
  useEffect(() => {
    const closeModal = (e) => {
      if (e.keyCode === 27) {
        handleNotice(false);
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

  const token = useSelector((state) => state.userReducer).token;

  const withdrawalRequest = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + '/withdrawal', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      .then((res) => {
        if (res.status === 200) {
          handleNotice(true);
          handleMessage('회원탈퇴가 완료되었습니다');
          localStorage.clear();
        }
      });
  };

  return (
    <NoticeBackdrop>
      <NoticeView>
        <CloseIcon>
          <FontAwesomeIcon
            icon={faTimes}
            color={Colors.gray}
            onClick={() => {
              handleNotice(false);
            }}
          />
        </CloseIcon>
        <Message topMargin={message === '정말 탈퇴 하시겠습니까?' ? '.5rem' : '1rem'}>
          {message}
        </Message>
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
        <ButtonContainer>
          {message === '로그인이 필요한 서비스입니다.'
            ? (
              <div>
                <div>
                  <NoticeButton
                    onClick={() => {
                      handleNotice(false);
                      login();
                    }}
                  >
                    로그인
                  </NoticeButton>
                </div>
<<<<<<< HEAD
                <div>
                  <NoticeClose
                    onClick={() => {
                      handleNotice(false);
                    }}
                  >
                    창닫기
                  </NoticeClose>
                </div>
=======
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
              </div>
              )
            : message === '로그인 성공!' ||
            message === '로그아웃 성공!' ||
            message === '회원가입 성공!' ||
<<<<<<< HEAD
            message === '회원탈퇴가 완료되었습니다.'
=======
            message === '회원탈퇴가 완료되었습니다'
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
              ? (
                <NoticeButton
                  onClick={() => {
                    window.location.replace('/mainpage');
                  }}
                >
                  메인화면으로
                </NoticeButton>
                )
              : message === '출생년도 등록이 필요한 서비스입니다.'
                ? (
                  <>
<<<<<<< HEAD
                    <NoticeButton
                      onClick={() => {
                        window.location.replace('/myinfo');
                      }}
                    >
                      마이페이지로
                    </NoticeButton>
                    <NoticeClose
                      onClick={() => {
                        handleNotice(false);
                      }}
                    >
                      창닫기
                    </NoticeClose>
                  </>
                  )
                : (
                  <NoticeClose
                    onClick={() => {
                      handleNotice(false);
                    }}
                  >
                    창닫기
                  </NoticeClose>
                  )}
=======
                    <div>
                      <NoticeButton
                        onClick={() => {
                          window.location.replace('/myinfo');
                        }}
                      >
                        마이페이지로
                      </NoticeButton>
                    </div>
                  </>
                  )
                : message === '회원정보가 수정되었습니다.'
                  ? (
                    <NoticeClose
                      onClick={() => {
                        window.location.replace('/myinfo');
                      }}
                    >
                      확인
                    </NoticeClose>
                    )
                  : message === '정말 탈퇴 하시겠습니까?'
                    ? (
                      <div>
                        <div>
                          <NoticeButton onClick={withdrawalRequest}>탈퇴하기</NoticeButton>
                        </div>
                      </div>
                      )
                    : (
                        null
                      )}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
        </ButtonContainer>
      </NoticeView>
    </NoticeBackdrop>
  );
}

export default Notice;

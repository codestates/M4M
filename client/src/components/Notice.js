import styled from 'styled-components';
import { LoginButton, ButtonContainer, CloseButton } from '../pages/Login';
import m4mlogo from '../images/m4mlogo4.png';
import axios from 'axios';
import { changeHeader, userEdit } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
require('dotenv').config();

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
  color: white;
  cursor: pointer;
  :hover {
    background-color: #9c57ff;
  }
`;

export const NoticeClose = styled.button`
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

function Notice({ message, login, handleNotice, handleMessage }) {
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
        <img src={m4mlogo} style={{ width: '90px' }} />
        <div
          style={{ marginTop: '5px', fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>
          {message}
        </div>
        <ButtonContainer>
          {message === '로그인이 필요한 서비스입니다.' ? (
            <div>
              <div>
                <NoticeButton
                  onClick={() => {
                    handleNotice(false);
                    login();
                  }}>
                  로그인
                </NoticeButton>
              </div>
              <div>
                <NoticeClose
                  onClick={() => {
                    handleNotice(false);
                  }}>
                  창닫기
                </NoticeClose>
              </div>
            </div>
          ) : message === '로그인 성공!' ||
            message === '로그아웃 성공!' ||
            message === '회원가입 성공!' ||
            message === '회원탈퇴가 완료되었습니다' ? (
            <NoticeButton
              onClick={() => {
                window.location.replace('/mainpage');
              }}>
              메인화면으로
            </NoticeButton>
          ) : message === '출생년도 등록이 필요한 서비스입니다.' ? (
            <>
              <NoticeButton
                onClick={() => {
                  window.location.replace('/myinfo');
                }}>
                마이페이지로
              </NoticeButton>
              <NoticeClose
                onClick={() => {
                  handleNotice(false);
                }}>
                창닫기
              </NoticeClose>
            </>
          ) : message === '회원정보가 수정되었습니다.' ? (
            <NoticeClose
              onClick={() => {
                window.location.replace('/myinfo');
              }}>
              확인
            </NoticeClose>
          ) : message === '정말 회원탈퇴 하시겠습니까...?' ? (
            <div>
              <div>
                <NoticeButton onClick={withdrawalRequest}>탈퇴하기</NoticeButton>
              </div>
              <div>
                <NoticeClose
                  onClick={() => {
                    handleNotice(false);
                  }}>
                  창닫기
                </NoticeClose>
              </div>
            </div>
          ) : (
            <NoticeClose
              onClick={() => {
                handleNotice(false);
              }}>
              창닫기
            </NoticeClose>
          )}
        </ButtonContainer>
      </NoticeView>
    </NoticeBackdrop>
  );
}

export default Notice;

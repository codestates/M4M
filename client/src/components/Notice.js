import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { media } from '../components/utils/_media-queries';
import { Colors } from '../components/utils/_var';
import { useEffect } from 'react';
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
  /* font-family: 'Arial'; */
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
  ${media.tabletMini`font-size: .9rem; width: 7rem;`}
  /* font-family: 'Arial'; */
  color: white;
  cursor: pointer;
  :hover {
    background-color: #9c57ff;
  }
`;

export const NoticeClose = styled.button`
  margin-top: 1rem;
  background-color: #caa6fe;
  border: none;
  border-radius: 10px;
  width: 7rem;
  height: 1.7rem;
  font-size: 1rem;
  /* font-family: 'Arial'; */
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
          handleMessage('??????????????? ?????????????????????.');
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
        <Message
          topMargin={
            message === '?????? ?????? ???????????????????' ||
            message === '???????????? ????????? ??????????????????.' ||
            message === '????????? ??????!' ||
            message === '???????????? ??????!' ||
            message === '???????????? ??????!' ||
            message === '??????????????? ?????????????????????.'
              ? '.4rem'
              : message === '???????????? ????????? ????????? ??????????????????.'
                ? '.3rem'
                : '1rem'
          }
        >
          {message}
        </Message>
        {message === '???????????? ????????? ??????????????????.'
          ? (
            <div>
              <div>
                <NoticeButton
                  onClick={() => {
                    handleNotice(false);
                    login();
                  }}
                >
                  ?????????
                </NoticeButton>
              </div>
            </div>
            )
          : message === '????????? ??????!' ||
          message === '???????????? ??????!' ||
          message === '???????????? ??????!' ||
          message === '??????????????? ?????????????????????.'
            ? (
              <NoticeButton
                onClick={() => {
                  window.location.replace('/mainpage');
                }}
              >
                ??????????????????
              </NoticeButton>
              )
            : message === '???????????? ????????? ????????? ??????????????????.'
              ? (
                <div>
                  <NoticeButton
                    onClick={() => {
                      window.location.replace('/myinfo');
                    }}
                  >
                    ??????????????????
                  </NoticeButton>
                </div>
                )
              : message === '??????????????? ?????????????????????.'
                ? (
                  <NoticeClose
                    onClick={() => {
                      window.location.replace('/myinfo');
                    }}
                  >
                    ??????
                  </NoticeClose>
                  )
                : message === '?????? ?????? ???????????????????'
                  ? <NoticeButton onClick={withdrawalRequest}>????????????</NoticeButton>
                  : null}
      </NoticeView>
    </NoticeBackdrop>
  );
}

export default Notice;

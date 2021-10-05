import styled from 'styled-components';
import { ButtonContainer } from '../pages/Login';
import { NoticeButton, NoticeClose } from './Notice';
import m4mlogo from '../images/m4mlogo4.png';

export const ModalBackdrop = styled.div`
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
export const ModalView = styled.div`
  box-sizing: border-box;
  width: 40vh;
  height: 18vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
  padding-top: 10px;
  box-shadow: 10px 10px grey;
`;

function Modal({ handleModal, login }) {
  const goLogin = () => {
    handleModal();
    login();
  };

  const logout = () => {
    localStorage.clear();
    handleModal();
    window.location.replace('/mainpage');
  };

  return (
    <ModalBackdrop>
      <ModalView>
        <img src={m4mlogo} style={{ width: '90px' }} />
        <div
          style={{ marginTop: '5px', fontSize: '17px', fontFamily: 'Arial', fontWeight: 'bold' }}>
          [토큰 만료] 다시 로그인 하시겠습니까?
        </div>
        <ButtonContainer>
          <NoticeButton onClick={goLogin}>로그인</NoticeButton>
        </ButtonContainer>
        <NoticeClose onClick={logout}>로그아웃</NoticeClose>
      </ModalView>
    </ModalBackdrop>
  );
}

export default Modal;

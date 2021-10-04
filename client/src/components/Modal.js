import styled from 'styled-components';
import { Button, ButtonContainer } from '../pages/Login';

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
  height: 15vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
  padding-top: 10px;
  box-shadow: 10px 10px grey;
`;

function Modal ({ handleModal, login }) {
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
        <div style={{ marginTop: '25px', fontSize: '17px' }}>
          토큰이 만료되었습니다
          <br />
          다시 로그인 하시겠습니까?
        </div>
        <ButtonContainer>
          <Button onClick={goLogin}>로그인</Button>
          <Button onClick={logout}>로그아웃</Button>
        </ButtonContainer>
      </ModalView>
    </ModalBackdrop>
  );
}

export default Modal;

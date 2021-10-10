import styled from 'styled-components';
import { NoticeButton } from './Notice';
import { media } from '../components/utils/_media-queries';
import { Colors } from '../components/utils/_var';

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
  background-color: white;
  position: relative;
  text-align: center;
  color: ${Colors.darkGray};
  padding-top: 1.1rem;
  width: 15.5rem;
  height: 9.2rem;
  ${media.tabletMini`width: 16rem; height: 9.5rem; padding-top: 1.2rem;`}
  ${media.tablet`width: 16.5rem; height: 9.5rem;`}
  box-shadow: 10px 10px grey;

  .content {
    margin: .4rem auto .2rem;
    padding: auto .3rem;
    font-size: .85rem;
    ${media.tabletMini`font-size: .9rem;`}
    ${media.tablet`font-size: 1rem;`}
    font-family: Arial;
  }
`;

export const LogOutButton = styled.button`
  margin-top: .5rem;
  background-color: ${Colors.mediumGray};
  border: none;
  border-radius: 10px;
  width: 6.5rem;
  height: 1.7rem;
  font-size: .85rem;
  ${media.tabletMini`font-size: 1rem; width: 7rem;`}
  font-family: 'Arial';
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${Colors.black};
  }
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
        <div className='content'>
          [토큰 만료] 다시 로그인 하시겠습니까?
        </div>
          <NoticeButton onClick={goLogin}>로그인</NoticeButton>
        <LogOutButton onClick={logout}>로그아웃</LogOutButton>
      </ModalView>
    </ModalBackdrop>
  );
}

export default Modal;

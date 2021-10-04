import styled from 'styled-components';
import { Button, ButtonContainer } from '../pages/Login';

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
  height: 15vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
  padding-top: 10px;
  box-shadow: 10px 10px grey;
`;

function Notice({ message, login, handleNotice }) {
  return (
    <NoticeBackdrop>
      <NoticeView>
        <div style={{ marginTop: '35px' }}>{message}</div>
        <ButtonContainer>
          {message === '로그인이 필요한 서비스입니다.' ? (
            <>
              <Button
                onClick={() => {
                  handleNotice(false);
                  login();
                }}>
                로그인
              </Button>
              <Button
                onClick={() => {
                  handleNotice(false);
                }}>
                창닫기
              </Button>
            </>
          ) : message === '로그인 성공!' ||
            message === '로그아웃 성공!' ||
            message === '회원탈퇴가 완료되었습니다.' ? (
            <Button
              onClick={() => {
                window.location.replace('/mainpage');
              }}>
              메인화면으로
            </Button>
          ) : message === '출생년도 등록이 필요한 서비스입니다.' ? (
            <>
              <Button
                onClick={() => {
                  window.location.replace('/myinfo');
                }}>
                마이페이지로
              </Button>
              <Button
                onClick={() => {
                  handleNotice(false);
                }}>
                창닫기
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                handleNotice(false);
              }}>
              창닫기
            </Button>
          )}
        </ButtonContainer>
      </NoticeView>
    </NoticeBackdrop>
  );
}

export default Notice;

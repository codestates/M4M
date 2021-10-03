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
  width: 40vh;
  height: 15vh;
  background-color: rgb(255, 255, 255);
  position: relative;
  text-align: center;
  //   font-size: 20px;
  padding-top: 10px;
  box-shadow: 10px 10px grey;
`;

function Notice({ message }) {
  return (
    <NoticeBackdrop>
      <NoticeView>
        <div>{message}</div>
        <Button
          onClick={() => {
            window.location.replace('/mainpage');
          }}>
          메인화면으로
        </Button>
      </NoticeView>
    </NoticeBackdrop>
  );
}

export default Notice;

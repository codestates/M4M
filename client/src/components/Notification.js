import styled from 'styled-components';
import { useSelector } from 'react-redux';

const NotiWrapper = styled.div`
  .noti {
    padding: 4px 8px;
    width: 216px;
    position: absolute;
    background-color: lightcoral;
    top: calc(41px + 10px);
    right: 10px;
    font-size: 18px;
    word-break: break-all;
    box-shadow: 4px 4px 0px gray;
    animation: blink 3000ms forwards;
  }
  @keyframes blink {     
    0% { opacity: 0; }
    4% { opacity: 0.8; }
    8% { opacity: 0.6; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    92% { opacity: 0.6; }
    96% { opacity: 0.8; }
    100% { opacity: 0; }
  }
  .test {
    position: absolute;
  }
`;

function Noti () {
  const notiState = useSelector(state => state.notiReducer).notifications;

  return (
    <NotiWrapper>
      {notiState.message !== '' ? <div className='noti'>{notiState.message}</div> : null}
    </NotiWrapper>
  );
}

export default Noti;

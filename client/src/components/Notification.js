import styled from 'styled-components';
import { useState } from 'react';

const NotiWrapper = styled.div`
  .noti {
    padding: 4px 8px;
    width: 216px;
    position: absolute;
    background-color: lightcoral;
    top: calc(41px + 10px);
    right: 10px;
    font-size: 18px;
    /* word-break: normal; */
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

// ! Redux Handling 필요

function Noti () {
  const [notiInfo, setNotiInfo] = useState('');
  const handleNotiInfo = () => {
    if (notiInfo === '') {
      setNotiInfo('Notification NotificationNotification NotificationNotificationNotification');
      setTimeout(() => setNotiInfo(''), 3000);
    } else {
      console.log('❌ notification is on');
    }
  };
  return (
    <NotiWrapper>
      {notiInfo !== '' ? <div className='noti'>{notiInfo}</div> : null}
      <button className='test' onClick={handleNotiInfo}>test</button>
    </NotiWrapper>
  );
}

export default Noti;

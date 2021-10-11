import React from 'react';
import propTypes from 'prop-types';
import Type from './Type';
import styled from 'styled-components';
import KakaoShareButton from './KakaoShareButton';
import CopyButton from './CopyButton';
import { media } from '../../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../../components/utils/_var';
require('dotenv').config();

const Wrapper = styled.div`
  .main-container {
    margin: 0 auto 2rem;
    overflow-y: scroll;
    min-height: calc(100vh - 41px - 56px);
    max-width: 525px;
    min-width: 259px;   
  }
  a {
    font-family: 'NeoDunggeunmo';
    font-size: .9rem;
    ${media.tabletMini`font-size: .95rem;`};
  }
  .typeName {
    font-family: 'NeoDunggeunmo';
    text-align: center;
    color: ${Colors.black};
    line-height: 1.25rem;
    font-size: 1.2rem;
    margin: 1.5rem 1.5rem 2.1rem;
    ${media.tabletMini`font-size: 1.35rem;`}
    ${media.tablet`font-size: 1.4rem;`}
    /* ${media.tabletMini`color: blue;`}
    ${media.tablet`color: red;`}
    ${media.laptop`color: green;`} */
  }
  .explanation {
    text-align: center;
    color: ${Colors.black};
    font-family: 'DOSGothic';
    line-height: 1.35rem;
    font-size: .8rem;
    word-break: keep-all;
    margin-bottom: .5rem;
    ${media.tabletMini`font-size: .9rem; line-height: 1.5rem; margin-bottom: .75rem;`}
  }
  .spacing {
    margin-top: 1.5rem;
    ${media.tabletMini`margin-top: 1.75rem;`}
  }
  .container {
    width: 85%;
    border: solid 1px ${Colors.black};
    box-shadow: 4px 5px ${Colors.mediumGray};
    margin: 2rem auto 2rem;
    padding: 1rem 1.5rem 1.2rem;
    ${media.tabletMini`margin: 2.4rem auto 3.5rem; padding: 1.5rem 2.2rem 1.75rem ;`}
  }
  .songs {
    width: 90%;
    height: auto;
    margin: 2rem auto auto;
    padding-bottom: 1rem;
    line-height: 1.7rem;
    color: ${Colors.black};
    font-family: 'DOSGothic';
    text-align: left;
    font-size: .85rem;
    ${media.tabletMini`font-size: .9rem;`}
  }
  .songs > li {
    margin-bottom: .6rem;
  }
  li > span {
    text-decoration: underline;
  }
  li > span:hover {
    cursor: pointer;
  }
  .item:hover, .item:focus {
    animation: rainbow 2000ms infinite;
  } 
  @keyframes rainbow {     
    0% { color: #ff2a2a; }
    15% { color: #ff7a2a; }
    30% { color: #ffc52a; }
    45% { color: #43ff2a; }
    60% { color: #2a89ff; }
    75% { color: #202082; }
    90% { color: #6b2aff; } 
    100% { color: #e82aff; }
  }
`;

const Title = styled.div`
  margin-top: 2.5rem;
  font-family: 'DOSMyungjo';
  text-transform: lowercase;
  text-align: center;
  color: white;
  font-size: .8rem;
  ${media.tabletMini`font-size: 1rem;`}
  line-height: 1.5rem;

  & span {
    background-color: ${Colors.black};
    padding: .4rem .75rem;
    border-radius: 20px;
  }
`;

const Result = ({ resultType, songList, handleNotice, handleMessage }) => {
  let songType;
  // console.log(resultType);
  if (resultType === 'AFL') {
    songType = Type[0];
  } else if (resultType === 'AFW') {
    songType = Type[1];
  } else if (resultType === 'AHL') {
    songType = Type[2];
  } else if (resultType === 'AHW') {
    songType = Type[3];
  } else if (resultType === 'AEL') {
    songType = Type[4];
  } else if (resultType === 'AEW') {
    songType = Type[5];
  } else if (resultType === 'CFL') {
    songType = Type[6];
  } else if (resultType === 'CFW') {
    songType = Type[7];
  } else if (resultType === 'CHL') {
    songType = Type[8];
  } else if (resultType === 'CHW') {
    songType = Type[9];
  } else if (resultType === 'CEL') {
    songType = Type[10];
  } else if (resultType === 'CEW') {
    songType = Type[11];
  }
  // console.log(songList)

  const handleSongClicked = (songId) => {
    window.open(`/song:id=${songId}`, '_blank').focus();
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='main-container'>
        <Title><span>당신의 타입</span></Title>
        <h2 className='typeName'>{songType.name}</h2>
        <div className='container'>
          {songType.explanation.split('\n').map((line, idx) =>
            <div className='explanation' key={idx}>
              {line}
            </div>
          )}
          <div className='explanation spacing'>아래에서 당신만을 위한 추천 노래를 확인해주세요~</div>
        </div>
        <Title><span>추천 노래</span></Title>
        <ul className='songs'>
          {songList[0] === '당신의 취향에 맞는 노래를 찾지 못했습니다.'
            ? <li key='no-result'>{songList[0]} <a href='/recommendpage'>다시 추천 받기</a></li>
            : songList.map((info, idx) => {
              const songId = info.split(',')[0];
              const songInfo = info.split(',')[1];
              return (
                <li key={idx}>{songInfo} <span className='item' onClick={() => handleSongClicked(songId)}>곡 정보 보러가기</span></li>
              );
            })}
        </ul>
        <KakaoShareButton songType={songType} songList={songList} />
        <CopyButton
          songType={songType}
          songList={songList}
          handleMessage={handleMessage}
          handleNotice={handleNotice}
        />
      </div>
    </Wrapper>
  );
};

Result.propTypes = {
  resultType: propTypes.string.isRequired
};

export default Result;

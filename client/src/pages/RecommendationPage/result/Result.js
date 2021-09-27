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
  .app-frame::-webkit-scrollbar {
    width: 15px;
  }
  /* Track */
  .app-frame::-webkit-scrollbar-track {
    background: #e8ded3;
    border-top: .5px solid;
    border-bottom: .5px solid;
    border-left: .5px solid;
    border-right: solid 1px;
  }
  /* Handle */
  .app-frame::-webkit-scrollbar-thumb {
    background: url('/image/scroll.svg');
    background-repeat: no-repeat;
    background-color: ${Colors.beige};
    background-position: center;
    border: 1px solid;
  }
  /* Handle on hover */
  /* .app-frame::-webkit-scrollbar-thumb:hover {
    background: #555;
  } */

  h1 span {
    background-color: ${Colors.black};
    padding: .4em .75em;
    border-radius: 20px;
  }
  a {
    font-family: 'NeoDunggeunmo';
    font-size: .9em;
    ${media.tabletMini`font-size: .95em;`};
  }
  .title {
    margin-top: 2.5em;
    font-family: 'DOSMyungjo';
    text-transform: lowercase;
    font-weight: 400;
    text-align: center;
    color: white;
    font-size: .8em;
    ${media.tabletMini`font-size: 1em;`}
    line-height: 1.5rem;
  }
  .typeName {
    font-family: '국립박물관문화재단클래식M';
    /* font-family: 'NeoDunggeunmo'; */
    text-align: center;
    color: ${Colors.black};
    font-size: 1.3em;
    ${media.tabletMini`font-size: 1.4em;`}
    ${media.tablet`font-size: 1.5em;`}
    margin-top: 1em;
    margin-bottom: 2.1em;
    ${media.tabletMini`color: blue;`}
    ${media.tablet`color: red;`}
    ${media.laptop`color: green;`}
  }
  .explanation {
    text-align: center;
    color: ${Colors.black};
    font-family: 'DOSGothic';
    font-size: .9em;
    line-height: 1.4em;
    ${media.tabletMini`font-size: .95em; line-height: 1.5em;`}
  }
  .container {
    width: 80%;
    background-color: #fff;
    border: solid 1px ${Colors.black};
    box-shadow: 4px 5px ${Colors.gray};
    margin: 2em auto 2.1em;
    padding: .3em .2em .8em .2em;
    ${media.tabletMini`margin: 2.4em auto 3.8em; padding: .8em .2em 1.1em .2em;`}
  }
  .songs {
    width: 80%;
    height: auto;
    margin: 2em auto auto;
    padding-bottom: 1em;
    line-height: 1.7em;
    color: ${Colors.black};
    font-family: 'DOSGothic';
    text-align: left;
    font-size: .9em;
    ${media.tabletMini`font-size: .95em;`}
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

const Result = ({ resultType, songList }) => {
  let songType;
  console.log(resultType);
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
      <div className='app-frame'>
        <h1 className='title'><span>당신의 노래 취향</span></h1>
        <h2 className='typeName'>{songType.name}</h2>
        <h1 className='title'><span>타입 설명</span></h1>
        <div className='container'>
          <p className='explanation'>{songType.explanation}</p>
          <br /><br /><br /><br /><br /><br /><br /><br />
        </div>
        <h1 className='title'><span>추천 노래</span></h1>
        <ul className='songs'>
          {songList[0] === '당신의 취향에 맞는 노래를 찾지 못했습니다.'
            ? <li key='1'>{songList[0]} <a href='/recommendpage'>다시 추천 받기</a></li>
            : songList.map((info, idx) => {
              const songId = info.split(',')[0];
              const songInfo = info.split(',')[1];
              return (
                <li key={idx}>{songInfo} <span className='item' onClick={() => handleSongClicked(songId)}>곡 정보 보러가기</span></li>
              );
            })}
        </ul>
        <KakaoShareButton songType={songType} songList={songList} />
        <CopyButton songType={songType} songList={songList} />
      </div>
    </Wrapper>
  );
};

Result.propTypes = {
  resultType: propTypes.string.isRequired
};

export default Result;

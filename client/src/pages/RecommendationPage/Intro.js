import React, { useEffect } from 'react';
import styled from 'styled-components';
import { changeHeader } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { media } from '../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../components/utils/_var';
import { StartBtn } from '../../components/utils/Buttons';

const Wrapper = styled.div`
  ul {
    display: inline; 
    text-align: center;
  }
  li {
    list-style-type: none;
  }
  span {
    font-family: 'NeoDunggeunmo';
  }
  .list-group {
    .list-item {
      background: transparent;
      padding: 6.5em 1.25em 1em;
      margin: auto;
      font-family: '국립박물관문화재단클래식M';
      text-align: center;
      letter-spacing: .5px;
      line-height: 1.5em;
      border: 0;
      color: ${Colors.black};
      font-size: 1.2em;      
      ${media.tabletMini`font-size: 1.3em;`}
      ${media.tablet`font-size: 1.4em;`}
      ${media.laptop`font-size: 1.5em;`}
      ${media.tabletMini`color: blue;`}
      ${media.tablet`color: red;`}
      ${media.laptop`color: green;`}
    }
  }
`;

const Intro = ({ _onStartClick }) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(changeHeader([true, false])), [dispatch]);
  return (
    <Wrapper>
      <GlobalStyle />
      <div className='app-frame'>
        <ul className='list-group'>
          <li className='list-item'>밀레니얼 세대를 위한<br />노래 추천</li>
        </ul>
        <div>제발 https</div>
        <StartBtn onClick={_onStartClick}>
          <span>테스트 시작!</span>
        </StartBtn>
      </div>
    </Wrapper>
  );
};

export default Intro;

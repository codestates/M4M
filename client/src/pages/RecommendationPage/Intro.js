import React, { useEffect } from 'react';
import styled from 'styled-components';
import { changeHeader } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { media } from '../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../components/utils/_var';
import { StartBtn } from './Buttons';

const Wrapper = styled.div`
  ul {
    display: inline; 
    text-align: center;
  }
  li {
    list-style-type: none;
  }
  .intro {
    width: fit-content;
    background: ${Colors.black};
    border-radius: 20px;
    font-family: 'DOSMyungjo';
    text-align: center;
    letter-spacing: .5px;
    color: white;
    font-size: 1.2rem;    
    padding: .4rem .8rem;
    margin: 7.5rem auto 1.5rem;
    ${media.tabletMini`font-size: 1.3rem; margin: 5rem auto 1.5rem;`}
  }
  .description {
    background: transparent;
    padding: 1rem 2.7rem 2rem;
    margin: auto;
    font-family: 'DOSGothic';
    text-align: center;
    letter-spacing: .5px;
    word-break: keep-all;
    color: ${Colors.black};
    line-height: 1.6rem;
    font-size: .9rem;
    ${media.tabletMini`font-size: 1rem; line-height: 1.75rem;`}
  }
`;

const Intro = ({ _onStartClick }) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='app-frame'>
        <div className='intro'>오직 당신만을 위한 노래 추천!</div>
        <div className='description'>더욱 더 정확한 추천을 받고싶다면, 타임머신을 타고 어린 시절로 돌아갔다고 가정한 후, 다음 질문들에 대답해주세요! :)</div>
        <StartBtn onClick={_onStartClick}>
          <span>타임머신 타기!</span>
        </StartBtn>
      </div>
    </Wrapper>
  );
};

export default Intro;

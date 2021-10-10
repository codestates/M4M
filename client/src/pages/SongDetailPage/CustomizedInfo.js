import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Chart from '../../database/Chart';
import JJM from '../../database/JJM';
import { media } from '../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../components/utils/_var';

const Wrapper = styled.div`
  .year-info-container {
    width: 100%;
    padding: .8rem 0 .7rem;
    font-size: .85rem;
    border: none;
    display: none;
    ${media.tabletMini`display: inline-block; border: 1px solid ${Colors.lightGray};`}    
  }
  .custom-field {
    margin: 1rem auto .5rem;
    color: ${Colors.gray};
    text-align: center;
    font-family: 'Arial';
    font-size: .8rem;
    width: fit-content;
    border-bottom: solid 1px ${Colors.borderColor};
  }
  .custom-field:first-child {
    margin: 0 auto .4rem;
  }
  .content {
    text-align: center;
    font-family: 'Arial';
    color: ${Colors.darkGray};
  }
`;

const ChartBox = styled.div`
  .chart-title, .chart-artist {
    text-align: center;
  }
  .chart-title {
    font-size: .85rem;
    color: ${Colors.darkGray};
    margin-top: .6rem;
  }
  .chart-artist {
    margin-top: .2rem;
    text-align: center;
    color: ${Colors.gray};
    font-size: .8rem;
  }
`;

const AgeContainer = styled.div`
  cursor: ${(props) => props.cursor};
`;

const CustomizedInfo = ({ songInfo, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.userReducer).token;
  const { birthYear, kakao } = useSelector((state) => state.userReducer).userInfo;
  const chartYear = songInfo.date ? songInfo.date.split('.')[0] : null;
  const topSongs = Chart[0][`${chartYear}년`];

  let age = '?';
  
  if (token && birthYear && songInfo.year) {
    age = songInfo.year - birthYear + 1;
    if (age < 1) age = -1;
  }

  const handleYearClicked = () => {
    if (!token) {
      handleNotice(true);
      handleMessage('로그인이 필요한 서비스입니다.');
    } else if (kakao && age === '?') {
      handleNotice(true);
      handleMessage('출생년도 등록이 필요한 서비스입니다.');
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='year-info-container'>
        <AgeContainer cursor={age !== '?' ? 'default' : 'pointer'} onClick={handleYearClicked}>
          <div className='custom-field'>{chartYear}년 당시 당신의 나이</div>
          <div className='content'>{age !== -1 ? `${age}세` : '아직 당신은 태어나기 전입니다.'}</div>
        </AgeContainer>
        <div className='custom-field'>{chartYear}년의 자장면 가격</div>
        <div className='content'>{JJM[0][`${chartYear}년`]}</div>
        <div className='custom-field'>{chartYear}년의 Top 3</div>
        {chartYear &&
          topSongs.map((song, idx) => {
            return (
              <ChartBox>
                <div className='content chart-title'>{idx + 1}. {song.title}</div>
                <div className='content chart-artist'>{song.artist}</div>
              </ChartBox>
            );
          })}
      </div>
    </Wrapper>
  );
};

export default CustomizedInfo;

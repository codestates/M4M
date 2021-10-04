import styled from 'styled-components';
import infoImg from '../intro_img.png';
import deviceImg from '../device_flat.png';
import Separator from '../components/Separator';
import { changeHeader } from '../redux/action';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const LandingWrapper = styled.div`
  .landing {
    min-height: calc(100vh - 41px - 56px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7efe5;
  }
  .empty {
    height: 128px;
    width: 1024px;
    /* border: 10px solid purple; */
  }
  .sub-empty {
    height: auto;
    width: 100%;
  }
  .section {
    margin: 8px 12px;
    width: 1024px;
    /* border: 10px solid purple; */
  }
  .box {
    margin: 4px 6px;
    position: relative;
    /* border: 10px solid blue; */
  }
  .btn {
    font-size: 1.25rem;
    font-weight: lighter;
    color: #3f3f3f;
    padding: 8px 12px;
    min-width: 256px;
    margin: 8px 12px;
    cursor: pointer;
    border: 10px solid orange;
  }
  .intro-1, .intro-2,
  .feature-1,
  .lead-1, .lead-2 {
    display: flex;
  }
  .intro-2, .lead-2 {
    padding: 16px 24px;
    justify-content: center;
  }
  .intro-main-text,
  .feature-main-text,
  .lead-main-text,
  .lead-emogi {
    text-align: left;
    font-size: 3rem;
    font-weight: bold;
    /* min-width: 284px; */
    min-width: 404px;
  }
  .lead-emogi {
    text-align: center;
    padding: 84px;
    /* line-height: 25rem; */
    animation: emogi_float 1500ms steps(5) infinite;
  }
  .intro-sub-text,
  .lead-sub-text {
    border: none;
    margin: 0px;
    font-size: 1.5rem;
  }
  .info-image{
    width: 512px;
    border: 1px solid black;
  }
  @keyframes emogi_float {     
    0%, 100% { transform: translateY(-15px)}
    50% { transform: translateY(15px)}
  }
`;

function Landing () {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  const handleSongDetail = (e) => {
    const target = e.target.getAttribute('value');
    history.push({ pathname: `${target}`});
  }

  return (
    <LandingWrapper>
      <div className='landing'>
        <div className='empty' />
        <div className='section intro'>
          <div className='box intro-1'>
            <div className='box intro-main-text'>
              우리 추억이<br />
              반짝 빛나던<br />
              음악 여행!
              <div className='box intro-sub-text'>
                <br />
                그 시절 우리가 듣던<br />
                음악들이 기억나나요?<br />
                지친 우리를 위로하는<br /> 
                음악들을 추천받고,<br />
                잠시나마 그 시절로<br />
                여행을 떠나볼까요? &#94;&#45;&#94;
              </div>
            </div>
            <div className='box sub-empty' />
            <img className='info-image' src={infoImg}/>
          </div>
          <div className='box intro-2'>
            <div className='btn' value='/mainpage' onClick={handleSongDetail}>추억의 음악 검색하기</div>
            <div className='btn' value='/recommendpage' onClick={handleSongDetail}>추억의 음악 추천받기</div>
          </div>
        </div>
        <Separator />
        <div className='section detail'>
          <div className='box detail-main'>
            section detail
          </div>
        </div>
        <Separator />
        <div className='section feature'>
          <div className='box feature-1'>
            <div className='box feature-main-text'>
              모바일과<br /> 
              태블릿으로<br />
              추억을 추천받고<br />
              공유하세요!
              <div className='box lead-sub-text'>
                  <br />
                  모바일, 태블릿, 데스크탑<br />
                  언제 어디든 원하는 디바이스로<br />
                  추억의 음악 여행을 떠나보세요! &#62;&#95;&#60;
                </div>
            </div>
            <div className='box sub-empty' />
            <img className='info-image' src={deviceImg}/>
          </div>
        </div>
        <Separator />
        <div className='section lead'>
          <div className='box lead-1'>
            <div className='box lead-main-text'>
              밀레니얼 세대를<br />
              위한 추억 추천을<br />
              지금 받아보세요!
              <div className='box lead-sub-text'>
                <br />
                이제, &#91;추억의 음악 추천받기&#93;를 <br />
                클릭하고 추억 여행을 떠납니다!<br />
              </div>
            </div>
            <div className='box sub-empty' />
            <div className='box lead-emogi'>^ㅁ^</div>
          </div>
          <div className='box lead-2'>
            <div className='btn' value='/recommendpage' onClick={handleSongDetail}>추억의 음악 추천받기</div>
          </div>
        </div>
        <div className='empty' />
      </div>
    </LandingWrapper>
  );
}

export default Landing;

import styled from 'styled-components';
import intro_combine from '../images/Landing/intro_combine.png';
import feature_example from '../images/Landing/feature_example.png';
import example_gif from '../images/Landing/example_2_gif.webp';
import lead_gif from '../images/Landing/lead_gif.gif';
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
  }
  .empty {
    height: 128px;
    width: 1024px;
    /* border: 1px solid purple; */
  }
  .sub-empty {
    height: auto;
    width: 100%;
  }
  .content-empty {
    min-height: 64px;
  }
  .section {
    margin: 8px 12px;
    width: 1024px;
    /* border: 1px solid purple; */
  }
  .box {
    margin: 4px 6px;
    position: relative;
    /* border: 1px solid blue; */
  }
  .btn {
    background-color: #fffefa;
    font-size: 1.25rem;
    font-weight: bolder;
    color: #e5dcf2;
    padding: 12px 16px;
    min-width: 256px;
    margin: 8px 12px;
    cursor: pointer;
    box-shadow: 4px 4px 0px gray;
    border: 1px solid gray;
    &:hover {
      transition-duration: 300ms;
      background-color: #caa6fe;
      color: #fffefa;
    }
    &:active {
      position: relative;
      transition-duration: 300ms;
      left: 3px;
      top: 3px;
      box-shadow: 1px 1px 0px gray;
    }
  }
  .intro-1, .intro-2,
  .detail-1, .detail-2, .detail-3,
  .feature-1,
  .lead-1, .lead-2 {
    display: flex;
  }
  .intro-2, .lead-2 {
    padding: 16px 24px;
    justify-content: center;
  }
  .intro-image-container,
  .feature-image-container {
    position: relative;
    /* text-align: right; */
    min-width: 512px;
    min-height: 400px;
  }
  .intro-image, .faeture-image{
    max-width: 490px;
    display: block;
    margin: auto;
    
  }
  .intro-image, .faeture-image {
    animation: img-fadein 2500ms forwards;
    @keyframes img-fadein {
    from { 
      transform: translateY(25%);
      width: 50%; 
      opacity: 0;
      visibility: hidden;
    }
    to { 
      width: 80%; 
      opacity: 1;
      visibility: visible;
    }
  }
  }
  .detail-gif,
  .lead-gif {
    max-width: 564px;
    border-radius: 10px;
    box-shadow: 4px 4px 8px gray;
  }
  .intro-text,
  .detail-text,
  .feature-text,
  .lead-text {
    text-align: left;
    font-size: 3rem;
    font-weight: bold;
    cursor: default;
    min-width: 404px;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .intro-main-text,
  .detail-main-text,
  .feature-main-text,
  .lead-main-text {
    &:hover {
      animation: rainbow 2000ms steps(10) infinite;
    }
    @keyframes rainbow {     
      0% { color: #ff2a2a; }
      15% { color: #ff7a2a; }
      30% { color: #ffc52a; }
      60% { color: #2a89ff; }
      75% { color: #202082; }
      90% { color: #6b2aff; } 
      100% { color: #e82aff; }
    }
  }
  .intro-sub-text,
  .detail-sub-text,
  .lead-sub-text {
    font-size: 1.5rem;
  }
`;

function Landing () {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  const handleSongDetail = (e) => {
    const target = e.target.getAttribute('value');
    history.push({ pathname: `${target}` });
  };

  return (
    <LandingWrapper>
      <div className='landing'>
        <div className='empty' />
        <div className='section intro'>
          <div className='box intro-1'>
            <div className='box intro-text'>
              <div className='box intro-main-text'>
                우리 추억이<br />
                반짝 빛나던<br />
                음악 여행!
              </div>
              <div className='box intro-sub-text'>
                <br />
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
            <div className='box intro-image-container'>
              <img className='intro-image' src={intro_combine} alt='into_combine' />
            </div>
          </div>
          <div className='box content-empty' />
          <div className='box intro-2'>
            <div className='btn' value='/mainpage' onClick={handleSongDetail}>추억의 음악 검색하기</div>
            <div className='btn' value='/recommendpage' onClick={handleSongDetail}>추억의 음악 추천받기</div>
          </div>
        </div>
        <Separator />
        <div className='section detail'>
          <div className='box detail-1'>
            <div className='box detail-img'>
              <img className='detail-gif' src={example_gif} alt='example_gif' />
            </div>
            <div className='box sub-empty' />
            <div className='box detail-text'>
              <div className='box detail-main-text'>
                #1. <br />
                우리를 위로할 <br />
                추억을<br />
                받아보세요!<br />
              </div>
              <div className='box detail-sub-text'>
                <br />
                <br />
                '20세기 말 ~ 21세기 초'<br />
                우리를 울고 웃게한<br />
                음악들을 추천받으세요!<br />
              </div>
            </div>
          </div>
          <div className='box content-empty' />
          <div className='box detail-2'>
            <div className='box detail-text'>
              <div className='box detail-main-text'>
                #2.<br />
                더 깊게<br />
                추억에 <br />
                빠지세요!<br />
              </div>
              <div className='box detail-sub-text'>
                <br />
                <br />
                그 때 그 시절 음악들의<br />
                몰랐던 정보들을<br />
                확인하세요!<br />
              </div>
            </div>
            <div className='box sub-empty' />
            <div className='box detail-img'>
              <img className='detail-gif' src={example_gif} alt='example_gif' />
            </div>
          </div>
          <div className='box content-empty' />
          <div className='box detail-3'>
            <div className='box detail-img'>
              <img className='detail-gif' src={example_gif} alt='example_gif' />
            </div>
            <div className='box sub-empty' />
            <div className='box detail-text'>
              <div className='box detail-main-text'>
                #3.<br />
                추억을 공유하고,<br />
                새로운 추억을 <br />
                만드세요!<br />
              </div>
              <div className='box detail-sub-text'>
                <br />
                <br />
                추억에 빠진 '친구'들과<br />
                서로의 감정을 공유하고,<br />
                새로운 추억을 만들어보세요!<br />
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className='section feature'>
          <div className='box feature-1'>
            <div className='box feature-text'>
              <div className='box feature-main-text'>
                모바일과<br />
                태블릿으로<br />
                추억을 추천받고<br />
                공유하세요!
              </div>
              <div className='box lead-sub-text'>
                <br />
                <br />
                모바일, 태블릿, 데스크탑<br />
                언제 어디든 원하는 디바이스로<br />
                추억의 음악 여행을 떠나보세요! &#62;&#95;&#60;
              </div>
            </div>
            <div className='box sub-empty' />
            <div className='box feature-image-container'>
              <img className='test faeture-image' src={feature_example} alt='feature_example' />
            </div>
          </div>
        </div>
        <Separator />
        <div className='section lead'>
          <div className='box lead-1'>
            <div className='box lead-img'>
              <img className='lead-gif' src={lead_gif} alt='lead_gif' />
            </div>
            <div className='box sub-empty' />
            <div className='box lead-text'>
              <div className='box lead-main-text'>
                밀레니얼 세대를<br />
                위한 추억 추천을<br />
                지금 받아보세요!
              </div>
              <div className='box lead-sub-text'>
                <br />
                <br />
                준비가 다 되었다면, <br />
                &#91;추억의 음악 추천받기&#93;를 <br />
                클릭하고 추억 여행을 <br />
                떠나볼까요?<br />
                <br />
                ₍₍ ◝&#40;・ω・&#41;◟ ⁾⁾
              </div>
            </div>
          </div>
          <div className='box content-empty' />
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

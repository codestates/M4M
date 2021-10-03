import styled from 'styled-components';
import infoImg from '../images/intro_image.png';
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
  .section {
    display: flex;
    margin: 8px 12px;
    width: 1024px;
    border: 10px solid purple
  }
  .box {
    margin: 8px 12px;
    border: 10px solid blue;
    position: relative;
  }
  .text {
    text-align: left;
    font-size: 3rem;
    font-weight: 900;
    min-width: 284px;
  }
  .info-image{
    width: 512px;
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
        <div className='section intro'>
          <div className='box text'>
            우리 추억이<br />
            반짝 빛나던<br />
            음악 여행
          </div>
          <img className='info-image' src={infoImg} />
          <button value='/mainpage' onClick={handleSongDetail}>추억 검색하기</button>
          <button value='/recommendpage' onClick={handleSongDetail}>추억 추천받기</button>
        </div>
        <div className='section detail'>
          section detail
        </div>
        <div className='section feature'>
          section feature
        </div>
        <div className='section lead'>
          section lead
        </div>
      </div>
    </LandingWrapper>
  );
}

export default Landing;

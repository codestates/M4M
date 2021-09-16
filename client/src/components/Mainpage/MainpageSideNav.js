import styled from 'styled-components';
import { useState } from 'react';

const SideNavWrapper = styled.div`
  .SideNav {
    background-color: beige;
    position: absolute;
    text-align: left;
  }
  .filter {
    margin: 0px 12px;
    padding: 8px 12px;
    font-size: 18px;
    cursor: pointer;
    text-decoration: underline;
  }
  .filter:hover, .filter:focus {
    animation: rainbow 2000ms infinite;
  } 
  .space, .arrow {
    animation: horizontal 1000ms ease-in-out infinite;
  }
  .arrow {
    display: inline-flex;
    border: 6px solid transparent;
    border-left: 6px solid black;
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
  @keyframes horizontal {
    0% { margin-left: 9px; }
    50% { margin-left: 11px; }
    100% { margin-left: 9px; }
  }
`

function SideNav () {
  // ! useState는 Redux를 사용하기 전 테스트 용으로 사용
  const [isSelected, setIsSelected] = useState('all');
  const [isOpenG, setIsOpenG] = useState(false);
  const [isOpenH, setIsOpenH] = useState(false);
  const [isOpenY, setIsOpenY] = useState(false);
  const genreArr = ['발라드', '댄스', '랩/힙합', 'R&B/Soul', '인디음악', '록/메탈', '트로트', '포크/블루스'];
  const hashtagArr = ['#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'];
  const yearArr = new Array(18).fill(1993).map((el, idx) => String(el + idx));
  console.log('🟣', isSelected, 'G:', isOpenG, 'H:', isOpenH, 'Y:', isOpenY);
  console.log('⚪️', genreArr ,hashtagArr ,yearArr);

  const handleSelectChange = (e) => setIsSelected(e.target.getAttribute('value'));
  const handleIsOpne = (e) => {
    const openArr = ['genre', 'hashtag', 'year'];
  }

  return (
    <SideNavWrapper>
      <div className='SideNav'>
        <div className='filter' value='all' onClick={handleSelectChange}><span className='space'></span>ALL</div>
        <div className='filter' value='like' onClick={handleSelectChange}><span className='space'></span>Like</div>
        <div className='filter' value='genre' onClick={handleSelectChange}><span className='arrow'></span>Genre</div>
        <div></div>
        <div className='filter' value='hashtag' onClick={handleSelectChange}><span className='arrow'></span>Hashtag</div>
        <div className='filter' value='yeaer' onClick={handleSelectChange}><span className='arrow'></span>Year</div>
      </div>
    </SideNavWrapper>
  );
}

export default SideNav;

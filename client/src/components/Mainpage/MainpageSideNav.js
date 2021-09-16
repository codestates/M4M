import styled from 'styled-components';
import { useState } from 'react';

const SideNavWrapper = styled.div`
  .SideNav {
    background-color: beige;
    position: absolute;
    text-align: left;
    width: 20%;
  }
  .item, .sub-item {
    margin: 0px 12px;
    padding: 8px 12px;
    cursor: pointer;
    text-decoration: underline;
  }
  .item {
    font-size: 18px;
  }
  .sub-item {
    font-size: 14px;
    position: relative;
    left: 30px;
  }
  .item:hover, .item:focus, .sub-item:hover, .sub-item:focus {
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
`;

function SideNav () {
  // ! useState는 Redux를 사용하기 전 테스트 용으로 사용
  const [isSelected, setIsSelected] = useState('all');
  const [isOpen, setIsOpen] = useState(null);
  const genreArr = ['발라드', '댄스', '랩/힙합', 'R&B/Soul', '인디음악', '록/메탈', '트로트', '포크/블루스'];
  const hashtagArr = ['#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'];
  const yearArr = new Array(18).fill(1993).map((el, idx) => String(el + idx));
  console.log('🔵', isSelected);
  // console.log('⚪️', genreArr ,hashtagArr ,yearArr);

  const handleSelectChange = (e) => setIsSelected(e.target.getAttribute('value'));
  const handleIsOpen = (e) => {
    const curValue = e.target.getAttribute('value');
    if (isOpen === curValue) {
      setIsOpen(null);
    } else {
      setIsOpen(curValue);
    }
  };

  return (
    <SideNavWrapper>
      <div className='SideNav'>
        <div className='item' value='all' onClick={handleSelectChange}><span className='space' />ALL</div>
        <div className='item' value='like' onClick={handleSelectChange}><span className='space' />Like</div>
        <div className='item' value='genre' onClick={handleIsOpen}><span className='arrow' />Genre</div>
        {
          isOpen === 'genre'
            ? <div>{genreArr.map((genre, idx) => <div className='sub-item' key={idx + 1}>{genre}</div>)}</div>
            : null
        }
        <div className='item' value='hashtag' onClick={handleIsOpen}><span className='arrow' />Hashtag</div>
        {
          isOpen === 'hashtag'
            ? <div>
              {hashtagArr.map((hashtag, idx) => <div className='sub-item' key={idx + 1}>{hashtag}</div>)}
              </div>
            : null
        }
        <div className='item' value='year' onClick={handleIsOpen}><span className='arrow' />Year</div>
        {
          isOpen === 'year'
            ? <div>{yearArr.map((year, idx) => <div className='sub-item' key={idx + 1}>{year}</div>)}</div>
            : null
        }
      </div>
    </SideNavWrapper>
  );
}

export default SideNav;

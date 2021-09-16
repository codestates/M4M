import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const HeaderSearchbarWrapper = styled.div`
  .btn {
    cursor: pointer;
    font-size: 18px;
  }
  .searchbar-none {
    display: none;
  }
  .searchbar {
    display: flex;
    justify-content: center;
  }
  .searchbar-dropbox {
    font-size: 18px;
  }
  .searchbar-text {
    width: 30vw;
    font-size: 14px;
  }
`;

function HeaderSearchbar () {
  // ! useState는 Redux를 사용하기 전 테스트 용으로 사용
  const [type, setType] = useState('title');
  const [keyword, setKeyword] = useState('');
  console.log('🟡', type, '🟢', keyword);

  const getSearchResult = (reqType, reqKeyword) => {
    if (reqKeyword.length !== 0) {
      axios
        .get(
          process.env.REACT_APP_API_URL + `/${reqType}?query=${reqKeyword}`,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((searchResult) => {
          const songIdList = searchResult.data.data;
          console.log(songIdList);
          // Mainpage_info에 '검색 결과가 없습니다.' landing
        })
        .catch((err) => {
          // Mainpage_info에 '검색 결과가 없습니다.' landing
          console.log(err);
        });
    } else {
      // Header 아래 쪽에 '검색어를 입력해주세요.' notification(red) 3000ms landing
    }
  };

  const handleTypeChange = (e) => setType(e.target.value);
  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleClick = () => {
    getSearchResult(type, keyword);
  };
  const handleKeyboard = (e) => {
    if (e.key === 'Enter') {
      getSearchResult(type, keyword);
    }
  };

  return (
    <HeaderSearchbarWrapper>
      <div className='searchbar'>
        <select className='searchbar-dropbox' onChange={handleTypeChange}>
          <option value='title'>title</option>
          <option value='artist'>artist</option>
        </select>
        <input
          className='searchbar-text'
          type='text'
          placeholder='Enter title or artist name'
          onChange={handleKeywordChange}
          onKeyPress={handleKeyboard}
        />
        <button className='btn searchbar-button' onClick={handleClick}>search</button>
      </div>
    </HeaderSearchbarWrapper>
  );
}

export default HeaderSearchbar;

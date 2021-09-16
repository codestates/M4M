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
`

function HeaderSearchbar () {
  // ! useState는 Redux를 사용하기 전 테스트 용으로 사용
  const [type, setType] = useState('title');
  const [keyword, setKeyword] = useState('');
  console.log('🟡', type,'🟢', keyword);

  const handleTypeChange = (e) => setType(e.target.value);
  const handleKeywordChange = (e) => setKeyword(e.target.value)
  const handleClick = () => {
    // axios.get function
  }
  const handleKeyboard = (e) => {
    if (e.key === "Enter") {
      // axois.get funiction
    }
  }

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

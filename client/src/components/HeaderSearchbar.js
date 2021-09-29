import { getRegExp } from "korean-regexp";
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { notify, changeType, getResult } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

axios.defaults.headers.withCredentials = true;

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
  .display-none {
    display: none;
  }
`;

function HeaderSearchbar (isRecommend) {
  const history = useHistory();
  const songsBulkState = useSelector(state => state.songsBulkReducer).songsBulk;
  const notiState = useSelector(state => state.notiReducer).notifications;
  const dispatch = useDispatch();
  const searchTypeList = ['title', 'artist'];
  const keyword = document.getElementsByClassName('searchbar-text');
  const [searchType, setSearchType] = useState(searchTypeList[0]);
  console.log(history.location.pathname);

  const getSearchResult = (reqSearchType, reqKeyword) => {
    if (reqKeyword.length !== 0) {
      const result = songsBulkState.filter((song) => getRegExp(reqKeyword).test(song[reqSearchType]));
      if (result.length !== 0) {
        dispatch(changeType(`검색 결과: ${reqSearchType} - ${reqKeyword}`));
        dispatch(getResult(result));
      } else {
        dispatch(changeType('No Result'));
      }
    } else {
      if (notiState.message === '') {
        dispatch(notify('검색창이 비었습니다. 추억을 입력해주세요! ᕕ( ᐛ )ᕗ'));
      }
    }
  };

  const handleSearchTypeChange = (e) => setSearchType(e.target.value);
  const handleClick = () => {
    getSearchResult(searchType, keyword[0].value);
  };
  const handleKeyboard = (e) => {
    if (e.key === 'Enter') {
      getSearchResult(searchType, keyword[0].value);
    }
  };

  return (
    <HeaderSearchbarWrapper>
      <div className={history.location.pathname !== 'recommendpage'  ? 'searchbar' : 'display-none'}>
        <select className='searchbar-dropbox' onChange={handleSearchTypeChange}>
          {searchTypeList.map((searchType, idx) => <option value={searchType} key={idx + 1}>{searchType}</option>)}
        </select>
        <input
          className='searchbar-text'
          type='text'
          placeholder='Enter title or artist name'
          onKeyPress={handleKeyboard}
        />
        <button className='btn searchbar-button' onClick={handleClick}>search</button>
      </div>
    </HeaderSearchbarWrapper>
  );
}

export default HeaderSearchbar;

import styled from 'styled-components';
import { getRegExp } from 'korean-regexp';
import { useState } from 'react';
import { notify, changeType, getResult } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { media } from './utils/_media-queries';
import { Colors } from './utils/_var';

axios.defaults.headers.withCredentials = true;

const HeaderSearchbarWrapper = styled.div`
  .searchbar-none {
    display: none;
  }
  .searchbar {
    display: flex;
    justify-content: center;
    /* background-color: red; */
    margin-left: -1rem;
  }
  .searchbar-container {
    /* width: 12rem; */
    height: 1.5rem;
    padding-top: .2rem;
    ${media.tabletMini`width: 12rem; height: 1.5rem;`}
    /* background-color: yellow; */
    ${media.tablet`width: 20rem; height: 1.9rem;`}
    ${media.laptop`width: 22rem; height: 1.9rem;`}
    border: 1px solid ${Colors.mediumGray};
    border-radius: 15px;
  }
  .search-icon {
    width: 1rem;
    margin-left: 0;
    padding-bottom: 0;
    ${media.tablet`width: 1.3rem; margin-left: -5.5rem; padding-bottom: .25rem;`}
    vertical-align: middle;
    align-items: left;
  }
  .searchbar-text {
    border: none;
    margin-left: .2rem;
    width: 10rem;
    font-size: .7rem;
    ${media.tablet`width: 12rem; font-size: .85rem;`}
    ${media.laptop`width: 14rem;`}
    color: ${Colors.black};
  }
  .searchbar-dropbox {
    font-size: .75rem;
    margin-right: .3rem;
    
    /* color: white; */
    ${media.tabletMini`font-size: .75rem; margin-right: .3rem; color: ${Colors.darkGray};`}
    ${media.tablet`font-size: .8rem; margin-right: .8rem; `}
    
    border: none;
    cursor: pointer;
  }

  select {
    -webkit-appearance: menulist-button;
    color: red;
  }

  .searchbar-dropbox:focus, input:focus {
    outline: none;
  }
  input::-webkit-input-placeholder {
    color: ${Colors.mediumGray};
    font-size: .7rem;
    /* ${media.tabletMini`font-size: 82rem;`} */
    ${media.tablet`font-size: .8rem;`}
    ${media.laptop`font-size: .8rem;`}
  }
  .display-none {
    display: none;
  }
`;

const HeaderSearchbar = ({ isRecommend, handleMessage, handleNotice }) => {
  const songsBulkState = useSelector(state => state.songsBulkReducer).songsBulk;
  const notiState = useSelector(state => state.notiReducer).notifications;
  const dispatch = useDispatch();
  const searchTypeList = ['제목', '아티스트'];
  const searchTypeName = ['title', 'artist'];
  const keyword = document.getElementsByClassName('searchbar-text');
  const [searchType, setSearchType] = useState(searchTypeName[0]);

  const getSearchResult = (reqSearchType, reqKeyword) => {
    if (reqKeyword.length !== 0) {
      const result = songsBulkState.filter((song) => getRegExp(reqKeyword).test(song[reqSearchType]));
      if (result.length !== 0) {
        dispatch(changeType(`검색 결과: ${searchTypeList[searchTypeName.indexOf(reqSearchType)]} - ${reqKeyword}`));
        dispatch(getResult(result));
      } else {
        dispatch(changeType('No Result'));
      }
    } else {
      if (notiState.message === '') {
        // dispatch(notify('검색창이 비었습니다. 추억을 입력해주세요! ᕕ( ᐛ )ᕗ'));
        handleNotice(true);
        handleMessage('검색창이 비었습니다. 추억을 입력해주세요! ᕕ( ᐛ )ᕗ');
      }
    }
  };

  const handleSearchTypeChange = (e) => setSearchType(e.target.value);
  const handleClick = (e) => {
    // getSearchResult(searchType, e.target.value);
    // console.log(e);
  };
  const handleKeyboard = (e) => {
    if (e.key === 'Enter') {
      getSearchResult(searchType, e.target.value);
    }
  };

  return (
    <HeaderSearchbarWrapper>
      <div className={isRecommend ? 'searchbar' : 'display-none'}>
        <select className='searchbar-dropbox' onChange={handleSearchTypeChange}>
          {searchTypeList.map((searchType, idx) => <option value={searchTypeName[idx]} key={idx + 1}>{searchType}</option>)}
        </select>
        <div className='searchbar-container'>
          <img className='search-icon' src='/image/Search_Icon.svg' alt='search-icon' />
          <input
            className='searchbar-text'
            type='text'
            placeholder='제목 또는 아티스트명을 입력해주세요.'
            onKeyPress={handleKeyboard}
          />
        </div>
        {/* <button className='bnt searchbar-button' onClick={handleClick}>검색</button> */}
      </div>
    </HeaderSearchbarWrapper>
  );
}

export default HeaderSearchbar;

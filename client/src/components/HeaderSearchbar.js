import styled from 'styled-components';
import { getRegExp } from 'korean-regexp';
import { useState, useEffect } from 'react';
import { changeType, getResult } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import { media } from './utils/_media-queries';
import { Colors } from './utils/_var';

const HeaderSearchbarWrapper = styled.div`
  .searchbar-none {
    display: none;
  }
  .searchbar {
    display: flex;
    justify-content: center;
    margin-left: -1rem;
    margin-top: -.2rem;
  }
  .searchbar-container {
    height: 1.5rem;
    padding-top: .3rem;
    ${media.tabletMini`width: 12rem; height: 1.5rem;`}
    ${media.tablet`width: 20rem; height: 1.9rem;`}
    ${media.laptop`width: 22rem;`}
    border: 1px solid ${Colors.mediumGray};
    border-radius: 15px;
  }
  .search-icon {
    width: 1.3rem;
    vertical-align: middle;
    margin-top: -.1rem;
    margin-right: .2rem;
  }
  .searchbar-text {
    border: none;
    width: 10rem;
    font-size: .7rem;
    ${media.tablet`width: 88%; font-size: .85rem;`}
    color: ${Colors.black};
    background-color: transparent;
  }
  .searchbar-dropbox {
    font-size: .75rem;
    margin-right: .3rem;
    ${media.tabletMini`font-size: .75rem; margin-right: .3rem; color: ${Colors.darkGray};`}
    ${media.tablet`font-size: .8rem; margin-right: .8rem; `}
    border: none;
    cursor: pointer;
  }
  .searchbar-dropbox:focus, select:focus, input:focus {
    outline: none;
  }
  input::-webkit-input-placeholder {
    color: ${Colors.mediumGray};
    font-size: .7rem;
    ${media.tablet`font-size: .8rem;`}
  }
  .display-none {
    display: none;
  }
  .bar-deactive {
    display: none;
  }
  .icon-deactive {
    display: none;
  }
  .icon-active {
    right: 0;
    cursor: pointer;
  }
  .search-icon-active {
    width: 1.5rem;
  }
`;

function HeaderSearchbar ({ isRecommend, handleMediaState, barState, handleBarState, resBarState, handleMessage, handleNotice }) {
  const songsBulkState = useSelector(state => state.songsBulkReducer).songsBulk;
  const notiState = useSelector(state => state.notiReducer).notifications;
  const dispatch = useDispatch();
  const searchTypeList = ['제목', '아티스트'];
  const searchTypeName = ['title', 'artist'];
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
        handleNotice(true);
        handleMessage('검색창이 비었습니다. 추억을 입력해주세요! ᕕ( ᐛ )ᕗ');
      }
    }
    resBarState();
  };

  const handleSearchTypeChange = (e) => setSearchType(e.target.value);

  const handleKeyboard = (e) => {
    if (e.key === 'Enter') {
      getSearchResult(searchType, e.target.value);
    }
  };

  const resetInput = () => {
    if (window.innerWidth < 768) setInput('');
  };

  useEffect(() => window.addEventListener('resize', resetInput));

  const [input, setInput] = useState('');

  const onChange = (e) => setInput(e);

  return (
    <HeaderSearchbarWrapper>
      <div className={isRecommend ? `searchbar ${barState}` : 'display-none'}>
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
            onChange={(e) => onChange(e.target.value)}
            value={input || ''}
          />
        </div>
      </div>
      <div className={isRecommend && barState === 'bar-deactive' ? 'icon-active' : 'icon-deactive'}>
        <img
          className='search-icon-active'
          src='/image/Search_Icon.svg'
          alt='search-icon-active'
          onClick={() => { handleMediaState(); handleBarState(); }}
        />
      </div>
    </HeaderSearchbarWrapper>
  );
}

export default HeaderSearchbar;

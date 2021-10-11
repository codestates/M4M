import styled from 'styled-components';
import { getRegExp } from 'korean-regexp';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { notify, changeType, getResult } from '../redux/action';
import { Colors } from './utils/_var';
import { media } from './utils/_media-queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const MediaSearchbarWrapper = styled.div`
  .media-searchbar {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 50px;
    ${media.tabletMini`height: 52px;`}
    background-color: white;
    padding-top: .1rem;
    /* opacity: 0.8; */
  }
  .deactive {
    display: none;
  }
  .searchbar {
    margin: 0 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: transparent;
  }
  .searchbar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2rem;
    padding-top: .1rem;
    background-color: transparent;
    /* background-color: white; */
    border: 1px solid ${Colors.mediumGray};
    border-radius: 15px;
  }
  .search-icon {
    width: 1rem;
    margin-left: 0.5rem;
    margin-bottom: .23rem;
    vertical-align: middle;
    align-items: left;
    padding-top: .12rem;
  }
  .searchbar-text {
    border: none;
    margin-right: .2rem;
    margin-bottom: .23rem;
    padding-top: .1rem;
    padding-left: .75rem;
    width: 100%;
    height: 98%;
    font-size: 1rem;
    border-radius: 15px;
    color: ${Colors.black};
    &::placeholder {
      font-size: 0.75rem;
    }
  }
  .searchbar-dropbox:focus, select:focus, input:focus {
    outline: none;
  }
  .searchbar-dropbox {
    font-size: .75rem;
    ${media.tabletMini`font-size: .8rem;`}
    margin-right: .8rem;
    color: ${Colors.darkGray};
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
  .closeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colors.mediumGray};
    margin: 0 .8rem 0 0;
    font-size: 1.5rem;
    transition-duration: 500ms;
    cursor: pointer;
    &:hover {
      color: ${Colors.pastelPurple};
    }
  }
`;

function MediaSearchbar ({ mediaState, handleMediaState, handleBarState }) {
  const songsBulkState = useSelector(state => state.songsBulkReducer).songsBulk;
  const notiState = useSelector(state => state.notiReducer).notifications;
  const dispatch = useDispatch();
  const searchTypeList = ['제목', '아티스트'];
  const searchTypeName = ['title', 'artist'];
  const [searchType, setSearchType] = useState(searchTypeName[0]);
  const location = useLocation();
  useEffect(() => {}, [location]);

  const getSearchResult = (reqSearchType, reqKeyword) => {
    if (reqKeyword.length !== 0) {
      const result = songsBulkState.filter((song) => {
        reqKeyword = reqKeyword.replace(/\s/gi, '');
        return getRegExp(reqKeyword).test(song[reqSearchType].replace(/\s/gi, ''));
      });
      if (result.length !== 0) {
        dispatch(changeType(`검색 결과: ${searchTypeList[searchTypeName.indexOf(reqSearchType)]} - ${reqKeyword}`));
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
    <MediaSearchbarWrapper>
      {!location.pathname.includes('mainpage')
        ? null
        : <div className={`media-searchbar ${mediaState}`}>
            <div className='searchbar'>
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
            <div className='closeBtn' onClick={() => { handleMediaState(); handleBarState(); }}>
              <FontAwesomeIcon className='menu' icon={faTimes} size='1x' />
            </div>
          </div>
      }
    </MediaSearchbarWrapper>
  );
}

export default MediaSearchbar;

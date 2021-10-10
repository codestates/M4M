import styled from 'styled-components';
import { changeHeader } from '../../redux/action';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
<<<<<<< HEAD
import { media } from '../../components/utils/_media-queries';
import { Colors } from '../../components/utils/_var';
=======
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { media } from '../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../components/utils/_var';
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
import TypeWriterEffect from 'typewriter-effect';

axios.defaults.withCredentials = true;

const LoadingWrpper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.darkGray};
  font-size: 1.75rem;
  font-family: 'Arial';
  padding: .5rem;
`;
const SongListWrapper = styled.div`
<<<<<<< HEAD
=======
  * {
    box-sizing: border-box;
  }
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  .no-result {
    color: ${Colors.black};
    font-family: 'Arial';
    font-size: .9rem;
    padding-top: 2rem;
<<<<<<< HEAD
=======
    width: 100%;
    justify-content: center;
    text-align: center;
    margin: auto 20rem auto 0;
    ${media.tablet`margin: auto; padding-top: 2.5rem;`}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }
  .arrow-image {
    height: .9rem;
    vertical-align: middle;
    margin-left: .5rem;
    padding-bottom: .2rem;
  }
<<<<<<< HEAD
  button {
    margin: 10px;
  }
  .songlist {
    margin-left: 0;
    /* background-color: pink; */
    ${media.tabletMini`margin-left: .75rem;`}
  }
  .sort {
    display: flex;
    justify-content: center;
  }
  .box {
    margin: .5rem;
  }
  .type {
    margin: 2.5rem auto .6rem;
    /* padding-right: 1rem; */
    ${media.tabletMini`padding-right: 0;`}
=======
  .type {
    margin: 1.2rem auto .5rem;
    ${media.tabletMini`padding-right: 0;`}
    ${media.tablet`margin: 2rem auto .5rem;`}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    text-align: right;
    color: ${Colors.darkGray};
    font-family: 'Arial';
    font-size: 1.1rem;
<<<<<<< HEAD
    /* background-color: yellow; */
=======
    width: 95%;
    ${media.tabletMini`width: 98%;`}
  }
  .songlist {
    /* margin: 0 auto;
    max-width: 60rem;
    width: 98%;
    ${media.tabletMini`padding-right: 0rem; width: 100%;`}
    ${media.tablet`min-width: 41rem; padding-right: 2rem;`}
    ${media.laptop`min-width: 52rem;`} */
    margin: 0 auto;
    width: 98%;
    max-width: 60rem;
    ${media.tabletMini`padding-right: 0rem; width: 100%;`}
    ${media.tablet`padding-right: 2rem;`}   
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }
  .scrollable::-webkit-scrollbar {
    height: 10px;
  }
  .scrollable::-webkit-scrollbar-thumb {
    visibility: hidden;
  }
  .scrollable::-webkit-scrollbar-thumb:hover {
    border-top: .5px solid;
    border-bottom: .5px solid;
    border-left: .5px solid;
    border-right: 1px solid;
    cursor: all-scroll;
  }
  .field-container {
    display: flex;
<<<<<<< HEAD
    margin: 0 auto 0em;
    justify-content: center;
    align-items: center;
    margin-bottom: -5px;
    /* background-color: yellow; */
  }
  .field-container > div {
=======
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: -5px;
    width: 100%;
  }
  .field-container > div, input {
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    margin: 0 0 .3rem;
  }
  .field {
    display: grid;
<<<<<<< HEAD
    grid-template-columns: 11% 30% 30% 12% 12%;
    grid-column-gap: 8px;
    margin: .75rem 1rem 0;
    padding: .15rem .15rem;
    min-width: 320px;
    width: 95%;
    ${media.tabletMini`min-width: 100%; max-width: 750px;`}
    ${media.tablet`min-width: 44rem; max-width: 48rem;`}
    ${media.laptop`width: 50rem;`}
    border: solid 1px ${Colors.lightGray};
    border-left: none;
    border-right: none;
=======
    width: 92%;
    grid-template-columns: 15% 25% 23% 16% 16%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 12% 8%; width: 100%;`}
    /* grid-gap: 8px; */
    margin: .75rem auto 0;
    padding: .15rem .15rem;
    border: solid 1px ${Colors.lightGray};
    border-left: none;
    border-right: none;
    ${media.tabletMini`width: 98%;`}
    ${media.tablet`width: 36rem;`}
    ${media.laptop`width: 50rem;`}
    /* background-color: salmon; */
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }

  .field .grid-item {
    text-align: left;
    font-family: 'Arial';
    color: ${Colors.gray};
  }
  .grid-item {
    font-size: .8rem;
    align-self: center;
<<<<<<< HEAD
=======
  }
  .grid-item:not(:first-of-type){
    padding-left: .2rem;
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }
  .grid-item:hover {
    cursor: pointer;
  }
  .field-title {
    padding: auto;
    margin-left: .5rem;
  }
<<<<<<< HEAD
  .song-container > div {
    /* margin: .5rem 0; */
=======
  .field-title {
    padding: auto;
    margin-left: .4rem;
    width: 100%;
  }
  .song-container > div, input {
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    margin: 0;
  }
  .song-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .song-info-container {
    display: grid;
<<<<<<< HEAD
    grid-template-columns: 11% 30% 30% 12% 12%;
    grid-column-gap: 8px;
    margin: 0 auto;
    padding: .4rem .15rem;
    min-width: 320px;
    width: 95%;
    /* ${media.tabletMini`width: 470px; max-width: 750px;`} */
    ${media.tabletMini`width: 100%; max-width: 750px;`}
    ${media.tablet`min-width: 44rem; max-width: 48rem;`}
    ${media.laptop`width: 50rem;`}

    border-bottom: solid 1px ${Colors.lightGray};
  }
  .song-info-container:hover {
=======
    width: 92%;
    grid-template-columns: 15% 25% 23% 16% 16%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 12% 8%; width: 100%;`}
    /* grid-gap: 8px; */
    margin: 0 auto;
    padding: .4rem .15rem;
    border-bottom: solid 1px ${Colors.lightGray};
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    cursor: pointer;
    ${media.tabletMini`width: 98%;`}
    ${media.tablet`width: 36rem;`}
    ${media.laptop`width: 50rem;`}
    /* background-color: lavender; */
  }
  .song-info-container > div:nth-child(-n+5) {
    margin-top: .3rem;
  }
  .scrollable {
    overflow-x: auto;
    white-space : nowrap;
  }
  .album_art {
    margin: auto .25rem;
    width: 6rem;
    height: auto;
    grid-row: 1 / 4;
  }
  .info {
    width: 100%;
    font-family: 'Arial';
    font-size: .8rem;
    text-align: left;
    color: ${Colors.black};
  }
<<<<<<< HEAD
  .title {
    margin-left: .5rem;
=======
  .info:not(:first-of-type){
    padding-left: .2rem;
  }
  .title {
    margin-left: .5rem;
    /* background-color: pink; */
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }
  .date, .like {
    color: ${Colors.gray};
  }
  .hashtagBox {
    margin-top: 1rem;
    margin-left: .4rem;
    grid-row: 2;
    grid-column: 2 / end;
<<<<<<< HEAD
=======
    width: 100%;
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
  }
`;

const HashTag = styled.div`
  float: left;
  margin: auto .2rem .2rem;
  padding: .2rem;
  border: solid 1px;
  border-color: ${props => props.borderColor};
  border-radius: 10px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  font-family: 'Arial';
  font-size: .7rem;
`;

const YearContainer = styled.div`
  margin: 1.2rem auto .5rem;
  ${media.tabletMini`padding-right: 0;`}
  ${media.tablet`margin: 2rem auto .5rem;`}
  text-align: right;
  color: ${Colors.darkGray};
  font-family: 'Arial';
  font-size: 1.1rem;
  width: 95%;
  ${media.tabletMini`width: 98%;`}
`
const YearType = styled.div`
  display: inline;
  margin-left: .3rem;
`;
const MessageContainer = styled.div`
  display: inline;
  color: white;  
  &:hover, &:active, &:focus {
    color: ${props => props.show};
  }
  .message {
    display: inline;
    font-size: .8rem;
    margin-right: .2rem;
  }
`;

function SongList () {
  const information = JSON.parse(localStorage.getItem('userinfo'));
  const dispatch = useDispatch();
  const history = useHistory();
  const searchState = useSelector(state => state.searchReducer).searchResult;
  const typeState = useSelector(state => state.typeReducer).navType;
  const songsBulkState = useSelector(state => state.songsBulkReducer).songsBulk;
  const songNumber = 10;
  const Genre = ['발라드', '댄스', '랩/힙합', 'R&B/Soul', '인디음악', '록/메탈', '트로트', '포크/블루스'];
  const Hashtag = ['좋아요', '#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'];
  const Year = new Array(18).fill(1992).map((el, idx) => String(el + idx));
  const loadingTime = (Math.random() + 1) * 1000;
  const [isScrollCnt, setIsScrollCnt] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState([]);
  const [result, setResult] = useState([]);
  const [subSort, setSubSort] = useState({
    title: 'none',
    artist: 'none',
    date: 'none',
    like: 'none'
  });
  const plainList = { All: '모든 노래', Like: '좋아요' };
  console.log('🎶', result, '\n🚦', subSort, '\n📌', typeState, '\n🧲', searchState, '\nℹ️', information);

  useEffect(() => {
    setIsSorted(searchState);
  }, [searchState]);

  useEffect(() => {
    dispatch(changeHeader([true, true]));
    setIsSorted(songsBulkState);
  }, [songsBulkState]);

  useEffect(() => {
    setResult(isSorted);
  }, [isSorted]);

  useEffect(() => {
    if (typeState === 'All') setIsSorted(songsBulkState);
    if (typeState === 'Like') {
      setIsSorted(
        songsBulkState.slice()
          .filter((song) => song.hashtagLike[0][1])
          .sort((a, b) => b.hashtagLike[0][1] - a.hashtagLike[0][1])
      );
    }
    Genre.forEach((el) => {
      if (typeState === el) {
        setIsSorted(
          songsBulkState.slice()
            .filter((song) => {
              const genreList = song.genre.split(', ');
              for (let i = 0; i < genreList.length; i++) {
                if (genreList[i] === typeState) return true;
              }
              return false;
            })
        );
      }
    });
    Hashtag.forEach((el, idx) => {
      if (typeState === el) {
        setIsSorted(
          songsBulkState.slice()
            .filter((song) => song.hashtagLike[idx][1])
            .sort((a, b) => b.hashtagLike[idx][1] - a.hashtagLike[idx][1])
        );
      }
    });
    Year.forEach((el) => {
      if (typeState === el) {
        setIsSorted(
          songsBulkState.slice()
            .filter((song) => song.year === Number(typeState))
        );
      }
    });
    setIsScrollCnt(1);
    setSubSort({
      title: 'none',
      artist: 'none',
      date: 'none',
      like: 'none'
    });
  }, [typeState]);

  window.onscroll = () => {
    const scrollLocation = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    if ((fullHeight <= scrollLocation + windowHeight) && (Math.ceil(result.length / 10) > isScrollCnt)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsScrollCnt(isScrollCnt + 1);
      }, loadingTime);
    }
  };
  const handleSubSort = (e) => {
    const standard = e.target.innerText;
    if (standard === '제목') {
      if (subSort.title === 'none') {
        setSubSort({
          title: 'for',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => a.title.localeCompare(b.title)));
        console.log('🔴 handleSubSort: title(for)');
      } else if (subSort.title === 'for') {
        setSubSort({
          title: 'back',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => b.title.localeCompare(a.title)));
        console.log('🔴 handleSubSort: title(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === '아티스트') {
      if (subSort.artist === 'none') {
        setSubSort({
          title: 'none',
          artist: 'for',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => a.artist.localeCompare(b.artist)));
        console.log('🟠 handleSubSort: artist(for)');
      } else if (subSort.artist === 'for') {
        setSubSort({
          title: 'none',
          artist: 'back',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => b.artist.localeCompare(a.artist)));
        console.log('🟠 handleSubSort: artist(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === '발매일') {
      if (subSort.date === 'none') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'for',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => a.date.replace('.', '') - b.date.replace('.', '')));
        console.log('🟡 handleSubSort: date(for)');
      } else if (subSort.date === 'for') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'back',
          like: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => b.date.replace('.', '') - a.date.replace('.', '')));
        console.log('🟡 handleSubSort: date(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === '좋아요') {
      if (subSort.like === 'none') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'for'
        });
<<<<<<< HEAD
        setResult(isSorted.slice().sort((a, b) => a.hashtagLike[0][1] - b.hashtagLike[0][1]));
        console.log('🟡 handleSubSort: date(for)');
=======
        setResult(isSorted.slice().sort((a, b) => b.hashtagLike[0][1] - a.hashtagLike[0][1]));
        console.log('🟡 handleSubSort: like(for)');
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
      } else if (subSort.like === 'for') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'back'
        });
<<<<<<< HEAD
        setResult(isSorted.slice().sort((a, b) => b.hashtagLike[0][1] - a.hashtagLike[0][1]));
        console.log('🟡 handleSubSort: date(back)');
=======
        setResult(isSorted.slice().sort((a, b) => a.hashtagLike[0][1] - b.hashtagLike[0][1]));
        console.log('🟡 handleSubSort: like(back)');
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'none'
        });
        setResult(isSorted);
      }
    }
  };
  const handleSongDetail = (song) => history.push({ pathname: `/song:id=${song.id}` });

  return (
    <SongListWrapper>
      <GlobalStyle />
      <div className='songlist'>
        {typeState === 'No Result' || result.length === 0
<<<<<<< HEAD
          ? <div className='box no-result'>검색 결과가 존재하지 않습니다.</div>
          : <>
            <div className='type'>{typeState}</div>
=======
          ? <div className='no-result'>검색 결과가 존재하지 않습니다.</div>
          : <>
            {Object.keys(plainList).includes(typeState)
              ? <div className='type'>{plainList[typeState]}</div>
              : ( 1992 <= Number(typeState) && Number(typeState) <= 2009 
                  ? 
                    <YearContainer>
                      <MessageContainer
                        show={Colors.mediumGray}
                      >
                        <div className='message'>해당 연도 인기곡 Top 30을 선보입니다.</div>
                        <FontAwesomeIcon icon={faQuestionCircle} size='xs' color={Colors.mediumGray} />
                      </MessageContainer>
                      <YearType>{typeState}</YearType>
                    </YearContainer>
                  : <div className='type'>{typeState}</div>
                )}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
            <div className='field-container'>
              <div className='field'>
                <div className='grid-item field-album' />
                <div className='grid-item field-title' onClick={handleSubSort}>
                  제목
                  <img className='arrow-image' src={`/image/arrow${subSort.title}.png`} />
                </div>
                <div className='grid-item field-artist' onClick={handleSubSort}>
<<<<<<< HEAD
                  아티스트
=======
                  &nbsp;&nbsp;아티스트
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
                  <img className='arrow-image' src={`/image/arrow${subSort.artist}.png`} />
                </div>
                <div className='grid-item field-date' onClick={handleSubSort}>
                  발매일
                  <img className='arrow-image' src={`/image/arrow${subSort.date}.png`} />
                </div>
                <div className='grid-item field-like' onClick={handleSubSort}>
                  좋아요
                  <img className='arrow-image' src={`/image/arrow${subSort.like}.png`} />
                </div>
              </div>
            </div>
            <div className='list'>
              {result && result.map((song, idx) => {
                if ((idx + 1) <= (isScrollCnt * songNumber)) {
                  return (
                    <div className='song-container' key={song.id}>
                      <div className='song-info-container' onClick={() => handleSongDetail(song)}>
                        <img className='info album_art' src={song.album_art} alt={song.title} loading='lazy' />
                        <div className='info title scrollable'>{song.title}</div>
<<<<<<< HEAD
                        <div className='info artist scrollable'>{song.artist}</div>
=======
                        <div className='info artist scrollable'>&nbsp;&nbsp;{song.artist}</div>
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
                        <div className='info date'>{song.date}</div>
                        <div className='info like'>
                          {song.userHashtagLikes && song.userHashtagLikes.includes(1)
                            ? <FontAwesomeIcon icon={faHeart} size='xs' color='red' />
                            : <FontAwesomeIcon icon={farHeart} size='xs' color='red' />}
                          {' '}{song.hashtagLike[0][1]}
                        </div>
                        <div className='hashtagBox'>
                          {song.hashtagLike.map((tag, idx) => {
                            return (
                              <div key={idx}>
                                {tag[0] === '좋아요' || tag[1] === 0
                                  ? null
                                  : <HashTag
                                      borderColor={song.userHashtagLikes && song.userHashtagLikes.includes(idx + 1) ? 'none' : Colors.mediumGray}
                                      backgroundColor={song.userHashtagLikes && song.userHashtagLikes.includes(idx + 1) ? Colors.darkGray : 'white'}
                                      textColor={song.userHashtagLikes && song.userHashtagLikes.includes(idx + 1) ? 'white' : Colors.darkGray}
                                      key={idx}
                                    >
                                    {tag[0]} {tag[1]}
                                    </HashTag>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              {isLoading &&
                <LoadingWrpper>
                  <TypeWriterEffect
                    onInit={(typewriter) => {
                      typewriter
                        .typeString('로딩 중입니다...')
                        .pauseFor(1000)
                        .start();
                    }}
                  />
                  {/* <div className='loading'>Loading...</div> */}
<<<<<<< HEAD
                </LoadingWrpper>
              }
=======
                </LoadingWrpper>}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
            </div>
          </>}
      </div>
    </SongListWrapper>
  );
}

export default SongList;

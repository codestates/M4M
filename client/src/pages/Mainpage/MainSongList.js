import styled from 'styled-components';
import { changeHeader } from '../../redux/action';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { media } from '../../components/utils/_media-queries';
import { Colors } from '../../components/utils/_var';
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
  .no-result {
    color: ${Colors.black};
    font-family: 'Arial';
    font-size: .9rem;
    padding-top: 2rem;
  }
  .arrow-image {
    height: .9rem;
    vertical-align: middle;
    margin-left: .5rem;
    padding-bottom: .2rem;
  }
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
    text-align: right;
    color: ${Colors.darkGray};
    font-family: 'Arial';
    font-size: 1.1rem;
    /* background-color: yellow; */
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
    margin: 0 auto 0em;
    justify-content: center;
    align-items: center;
    margin-bottom: -5px;
    /* background-color: yellow; */
  }
  .field-container > div {
    margin: 0 0 .3rem;
  }
  .field {
    display: grid;
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
  }
  .field .grid-item {
    text-align: left;
    font-family: 'Arial';
    color: ${Colors.gray};
  }
  .grid-item {
    font-size: .8rem;
    align-self: center;
  }
  .grid-item:hover {
    cursor: pointer;
  }
  .field-title {
    padding: auto;
    margin-left: .5rem;
  }
  .song-container > div {
    /* margin: .5rem 0; */
    margin: 0;
  }
  .song-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .song-info-container {
    display: grid;
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
    cursor: pointer;
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
  .title {
    margin-left: .5rem;
  }
  .date, .like {
    color: ${Colors.gray};
  }
  .hashtagBox {
    margin-top: 1rem;
    margin-left: .4rem;
    grid-row: 2;
    grid-column: 2 / end;
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
  const plainList = {All: '모든 노래', Like: '좋아요'};
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
        setResult(isSorted.slice().sort((a, b) => b.hashtagLike[0][1] - a.hashtagLike[0][1]));
        console.log('🟡 handleSubSort: like(for)');
      } else if (subSort.like === 'for') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none',
          like: 'back'
        });
        setResult(isSorted.slice().sort((a, b) => a.hashtagLike[0][1] - b.hashtagLike[0][1]));
        console.log('🟡 handleSubSort: like(back)');
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
      <div className='songlist'>
        {typeState === 'No Result' || result.length === 0
          ? <div className='box no-result'>검색 결과가 존재하지 않습니다.</div>
          : <>
            {Object.keys(plainList).includes(typeState) 
            ? <div className='type'>{plainList[typeState]}</div>
            : <div className='type'>{typeState}</div>}
            <div className='field-container'>
              <div className='field'>
                <div className='grid-item field-album' />
                <div className='grid-item field-title' onClick={handleSubSort}>
                  제목
                  <img className='arrow-image' src={`/image/arrow${subSort.title}.png`} />
                </div>
                <div className='grid-item field-artist' onClick={handleSubSort}>
                  아티스트
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
                        <div className='info artist scrollable'>{song.artist}</div>
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
                </LoadingWrpper>
              }
            </div>
          </>}
      </div>
    </SongListWrapper>
  );
}

export default SongList;

import styled from 'styled-components';
import { changeHeader } from '../../redux/action';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Colors } from '../../components/utils/_var';

axios.defaults.withCredentials = true;

const SongListWrapper = styled.div`
  button {
    margin: 10px;
  }
  .songlist {
    margin-left: 1rem;
  }
  .sort {
    display: flex;
    justify-content: center;
  }
  .box {
    margin: .5rem;
  }
  .span-none {
    display:inline-block; 
    width: 12px;
    height: 12px;
    border: 8px solid transparent;
  }
  .span-for {
    display:inline-block; 
    width: 12px;
    height: 12px;
    border: 8px solid transparent;
    border-bottom: 8px solid black; 
  }
  .span-back {
    display:inline-block; 
    width: 12px;
    height: 12px;
    border: 8px solid transparent;
    border-top: 8px solid black; 
  }
  .loadingWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading {
    width: 200px;
    animation: typing 1500ms steps(10), blink 500ms step-end infinite alternate;
    overflow: hidden;
    border-right: 4px solid;
    font-size: 36px;
  }

  @keyframes typing {
    from { width: 0 }
  }
      
  @keyframes blink {
    50% { border-color: transparent }
  }

  .scrollable::-webkit-scrollbar {
    background: ${Colors.beige};
    height: 10px;
  }
  .scrollable::-webkit-scrollbar-thumb {
    visibility: hidden;
  }
  .scrollable::-webkit-scrollbar-thumb:hover {
    /* visibility: visible; */
    border-top: .5px solid;
    border-bottom: .5px solid;
    border-left: .5px solid;
    border-right: 1px solid;
    cursor: all-scroll;
  }
  .field-container {
    display: flex;
    margin: .75rem auto 0em;
    justify-content: center;
    align-items: center;
    margin-bottom: -5px;
  }
  .field-container > div, input {
    margin: .5rem 0;
  }
  .field {
    display: grid;
    grid-template-columns: 15% 27% 27% 12% 12%;
    grid-column-gap: 8px;
    margin: .75rem auto 0em;
    padding: .2rem .15rem;
    width: 75vw;
    border: solid 1px;
    /* background-color: ${Colors.beige}; */
    /* background-color: ${Colors.black}; */
  }
  .field .grid-item {
    text-align: center;
    color: ${Colors.black};
    color: #fff;
    color: ${Colors.black};
    border: solid 1px black;
    /* border: solid 1px white; */
  }
  .grid-item {
    font-size: .8rem;
  }
  .field-album {
    /* visibility: hidden; */
  }
  .song-container > div, input {
    margin: .5rem 0;
  }
  .song-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .song-info-container {
    display: grid;
    grid-template-columns: 15% 27% 27% 12% 12%;
    grid-column-gap: 8px;
    margin: 0rem auto;
    padding: .4rem .15rem;
    width: 75vw;
    border: solid 1px;
    box-shadow: 5px 6px ${Colors.gray};
    background-color: ${Colors.beige};
  }
  .song-info-container:hover {
    cursor: pointer;
  }
  .song-info-container > div:nth-child(-n+5) {
    border: solid 1px;
    /* margin-top: .2rem; */
  }
  .scrollable {
    overflow-x: auto;
    white-space : nowrap;
  }
  .album_art {
    margin: auto 1rem auto .5rem;
    width: 7rem;
    height: auto;
    grid-row: 1 / 4;
  }
  .title {
    width: 100%;
    font-size: .8rem;
    text-align: left;
  }
  .artist {
    width: 100%;
    font-size: .7rem;
    text-align: left;
  }
  .date {
    width: 100%;
    font-size: .9rem;
  }
  .like {
    width: 100%;
    color: ${Colors.black};
    font-size: .9rem;
  }
  .hashtagBox {
    margin-top: .75rem;
    grid-row: 2;
    grid-column: 2 / end;
  }
  .hashtag {
    float: left;
    margin: auto .2rem .2rem;
    padding: .2rem;
    border: solid 1px;
    border-radius: 5px;
    background-color: white;
    color: black;
    font-size: .7rem;
  }
  .grid-item:not(:first-of-type):not(:last-of-type):hover {
    cursor: pointer;
  }
`;

const HashTag = styled.div`
  float: left;
  margin: auto .2rem .2rem;
  padding: .2rem;
  border: solid 1px;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
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
    date: 'none'
  });
  console.log('🎶', result, '\n🚦', subSort, '\n📌', typeState, '\n🧲', searchState, '\nℹ️', information);

  useEffect(() => {
    setIsSorted(searchState);
  }, [searchState]);

  useEffect(() => {
    dispatch(changeHeader([true, true]));
    setIsSorted(songsBulkState);
  }, [songsBulkState, dispatch]);

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
      date: 'none'
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
    if (standard === 'title') {
      if (subSort.title === 'none') {
        setSubSort({
          title: 'for',
          artist: 'none',
          date: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => a.title.localeCompare(b.title)));
        console.log('🔴 handleSubSort: title(for)');
      } else if (subSort.title === 'for') {
        setSubSort({
          title: 'back',
          artist: 'none',
          date: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => b.title.localeCompare(a.title)));
        console.log('🔴 handleSubSort: title(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === 'artist') {
      if (subSort.artist === 'none') {
        setSubSort({
          title: 'none',
          artist: 'for',
          date: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => a.artist.localeCompare(b.artist)));
        console.log('🟠 handleSubSort: artist(for)');
      } else if (subSort.artist === 'for') {
        setSubSort({
          title: 'none',
          artist: 'back',
          date: 'none'
        });
        setResult(isSorted.slice().sort((a, b) => b.artist.localeCompare(a.artist)));
        console.log('🟠 handleSubSort: artist(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none'
        });
        setResult(isSorted);
      }
    } else if (standard === 'date') {
      if (subSort.date === 'none') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'for'
        });
        setResult(isSorted.slice().sort((a, b) => a.date.replace('.', '') - b.date.replace('.', '')));
        console.log('🟡 handleSubSort: date(for)');
      } else if (subSort.date === 'for') {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'back'
        });
        setResult(isSorted.slice().sort((a, b) => b.date.replace('.', '') - a.date.replace('.', '')));
        console.log('🟡 handleSubSort: date(back)');
      } else {
        setSubSort({
          title: 'none',
          artist: 'none',
          date: 'none'
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
          ? <div className='box no-result'>No Result</div>
          : <>
            <div className='box type'><h1>{typeState}</h1></div>
            <div className='field-container'>
              <div className='field'>
                <div className='grid-item field-album'>앨범</div>
                <div className={'grid-item field-title' + subSort.title} onClick={handleSubSort}>
                  title<span className={'span-' + subSort.title} />
                </div>
                <div className={'grid-item field-artist' + subSort.artist} onClick={handleSubSort}>
                  artist<span className={'span-' + subSort.artist} />
                </div>
                <div className='grid-item field-date' onClick={handleSubSort}>
                  date<span className={'span-' + subSort.date} />
                </div>
                <div className='grid-item field-like'>좋아요</div>
              </div>
            </div>
            <div className='list'>
              {result && result.map((song, idx) => {
                if ((idx + 1) <= (isScrollCnt * songNumber)) {
                  return (
                    <div className='song-container' key={song.id}>
                      <div className='song-info-container' onClick={() => handleSongDetail(song)}>
                        <img className='album_art' src={song.album_art} alt={song.title} loading='lazy' />
                        <div className='title scrollable'>{song.title}</div>
                        <div className='artist scrollable'>{song.artist}</div>
                        <div className='date'>{song.date}</div>
                        <div className='like'>
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
                <div className='loadingWrapper'>
                  <div className='loading'>Loading...</div>
                </div>}
            </div>
          </>}
      </div>
    </SongListWrapper>
  );
}

export default SongList;

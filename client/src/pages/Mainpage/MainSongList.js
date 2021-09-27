import styled from 'styled-components';
import { getSongsBulk } from '../../redux/action';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

axios.defaults.withCredentials = true;

const SongListWrapper = styled.div`
  button {
    margin: 10px;
  }
  .songlist {
    width: 80vw;
    justify-content: center;
    align-items: center;
  }
  .sort {
    display: flex;
    justify-content: center;
  }
  .sub-nav {
    cursor: pointer;
  }
  .sub-sort-off {
    background-color: beige;
    transition-duration: 500ms;
  }
  .sub-sort-on {
    background-color: lightcoral;
    transition-duration: 500ms;
  }
  .box {
    margin: 10px;
    padding: 10px;
    background-color: lightgray;
    border: 10px solid purple;
  }
  .song { 
    display: flex;
    background-color: #fff0db;
    cursor: pointer;
  }
  .song:nth-child(2n) { 
    background-color: #ffe2bd;
  }
  .song:hover { 
    background-color: #ffc67a;
  }
  .sub-container-1 {
    display: flex;
  }
  .song-album_art {
    width: 150px;
    height: 150px;
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
`;

function SongList () {
  const dispatch = useDispatch();
  const typeState = useSelector(state => state.typeReducer).navType;
  const songsBulkState = useSelector(state => state.songsBulkReducer).songsBulk;
  const songNumber = 10;
  // console.log('⭐️', typeState);
  // console.log('🎶', songsBulkState);
  const Genre = ['발라드', '댄스', '랩/힙합', 'R&B/Soul', '인디음악', '록/메탈', '트로트', '포크/블루스'];
  const Hashtag = ['좋아요', '#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'];
  const Year = new Array(18).fill(1992).map((el, idx) => String(el + idx));
  const loadingTime = (Math.random() + 1) * 1000;
  const [isScrollCnt, setIsScrollCnt] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState([]);
  const [result, setResult] = useState([]);
  const [subSort, setSubSort] = useState({
    title: false,
    artist: false,
    date: false
  });
  console.log('🎶', result);

  useEffect(() => {
    setIsSorted(songsBulkState);
  }, [songsBulkState])

  useEffect(() => {
    setResult(isSorted);
  }, [isSorted]);

  useEffect(() => {
    if (typeState === 'All') setIsSorted(songsBulkState);
    if (typeState === 'Like') 
      setIsSorted(
        songsBulkState.slice()
        .filter((song) => song.hashtagLike[0][1])
        .sort((a, b) => b.hashtagLike[0][1] - a.hashtagLike[0][1])
      );
    Genre.forEach((el) => {
      if(typeState === el) {
        setIsSorted(
          songsBulkState.slice()
          .filter((song) => {
            const genreList = song.genre.split(', ');
            for (let i = 0; i < genreList.length; i++) {
              if (genreList[i] === typeState) return true
            }
          })
        );
      }
    });
    Hashtag.forEach((el, idx) => {
      if(typeState === el) {
        setIsSorted(
          songsBulkState.slice()
          .filter((song) => song.hashtagLike[idx][1])
          .sort((a, b) => b.hashtagLike[idx][1] - a.hashtagLike[idx][1])
        );
      }
    });
    Year.forEach((el) => {
      if(typeState === el) {
        setIsSorted(
          songsBulkState.slice()
          .filter((song) => song.year === Number(typeState))
        );
      }
    });
    setIsScrollCnt(1);
    setSubSort({
      title: false,
      artist: false,
      date: false
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
      }, loadingTime)
    }
  }

  const handleSubSort = (e) => {
    const standard = e.target.innerText;
    if (standard === 'title') {
      if (!subSort.title) {
        setSubSort({
          title: true,
          artist: false,
          date: false
        })
        setResult(isSorted.slice().sort((a, b) => a.title.localeCompare(b.title)));
        console.log('🔴 handleSubSort: title');
      } else {
        setSubSort({
          title: false,
          artist: false,
          date: false
        })
        setResult(isSorted);
      }
    } else if (standard === 'artist') {
      if (!subSort.artist) {
        setSubSort({
          title: false,
          artist: true,
          date: false
        })
        setResult(isSorted.slice().sort((a, b) => a.artist.localeCompare(b.artist)));
        console.log('🟠 handleSubSort: artist');
      } else {
        setSubSort({
          title: false,
          artist: false,
          date: false
        })
        setResult(isSorted);
      }
    } else if (standard === 'date') {
      if (!subSort.date) {
        setSubSort({
          title: false,
          artist: false,
          date: true
        })
        setResult(isSorted.slice().sort((a, b) => a.date.replace('.', '') - b.date.replace('.', '')));
        console.log('🟡 handleSubSort: date');
      } else {
        setSubSort({
          title: false,
          artist: false,
          date: false
        })
        setResult(isSorted);
      }
    }
  }
  const handleLike = (e) => {
    const userLike = e.target.getAttribute('value');
    console.log(userLike);
    if (!userLike) {
      // * network comm. : postLike
      // * this.song.userLike = true;
      e.target.innerText = '👍' + `${Number(e.target.innerText.split('👍')[1]) + 1}`;
    } else {
      // * networ comm. : deleteLike
      // * this.song.useLike = false || null;
      e.target.innerText = '👍' + `${Number(e.target.innerText.split('👍')[1]) - 1}`;
    }
  }
  const handleSongDetail = () => {
    // * link to song detail page
    console.log('🔸 link to song detail page')
  }

  return (
    <SongListWrapper>
      <div className='songlist'>
        {typeState === 'No Result'
          ? <div className='box no-result'>No Result</div>
          :
          <>
            <div className='box type'><h1>{typeState}</h1></div>
            <div className='box sort'>
              <div className={subSort.title ?'box sub-nav sub-sort-on' : 'box sub-nav sub-sort-off'} onClick={handleSubSort}>title</div>
              <div className={subSort.artist ?'box sub-nav sub-sort-on' : 'box sub-nav sub-sort-off'} onClick={handleSubSort}>artist</div>
              <div className={subSort.date ?'box sub-nav sub-sort-on' : 'box sub-nav sub-sort-off'} onClick={handleSubSort}>date</div>
            </div>
            <div className='box list'>
              {result.map((song, idx) => {
                if ((idx + 1) <= (isScrollCnt * songNumber)) { return(
                  <div className='box song' key={idx+1} onClick={handleSongDetail}>
                    <img className='song-album_art' src={song.album_art} alt={song.title} loading='lazy' />
                    <div className='box container'>
                      <div className='box sub-container-1'>
                        <div className='box song-title'>{song.title}</div>
                        <div className='box song-artist'>{song.artist}</div>
                        <div className='box song-date'>{song.date}</div>
                        <div 
                          className={song.userLike ? 'box song-like pressed' : 'box song-like unpressed'} 
                          value={song.userLike}
                          onClick={handleLike}
                        >
                          👍{song.hashtagLike[0][1]}
                        </div>
                      </div>
                      <div className='box sub-container-2'>
                        <div className='box song-hashtag'>#Hashtag
                          {Hashtag.map((tag, idx) => {
                            if (idx !== 0) {
                              return (
                                <div key={idx+1}>{tag}: {song.hashtagLike[idx] || 0}</div>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              })}
              {isLoading && 
                <div className='loadingWrapper'>
                  <div className='loading'>Loading...</div>
                </div>
              }
            </div>
          </>
        }
      </div>
    </SongListWrapper>
  );
}

export default SongList;

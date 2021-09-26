import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  .box {
    margin: 10px;
    padding: 10px;
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
  const typeState = useSelector(state => state.typeReducer).navType;
  const songsBulkState = useSelector(state => state.songsBulkReducer).songsBulk;
  const songNumber = 10;
  // console.log('⭐️', typeState);
  // console.log('🎶', songsBulkState);
  const Hashtag = ['좋아요', '#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'];
  const loadingTime = (Math.random() + 1) * 1000;
  const [isScrollCnt, setIsScrollCnt] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState([]);

  useEffect(() => {
    setIsSorted(songsBulkState);
  }, [songsBulkState])

  window.onscroll = () => {
    const scrollLocation = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    if ((fullHeight <= scrollLocation + windowHeight) && (Math.ceil(songsBulkState.length / 10) >= isScrollCnt)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsScrollCnt(isScrollCnt + 1);
      }, loadingTime)
    }
  }

  const sortBy = (e) => {
    const standard = e.target.innerText;
    if (standard === 'title') {
      setIsSorted(isSorted.slice().sort((a, b) => a.title.localeCompare(b.standard)));
      console.log('🔴 sortby title: ', isSorted);
    } else if (standard === 'artist') {
      setIsSorted(isSorted.slice().sort((a, b) => a.artist.localeCompare(b.artist)));
      console.log('🟠 sortby artist: ', isSorted);
    } else if (standard === 'date') {
      setIsSorted(isSorted.slice().sort((a, b) => a.date.replace('.', '') - b.date.replace('.', '')));
      console.log('🟡 sortby date: ', isSorted);
    }
  }
  const handleLike = () => {
    axios
    .get(process.env.REACT_APP_API_URL + '/my-like', { headers: { 'Content-Type': 'application/json'} })
    .then(console.log)
    .catch(console.log);
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
              <div className='box sub-nav' onClick={sortBy}>title</div>
              <div className='box sub-nav' onClick={sortBy}>artist</div>
              <div className='box sub-nav' onClick={sortBy}>date</div>
            </div>
            <div className='box list'>
              {isSorted.map((song, idx) => {
                if ((idx + 1) <= (isScrollCnt * songNumber)) { return(
                  <div className='box song' key={idx+1}>
                    <img className='song-album_art' src={song.album_art} alt={song.title} loading='lazy' />
                    <div className='box container'>
                      <div className='box sub-container-1'>
                        <div className='box song-title'>{song.title}</div>
                        <div className='box song-artist'>{song.artist}</div>
                        <div className='box song-date'>{song.date}</div>
                        <div className='box song-like' onClick={handleLike}>👍{song.hashtagLike[0][1]}</div>
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

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Colors, GlobalStyle } from '../../components/utils/_var';
import SideNav from '../../components/SideNav';
import { changeHeader } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { media } from '../../components/utils/_media-queries';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .main {
    /* display: flex; */
    display: inline-block;
    ${media.tablet`display: flex`};
    /* background-color: #f7efe5; */
    min-height: calc(100vh - 41px - 56px);
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
    border-top: 0.5px solid;
    border-bottom: 0.5px solid;
    border-left: 0.5px solid;
    border-right: 1px solid;
    cursor: all-scroll;
  }
  .button-container {
    display: flex;
    margin: 0.5rem auto -0.7rem;
    justify-content: center;
    width: 41.5rem;
    /* background: white; */
  }
  button {
    margin-left: auto;
    word-spacing: -0.2rem;
  }
  button:hover {
    cursor: pointer;
  }
  .field-container {
    display: flex;
    margin: 0.75rem 1rem 0em;
    justify-content: center;
    align-items: center;
    margin-bottom: -20px;
  }
  .field-container > div,
  input {
    margin: 0.5rem 0;
  }
  .field {
    display: grid;
    grid-template-columns: 15% 27% 27% 12% 12%;
    grid-column-gap: 8px;
    margin: 0.75rem auto 0em;
    padding: 0.2rem 0.15rem;
    width: 40rem;
    border: solid 1px;
    background-color: ${Colors.beige};
    background-color: ${Colors.black};
  }
  .select-all,
  .select-one {
    margin-right: 0.5rem;
  }
  .field .grid-item {
    text-align: center;
    color: ${Colors.black};
    color: #fff;
    border: solid 1px white;
  }
  .grid-item {
    font-size: 0.8rem;
  }
  .field-album {
    /* visibility: hidden; */
  }
  .song-container > div,
  input {
    margin: 0.5rem 0;
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
    margin: 0.75rem auto 0em;
    padding: 0.4rem 0.15rem;
    width: 40rem;
    border: solid 1px;
    box-shadow: 5px 6px ${Colors.gray};
    background-color: ${Colors.beige};
  }
  .song-info-container:hover {
    cursor: pointer;
  }
  .song-info-container > div:nth-child(-n + 5) {
    border: solid 1px;
    /* margin-top: .2rem; */
  }
  .scrollable {
    overflow-x: auto;
    white-space: nowrap;
  }
  .album_art {
    margin: auto 1rem auto 0.5rem;
    width: 5.5rem;
    height: auto;
    grid-row: 1 / 4;
  }
  .title {
    width: 100%;
    font-size: 0.8rem;
    text-align: left;
  }
  .artist {
    width: 100%;
    font-size: 0.7rem;
    text-align: left;
  }
  .date {
    width: 100%;
    font-size: 0.9rem;
  }
  .like {
    width: 100%;
    color: ${Colors.black};
    font-size: 0.9rem;
  }
  .hashtagBox {
    margin-top: 0.75rem;
    grid-row: 2;
    grid-column: 2 / end;
  }
  .hashtag {
    float: left;
    margin: auto 0.2rem 0.2rem;
    padding: 0.2rem;
    border: solid 1px;
    border-radius: 5px;
    background-color: white;
    color: black;
    font-size: 0.7rem;
  }
  .message {
    margin-top: 1rem;
    font-size: 0.9rem;
  }
`;

const HashTag = styled.div`
  float: left;
  margin: auto 0.2rem 0.2rem;
  padding: 0.2rem;
  border: solid 1px;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  font-size: 0.7rem;
`;

// =====================================================================
//                                TO DO
// =====================================================================
//
// 1. CSS 개선
//

const GetLikedSong = ({ modal, handleMessage, handleNotice }) => {
  const token = localStorage.getItem('accessToken');
  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [CheckList, setCheckList] = useState([]);
  const [IdList, setIdList] = useState([]);
  const Hashtag = ['좋아요', '#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'];
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => dispatch(changeHeader([true, false])), [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
          // alert('토큰이 만료되었습니다');
          modal();
          setIsLoading(false);
        } else {
          const result = await axios.get(process.env.REACT_APP_API_URL + '/my-like', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setSongList(result.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response.data.message === 'No songs are added to the list') {
          setIsLoading(false);
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  // console.log(songList);

  useEffect(() => {
    const ids = [];
    if (songList.length !== 0) {
      songList.map((song, i) => {
        ids[i] = song.id;
      });
      setIdList(ids);
    }
  }, [songList]);

  const onChangeAll = (e) => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? IdList : []);
  };

  const onChangeEach = (e, id) => {
    // 체크할 시 CheckList에 id값 넣기
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
      // 체크 해제할 시 CheckList에서 해당 id값이 아닌 값만 배열에 넣기
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };

  console.log('checked song id: ' + CheckList);

  // Song Detail 페이지로 연결
  const handleSongClicked = (song) => {
    history.push({
      pathname: `/song:id=${song.id}`
    });
  };

  const handleSongDelete = () => {
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      // alert('토큰이 만료되었습니다');
      modal();
    } else if (CheckList.length > 0) {
      axios
        .delete(process.env.REACT_APP_API_URL + '/my-like', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: {
            songId: CheckList
          }
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .then(() => {
          window.location.reload();
        })
        .catch(console.log);
    } else {
      // alert('곡을 선택해주세요!');
      handleNotice(true);
      handleMessage('곡을 선택해주세요!');
    }
  };

  if (isLoading) return <div>로딩 중입니다...</div>;
  return (
    <Wrapper>
      <GlobalStyle />
      <div className='main'>
        <SideNav />
        <div>
          <div className='button-container'>
            <button onClick={handleSongDelete}>선택 항목 삭제</button>
          </div>
          <div className='field-container'>
            <input
              type='checkbox'
              className='select-all'
              onChange={onChangeAll}
              checked={CheckList.length === IdList.length}
            />
            <div className='field'>
              <div className='grid-item field-album'>앨범</div>
              <div className='grid-item field-title'>제목</div>
              <div className='grid-item field-artist'>가수</div>
              <div className='grid-item field-date'>발매일</div>
              <div className='grid-item field-like'>좋아요</div>
            </div>
          </div>
          <br />
          {songList.length !== 0
            ? (
                songList.map((song, idx) => {
                  return (
                    <div key={idx}>
                      <div className='song-container'>
                        <input
                          type='checkbox'
                          className='select-one'
                          onChange={(e) => onChangeEach(e, song.id)}
                          checked={CheckList.includes(song.id)}
                        />
                        <div className='song-info-container' onClick={() => handleSongClicked(song)}>
                          <img src={song.album_art} alt={song.id} className='album_art' />
                          <div className='title scrollable'>{song.title}</div>
                          <div className='artist scrollable'>{song.artist}</div>
                          <div className='date'>{song.date}</div>
                          <div className='like'>
                            <FontAwesomeIcon icon={faHeart} size='xs' color='red' />{' '}
                            {song.hashtagLike[0][1]}
                          </div>
                          <div className='hashtagBox'>
                            {song.userHashtagLikes &&
                          song.hashtagLike.map((tag, idx) => {
                            return (
                              <div key={song + idx}>
                                {tag[0] === '좋아요'
                                  ? null
                                  : (
                                    <HashTag
                                      backgroundColor={
                                      song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1)
                                        ? Colors.darkGray
                                        : 'white'
                                    }
                                      textColor={
                                      song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1)
                                        ? 'white'
                                        : Colors.darkGray
                                    }
                                    >
                                      {tag[0]} {tag[1]}
                                    </HashTag>
                                    )}
                              </div>
                            );
                          })}
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  );
                })
              )
            : (
              <div className='message'>현재 좋아요를 선택한 곡이 없습니다.</div>
              )}
        </div>
      </div>
    </Wrapper>
  );
};

export default GetLikedSong;

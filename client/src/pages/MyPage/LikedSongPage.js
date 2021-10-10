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
  * {
    box-sizing: border-box;
  }
  .main {
    display: inline-block;
    ${media.tablet`display: flex;`}
    min-height: calc(100vh - 62.39px - 92px);
    ${media.tabletMini`min-height: calc(100vh - 62.39px - 92px);`}
    ${media.tablet`min-height: calc(100vh - 62.39px - 52px);`}
    ${media.laptop`min-height: calc(100vh - 62.39px - 45px);`}
  }
  .loading-container {
    padding-top: 2rem;
    font-family: 'Arial';
  }
  .songlist {
    margin: 0 auto;
    width: 98%;
    max-width: 58rem;
    ${media.tabletMini`padding-right: 0rem; width: 97%;`}
    ${media.tablet`padding-right: 2rem; margin: 0 0; max-width: 38rem;`}  
    ${media.tablet`max-width: 50rem;`}  
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
  .button-container {
    display: flex;
    padding-top: 2rem;
    margin: -1rem 0 .2rem;
    width: 100%;
    ${media.tabletMini`padding-top: 2rem; margin: -1rem 0 .2rem;`}
    ${media.tablet`margin: 0 0 .2rem;`}
    justify-content: right;
    max-width: 58rem;
    text-align: right;
  }
  button {
    margin-left: auto;
    word-spacing: -.1rem;
    font-size: .8rem;
    color: ${Colors.darkGray};
    background: none;
    border: none;
  }
  button:hover {
    cursor: pointer;
    color: ${Colors.purple};
  }
  .field-container {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: -22px;
    width: 100%;
  }
  .field-container > div, input {
    margin: 0 0 .3rem;
  }
  .field {
    display: grid;
    width: 92%;
    grid-template-columns: 15% 27% 26% 15% 12%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 13% 8%; width: 100%;`}
    ${media.tablet`grid-template-columns: 12% 32% 32% 12% auto; width: 100%;`}
    margin: .75rem auto 0;
    padding: .15rem .15rem;
    border: solid 1px ${Colors.lightGray};
    border-left: none;
    border-right: none;
    /* background-color: salmon; */
  }
  .select-all,
  .select-one {
    margin-right: .7rem;
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
  .grid-item:not(:first-of-type){
    padding-left: .2rem;
  }
  .field-album {
    /* visibility: hidden; */
  }
  .field-title {
    padding: auto;
    margin-left: .4rem;
    width: 100%;
    ${media.tabletMini`margin-left: .6rem;`}
  }
  .song-container > div, input {
    margin: 0;
  }
  .song-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .song-info-container {
    display: grid;
    width: 92%;
    grid-template-columns: 15% 27% 26% 15% 12%;
    ${media.tabletMini`grid-template-columns: 11% 32% 30% 13% 8%; width: 100%;`}
    ${media.tablet`grid-template-columns: 12% 32% 32% 12% auto; width: 100%;`}
    margin: 0 auto;
    padding: .4rem .15rem;
    border-bottom: solid 1px ${Colors.lightGray};
    cursor: pointer;
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
  .info:not(:first-of-type){
    padding-left: .2rem;
  }
  .title {
    margin-left: .5rem;
    ${media.tabletMini`padding-left: .3rem;`}
  }
  .date, .like {
    color: ${Colors.gray};
  }
  .hashtagBox {
    margin-top: 1rem;
    margin-left: .4rem;
    grid-row: 2;
    grid-column: 2 / end;
    ${media.tablet`padding-left: .3rem;`}
  }
  .message {
    margin-top: 1.2rem;
    color: ${Colors.black};
    font-family: 'Arial';
    font-size: .9rem;
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

  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
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

  // console.log('checked song id: ' + CheckList);

  // Song Detail 페이지로 연결
  const handleSongClicked = (song) => {
    history.push({
      pathname: `/song:id=${song.id}`
    });
  };

  const handleSongDelete = () => {
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
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
        .then(() => {
          window.location.reload();
        })
        .catch(console.log);
    } else {
      handleNotice(true);
      handleMessage('곡을 선택해주세요!');
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='main'>
        <SideNav />
        {isLoading
          ? <div className='loading-container'>로딩 중입니다...</div>
          : <div className='songlist'>
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
                <div className='grid-item field-album' />
                <div className='grid-item field-title'>제목</div>
                <div className='grid-item field-artist'>가수</div>
                <div className='grid-item field-date'>발매일</div>
                <div className='grid-item field-like'>좋아요</div>
              </div>
            </div><br />
            {songList.length !== 0
              ? songList.map((song, idx) => {
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
                        <img src={song.album_art} alt={song.id} className='info album_art' />
                        <div className='info title scrollable'>{song.title}</div>
                        <div className='info artist scrollable'>{song.artist}</div>
                        <div className='info date'>{song.date}</div>
                        <div className='info like'>
                          <FontAwesomeIcon icon={faHeart} size='xs' color='red' />
                          {' '}{song.hashtagLike[0][1]}
                        </div>
                        <div className='hashtagBox'>
                          {song.userHashtagLikes && song.hashtagLike.map((tag, idx) => {
                            return (
                              <div key={song + idx}>
                                {tag[0] === '좋아요'
                                  ? null
                                  : <HashTag
                                      borderColor={song.userHashtagLikes && song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1) ? 'none' : Colors.mediumGray}
                                      backgroundColor={song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1) ? Colors.darkGray : 'white'}
                                      textColor={song.userHashtagLikes.includes(Hashtag.indexOf(tag[0]) + 1) ? 'white' : Colors.darkGray}
                                    >
                                    {tag[0]} {tag[1]}
                                  </HashTag>}
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
              : <div className='message'>현재 좋아요를 선택한 곡이 없습니다.</div>}
            </div>}
      </div>
    </Wrapper>
  );
};

export default GetLikedSong;

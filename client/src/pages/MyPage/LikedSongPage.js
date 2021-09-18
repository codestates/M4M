import axios from 'axios';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Colors, GlobalStyle } from '../../components/utils/_var';
// import SideNav from '../../components/Mainpage/MainSideNav';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
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
  .button-container {
    display: flex;
    margin: .5rem auto -.7rem;
    justify-content: center;
    width: 41.5rem;
    /* background: white; */
  }
  button {
    margin-left: auto;
    word-spacing: -.2rem;
  }
  button:hover {
    cursor: pointer;
  }
  .field-container {
    display: flex;
    margin: .75rem auto 0em;
    justify-content: center;
    align-items: center;
    margin-bottom: -20px;
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
    width: 40rem;
    border: solid 1px;
    background-color: ${Colors.beige};
    background-color: ${Colors.black};
  }
  .select-all,
  .select-one {
    margin-right: .5rem;
  }
  .field .grid-item {
    text-align: center;
    color: ${Colors.black};
    color: #fff;
    border: solid 1px white;
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
    margin: .75rem auto 0em;
    padding: .4rem .15rem;
    width: 40rem;
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
    width: 5.5rem;
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
    color: red;
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
  .message {
    margin-top: 1rem;
    font-size: .9rem;
  }
`;

const GetLikedSong = () => {
  // const aT = localStorage.getItem('accessToken');
  // axios
  // .get(process.env.REACT_APP_API_URL + '/my-like', {
  //   headers: {
  //     Authorization: `Bearer ${aT}`,
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then((res) => {
  //   console.log('FROM SERVER: ' + res.data.data);
  // })
  // .catch((err) => console.log(err));

  const [CheckList, setCheckList] = useState([]);
  const [IdList, setIdList] = useState([]);
  // const songList = [];
  const songList = {
    data: [
      {
        id: 7,
        title: '그럴때마다',
        artist: '윤종신, 이장우, 조규찬, 김연우, 조삼희, 김창원, 유희열',
        album_art:
          'https://cdnimg.melon.co.kr/cm/album/images/009/45/658/945658_500.jpg/melon/resize/282/quality/80/optimize',
        date: '1996.02',
        hashtagLike: [
          '좋아요 2',
          '#인생곡인 2',
          '#노래방금지곡 1',
          '#가사가재밌는 1',
          '#몸이기억하는 1',
          '#눈물샘자극 1',
          '#영원한18번 1',
          '#추억소환 1'
        ]
      },
      {
        id: 26,
        title: 'Aspirin (아스피린) (12 String Guitar Ver.)',
        artist: '걸',
        album_art:
          'https://cdnimg.melon.co.kr/cm/album/images/000/03/156/3156_500.jpg/melon/resize/282/quality/80/optimize',
        date: '1995.10',
        hashtagLike: [
          '좋아요 0',
          '#영원한18번 1',
          '#추억소환 1'
        ]
      },
      {
        id: 74,
        title: '사랑을 위하여',
        artist: '김종환',
        album_art: 'https://cdnimg.melon.co.kr/cm/album/images/003/82/274/382274_500.jpg/melon/resize/282/quality/80/optimize',
        date: '1997.06',
        hashtagLike: [
          '좋아요 3',
          '#인생곡인 2',
          '#추억소환 1',
          '#눈물샘자극 1'
        ]
      }
    ]
  };

  useEffect(() => {
    const ids = [];
    if (songList.length !== 0) {
      songList.data.map((song, i) => {
        ids[i] = song.id;
      });
      setIdList(ids);
    }
  }, []);

  const onChangeAll = (e) => {
    // 체크할 시 CheckList에 id 값 전체 넣기, 체크 해제할 시 CheckList에 빈 배열 넣기
    setCheckList(e.target.checked ? IdList : []);
  };
  const onChangeEach = (e, id) => {
    console.log(id);
    // 체크할 시 CheckList에 id값 넣기
    if (e.target.checked) {
      setCheckList([...CheckList, id]);
    // 체크 해제할 시 CheckList에서 해당 id값이 아닌 값만 배열에 넣기
    } else {
      setCheckList(CheckList.filter((checkedId) => checkedId !== id));
    }
  };
  const handleSongClicked = (song) => {
    console.log('ID of the clicked song: ', song.id);
    // axios.get(process.env.REACT_APP_API_URL + `/song?query=${song.id}`, {
    //   headers: {
    //     Authorization: `Bearer ${aT}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then((res) => {
    //   console.log(res.data.message);
    // })
    axios.get(process.env.REACT_APP_API_URL + `/title?query=${song.title}`)
    // axios.get(process.env.REACT_APP_API_URL + `/mainpage`)
      .then((res) => {
        console.log(res.data.data);
      });
  };
  const handleSongDelete = () => {
    // console.log(CheckList);
    if (CheckList.length > 0) {
      axios.delete(process.env.REACT_APP_API_URL + '/my-like', {
        data: {
          userId: 9,
          songId: CheckList
        }
        // headers: {
        //   Authorization: `Bearer ${aT}`,
        //   'Content-Type': 'application/json'
        // }
      })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch(console.log);
    } else {
      alert('곡을 선택해주세요!');
    }
  };

  return (
    <Wrapper>
      {/* <SideNav /> */}
      <GlobalStyle />
      <div>
        <div className='button-container'>
          <button onClick={handleSongDelete}>선택 항목 삭제</button>
        </div>
        <div className='field-container'>
          <input type='checkbox' className='select-all' onChange={onChangeAll} checked={CheckList.length === IdList.length} />
          <div className='field'>
            <div className='grid-item field-album'>앨범</div>
            <div className='grid-item field-title'>제목</div>
            <div className='grid-item item-2 field-artist'>가수</div>
            <div className='grid-item field-date'>발매일</div>
            <div className='grid-item field-like'>좋아요</div>
          </div>
        </div><br />
        {
        songList.length !== 0
          ? songList.data.map((song) => {
            return (
              <>
                <div className='song-container'>
                  <input type='checkbox' className='select-one' onChange={(e) => onChangeEach(e, song.id)} checked={CheckList.includes(song.id)} />
                  <div className='song-info-container' onClick={() => handleSongClicked(song)}>
                    <img src={song.album_art} alt={song.id} className='album_art' />
                    <div className='title scrollable'>{song.title}</div>
                    <div className='artist scrollable'>{song.artist}</div>
                    <div className='date'>{song.date}</div>
                    <div className='like'>♥ {song.hashtagLike[0].split(' ')[1]}</div>
                    <div className='hashtagBox'>
                      {song.hashtagLike.map((el) => {
                        el = el.split(' ');
                        return (
                          <>
                            {
                            el[0] === '좋아요'
                              ? null
                              : <div className='hashtag'>{el[0]} {el[1]}</div>
                            }
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <br />
                </div>
              </>
            );
          })
          : (
            <div className='message'>현재 좋아요를 선택한 곡이 없습니다.</div>
            )
      }
      </div>
    </Wrapper>
  );
};

export default GetLikedSong;

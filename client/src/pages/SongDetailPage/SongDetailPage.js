import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Comments from './Comments';
import Hashtags from './HashtagLikes';
import CustomizedInfo from './CustomizedInfo';
import CustomizedInfoTop from './CustomizedInfoTop';
import { Colors, GlobalStyle } from '../../components/utils/_var';
import { media } from '../../components/utils/_media-queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { changeHeader } from '../../redux/action';
import Typewriter from 'typewriter-effect';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .main {
    display: flex;
    min-height: calc(100vh - 41px - 56px);
    font-family: 'Arial';
  }
  .loading-container {
    margin: 0 1rem;
  }
  .container {
    width: 95%;
    margin: -1rem auto 0;
    ${media.tabletMini`min-width: 460px; max-width: 750px; margin: 0 auto;`}
    ${media.tablet`width: 43rem; max-width: 1024px; margin: 0 auto;`}
    ${media.laptop`width: 43rem; margin: 1.3rem auto;`}
  }
  .space {
    height: 1rem;
    ${media.tabletMini`height: .2rem;`}
    ${media.tablet`height: .5rem;`}
    margin-bottom: 1rem;
  }
  .top-container {
    display: grid;
    grid-template-columns: 31% 67%;
    grid-gap: 8px;
    padding: 0rem;
  }
  .album_art {
    width: 100%;
    align-self: center;
    margin-bottom: -.28rem;
    margin-top: .5rem;
    ${media.tabletMini`padding-top: .5rem; margin-top: 0;`}
    padding-top: 0;
  }
  .title,
  .artist {
    width: 100%;
    text-align: left;
    line-height: 1.3rem;
  }
  .title {
    margin: .3rem .15rem;
    font-family: 'Arial';
    font-size: .9rem;
    ${media.tabletMini`font-size: 1rem; padding-top: .2rem;`}
    ${media.tablet`font-size: 1.1rem;`}
    ${media.laptop`font-size: 1.1rem; padding-top: .1rem;`}
  }
  .artist {
    margin-bottom: .5rem;
    margin-left: .3rem;
    font-family: 'Arial';
    font-size: .82rem;
    ${media.tabletMini`font-size: .87rem;`}
    ${media.tablet`font-size: .9rem;`}
    color: ${Colors.darkGray};
  }
  .field-container {
    line-height: 1.3rem;
    display: flex;
    font-size: .8rem;
  }
  .field-container > .field {
    margin-left: .3rem;
  }
  .field-container > .field, .others {
    color: ${Colors.gray};
    font-size: .8rem;
    ${media.tabletMini`font-size: .82rem;`}
  }
  .field {
    width: 4.3rem;
    text-align: left;
    font-family: 'Arial';
  }
  .lyrics-container > .field {
    margin-bottom: .8rem;
    font-size: .9rem;
    ${media.tabletMini`font-size: .95rem;`}
  }
  .others {
    text-align: left;
    font-family: 'Arial';
    color: ${Colors.darkGray};
  }
  .bottom-container {
    display: inline;
    ${media.tabletMini`display: grid; grid-template-columns: 0 53% 45%;`}
    ${media.tablet`display: grid; grid-template-columns: 0 55% 42%;`}
    grid-gap: 8px;
    margin: 1rem auto 0;
    padding: .4rem .15rem;
  }
  .lyrics {
    text-align: left;
    font-family: 'Arial';
    font-size: .82rem;
    ${media.tabletMini`font-size: .87rem;`}
    line-height: 1.45rem;
    color: ${Colors.gray};
  }
  .lyrics-button {
    margin-top: .5rem;
    grid-row: 2;
    grid-column: 1 / end;
    justify-self: center;
    width: 5rem;
    word-spacing: .1rem;
    background-color: transparent;
    border: none;
    line-height: 1rem;
    font-family: 'Arial';
    font-size: .7rem;
    ${media.tabletMini`font-size: .75rem;`}
    color: ${Colors.gray};
  }
  .lyrics-button:hover {
    cursor: pointer;
  }
`;

const SongDetail = ({ modal, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.userReducer).token;
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [songInfo, setSongInfo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  useEffect(() => {
    // console.log('song detail page');
  }, [location]);

  const songId = Number(location.pathname.split('id=')[1]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!token) {
          const result = await axios.get(process.env.REACT_APP_API_URL + `/song?query=${songId}`);
          setSongInfo(result.data.data);
          setIsLoading(false);
        } else {
          const result = await axios.get(process.env.REACT_APP_API_URL + `/song?query=${songId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setSongInfo(result.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.message === 'No songs are found') {
          history.push({
            pathname: '/'
          });
        }
      }
    };
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState({
    lineNum: 13,
    buttonContent: '펼치기',
    icon: faAngleDown
  });

  const { lineNum, buttonContent, icon } = isOpen;

  const comments = songInfo.comments || [];
  if (comments) {
    comments.map((comment) => {
      comment[2] = comment[2].replace('T', ' ').slice(0, 16);
    });
  }

  const handleLyricsClicked = () => {
    if (lineNum === 13) {
      setIsOpen({
        lineNum: eval(songInfo.lyrics.split('\n').length),
        // lineNum: 100,
        buttonContent: '접기',
        icon: faAngleUp
      });
    } else {
      setIsOpen({
        lineNum: 13,
        buttonContent: '펼치기',
        icon: faAngleDown
      });
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='space' />
      {isLoading
        ? <div className='main'>
            <div className='loading-container'>
              <Typewriter
                options={{
                  strings: ['로딩 중입니다...'],
                  autoStart: true,
                  loop: true
                }}
              />
            </div>
          </div>
        : <div className='container'>
          <div className='top-container'>
            <a href={songInfo.album_art} target='_blank' rel='noreferrer'>
              <img src={songInfo.album_art} alt={songInfo.id} className='album_art' />
            </a>
            <div className='song-info-container'>
              <div className='title'>{songInfo.title}</div>
              <div className='artist'>{songInfo.artist}</div>
              <div className='field-container'>
                <div className='field'>앨범</div>
                <div className='others'>{songInfo.album}</div>
              </div>
              <div className='field-container'>
                <div className='field'>발매일</div>
                <div className='others'>{songInfo.date}</div>
              </div>
              <div className='field-container'>
                <div className='field'>장르</div>
                <div className='others'>{songInfo.genre}</div>
              </div>
              <Hashtags
                songInfo={songInfo}
                modal={modal}
                handleMessage={handleMessage}
                handleNotice={handleNotice}
              />
            </div>
          </div>
          <div className='bottom-container'>
            <CustomizedInfoTop
              songInfo={songInfo}
              handleMessage={handleMessage}
              handleNotice={handleNotice}
            />
            <div className='lyrics-container'>
              <div className='field'>가사</div>
              {songInfo.lyrics &&
                songInfo.lyrics.split('\n').map((line, idx) => {
                  return idx < lineNum
                    ? (
                      <div className='lyrics' key={idx}>
                        {line}
                        <br />
                      </div>
                      )
                    : null;
                })}
            </div>
            <button className='lyrics-button' onClick={handleLyricsClicked}>
              {buttonContent} <FontAwesomeIcon icon={icon} size='1x' color='#b2b2b2' />
            </button>
            <CustomizedInfo
              songInfo={songInfo}
              handleMessage={handleMessage}
              handleNotice={handleNotice}
            />
          </div>
          <Comments
            comments={comments}
            songId={songInfo.id}
            modal={modal}
            handleMessage={handleMessage}
            handleNotice={handleNotice}
          />
        </div>}
    </Wrapper>
  );
};

export default SongDetail;

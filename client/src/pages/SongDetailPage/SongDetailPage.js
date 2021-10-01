import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Comments from './Comments';
import Hashtags from './HashtagLikes';
import CustomizedInfo from './CustomizedInfo';
// import SideNav from '../components/Mainpage/MainSideNav';
import { Colors, Size, GlobalStyle } from '../../components/utils/_var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { changeHeader } from '../../redux/action';
import { useDispatch } from 'react-redux';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .top-container {
    display: grid;
    grid-template-columns: 31% 68%;
    grid-column-gap: 8px;
    margin: 1.2rem auto 0em;
    padding: 0rem;
    width: ${Size.container};
    border: solid 1px ${Colors.borderColor};
  }
  .album_art {
    width: 13rem;
    margin-bottom: -0.28rem;
    padding: 0;
    align-self: center;
    border-right: solid 1px ${Colors.borderColor};
  }
  .title,
  .artist {
    text-align: left;
    line-height: 1.3rem;
    margin-left: 0.3rem;
  }
  .title {
    margin-top: 0.3rem;
    font-size: 1.1rem;
  }
  .artist {
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    color: ${Colors.darkGray};
  }
  .field-container {
    line-height: 1.3rem;
    display: flex;
    font-size: 0.8rem;
  }
  .field-container > .field {
    margin-left: 0.3rem;
  }
  .field {
    text-align: left;
    width: 4.3rem;
    /* background-color: yellow; */
  }
  .lyrics-container > .field {
    margin-bottom: 0.8rem;
    /* color: red; */
    font-size: 0.95rem;
  }
  .others {
    text-align: left;
    font-size: 0.8rem;
    font-family: 'Arial';
    color: ${Colors.darkGray};
  }
  .bottom-container {
    display: grid;
    grid-template-columns: 65% 34%;
    grid-column-gap: 8px;
    margin: 1rem auto 0em;
    padding: 0.4rem 0.15rem;
    width: ${Size.container};
    /* border: solid 1px; */
  }
  .lyrics {
    text-align: left;
    font-family: 'Arial';
    font-size: 0.9rem;
    line-height: 1.3rem;
    color: ${Colors.darkGray};
  }
  .lyrics-button {
    margin-top: 0.5rem;
    grid-row: 2;
    grid-column: 1 / end;
    justify-self: center;
    width: 5rem;
    word-spacing: 0.1rem;
    background-color: transparent;
    border: none;
    line-height: 1rem;
    font-family: 'Arial';
    font-size: 0.75rem;
    color: ${Colors.gray};
  }
  .lyrics-button:hover {
    cursor: pointer;
  }
`;

const SongDetail = ({ modal }) => {
  const information = JSON.parse(localStorage.getItem('userinfo'));
  const token = localStorage.getItem('accessToken');
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [songInfo, setSongInfo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => dispatch(changeHeader([true, false])), [dispatch]);

  useEffect(() => {
    // console.log('song detail page');
  }, [location]);

  const songId = Number(location.pathname.split('id=')[1]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!information) {
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
            pathname: '/mainpage'
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

  if (isLoading) return <div>로딩 중입니다...</div>;
  return (
    <Wrapper>
      <GlobalStyle />
      {/* <SideNav /> */}
      <div className="top-container">
        <a href={songInfo.album_art} target="_blank" rel="noreferrer">
          <img src={songInfo.album_art} alt={songInfo.id} className="album_art" />
        </a>
        <div className="song-info-container">
          <div className="title">{songInfo.title}</div>
          <div className="artist">{songInfo.artist}</div>
          <div className="field-container">
            <div className="field">앨범</div>
            <div className="others">{songInfo.album}</div>
          </div>
          <div className="field-container">
            <div className="field">발매일</div>
            <div className="others">{songInfo.date}</div>
          </div>
          <div className="field-container">
            <div className="field">장르</div>
            <div className="others">{songInfo.genre}</div>
          </div>
          <Hashtags songInfo={songInfo} information={information} modal={modal} />
        </div>
      </div>
      <div className="bottom-container">
        <div className="lyrics-container">
          <div className="field">가사</div>
          {songInfo.lyrics &&
            songInfo.lyrics.split('\n').map((line, idx) => {
              return idx < lineNum ? (
                <div className="lyrics" key={idx}>
                  {line}
                  <br />
                </div>
              ) : null;
            })}
        </div>
        <button className="lyrics-button" onClick={handleLyricsClicked}>
          {buttonContent} <FontAwesomeIcon icon={icon} size="1x" color="#b2b2b2" />
        </button>
        <CustomizedInfo songInfo={songInfo} information={information || null} />
      </div>
      <Comments comments={comments} information={information} songId={songInfo.id} modal={modal} />
    </Wrapper>
  );
};

export default SongDetail;

import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Noti from './components/Notification';
import Landing from './pages/Landing';
import Main from './pages/Mainpage/Main';
import Footer from './components/Footer';
import Recommendation from './pages/RecommendationPage/Recommendation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GetLikedSong from './pages/MyPage/LikedSongPage';
import Mypage from './pages/MyPage/UserInfoPage';
import MoveTop from './components/MoveTop';
import SongDetail from './pages/SongDetailPage/SongDetailPage';
import Modal from './components/Modal';
import Notice from './components/Notice';
import MediaSearchbar from './components/MediaSearchbar';

const AppWrapper = styled.div`
  *, *:before, *:after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .App {
    font-family: 'NeoDunggeunmo';
    text-align: center;
  }
  .fixed-container {
    position: fixed;
    top: 0;
    z-index: 10;
    height: 3.9rem;
    background-color: white;
  }
  .space {
    margin-bottom: 3rem;
  }
`;

function App () {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [openNotice, setOpenNotice] = useState(false);
  const isLogin = useSelector((state) => state.userReducer).token;
  const [mediaState, setMediaState] = useState('deactive');
  const [barState, setBarState] = useState('bar-active');
  const [scrolled, setScrolled] = useState(false);

  const maintainMediaState = () => {
    if (window.innerWidth >= 768) setMediaState('deactive');
  };

  useEffect(() => window.addEventListener('resize', maintainMediaState));

  const handleMediaState = () => {
    if (mediaState === 'active') setMediaState('deactive');
    if (mediaState === 'deactive') setMediaState('active');
  };

  const handleBarState = () => {
    if (barState === 'bar-active') setBarState('bar-deactive');
    if (barState === 'bar-deactive' && mediaState === 'deactive') setBarState('bar-active');
  };

  const handleSongMediaState = () => {
    setMediaState('deactive');
  };

  const handleSongBarState = () => {
    if (window.innerWidth < 768) setBarState('bar-deactive');
  };

  const resBarState = () => {
    if (window.innerWidth < 768) setBarState('bar-deactive');
  };

  const maintainBarState = () => {
    if (window.innerWidth >= 768) setBarState('bar-active');
    else setBarState('bar-deactive');
  };

  useEffect(() => window.addEventListener('resize', maintainBarState));

  useEffect(() => {
    if (window.innerWidth < 768) setBarState('bar-deactive');
  }, []);

  useEffect(() => {
    const handleScrolled = () => {
      if (!scrolled && window.scrollY > 30) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= 30) {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScrolled);
    return () => {
      window.removeEventListener('scroll', handleScrolled);
    };
  }, [scrolled]);

  const handleLoginModalOpen = () => {
    setOpenLogin(true);
  };
  const handleSignupModalOpen = () => {
    setOpenSignup(true);
  };
  const handleLoginModalClose = () => {
    setOpenLogin(false);
  };
  const handleSignupModalClose = () => {
    setOpenSignup(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  const handleNotice = (boolean) => {
    setOpenNotice(boolean);
  };

  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className='App'>
          <div className='fixed-container'>
            <MediaSearchbar
              mediaState={mediaState}
              handleMediaState={handleMediaState}
              handleBarState={handleBarState}
            />
            <Header
              login={handleLoginModalOpen}
              signup={handleSignupModalOpen}
              modal={handleModalOpen}
              handleMessage={handleMessage}
              handleNotice={handleNotice}
              handleMediaState={handleMediaState}
              handleSongMediaState={handleSongMediaState}
              handleSongBarState={handleSongBarState}
              barState={barState}
              handleBarState={handleBarState}
              resBarState={resBarState}
            />
          </div>
          <div className='space' />
          {openModal ? <Modal handleModal={handleModalClose} login={handleLoginModalOpen} /> : null}
          <Noti />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/mainpage' component={Main} />
            <Route
              path='/recommendpage'
              render={() =>
                <Recommendation
                  handleMessage={handleMessage}
                  handleNotice={handleNotice}
                />}
            />
            <Route path='/mylike'>
              {isLogin
                ? <GetLikedSong
                    modal={handleModalOpen}
                    handleMessage={handleMessage}
                    handleNotice={handleNotice}
                  />
                : <Redirect to='/' />}
            </Route>
            <Route path='/myinfo'>
              {isLogin
                ? <Mypage
                    modal={handleModalOpen}
                    handleMessage={handleMessage}
                    handleNotice={handleNotice}
                  />
                : <Redirect to='/' />}
            </Route>
            <Route
              path='/song:id' render={() => (
                <SongDetail
                  modal={handleModalOpen}
                  handleMessage={handleMessage}
                  handleNotice={handleNotice}
                />
              )}
            />
            <Redirect to='/' />
          </Switch>
          {openNotice
            ? (
              <Notice
                message={message}
                login={handleLoginModalOpen}
                handleNotice={handleNotice}
                handleMessage={handleMessage}
              />
              )
            : null}
          <MoveTop />
          <Footer />
          {openSignup
            ? (
              <Signup
                handleModal={handleSignupModalClose}
                handleMessage={handleMessage}
                handleNotice={handleNotice}
              />
              )
            : null}
          {openLogin
            ? (
              <Login
                handleModal={handleLoginModalClose}
                signup={handleSignupModalOpen}
                handleMessage={handleMessage}
                handleNotice={handleNotice}
              />
              )
            : null}
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

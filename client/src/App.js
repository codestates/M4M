import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import { useEffect, useState } from 'react';
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
  * {
    box-sizing: border-box;
  }
  .App {
    font-family: 'NeoDunggeunmo';
    text-align: center;
  }
`;

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [openNotice, setOpenNotice] = useState(false);
  const [mediaState, setMediaState] = useState('deactive');
  const [barState, setBarState] = useState('bar-active');

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

  const information = JSON.parse(localStorage.getItem('userinfo'));

  const maintainMediaState = () => {
    if (768 <= window.innerWidth) setMediaState('deactive');
  };

  useEffect(() => window.addEventListener('resize', maintainMediaState));

  const handleMediaState = () => {
    if (mediaState === 'active') setMediaState('deactive');
    if (mediaState === 'deactive') setMediaState('active');
  }

  const handleBarState = () => {
    if (barState === 'bar-active') setBarState('bar-deactive');
    if (barState === 'bar-deactive' && mediaState === 'deactive') setBarState('bar-active');
  }

  const resBarState = () => {
    if (window.innerWidth < 768) setBarState('bar-deactive');
  }

  const maintainBarState = () => {
    if (768 <= window.innerWidth) setBarState('bar-active');
    else setBarState('bar-deactive');
  };

  useEffect(() => window.addEventListener('resize', maintainBarState));

  useEffect(() => {
    if (window.innerWidth < 768) setBarState('bar-deactive');
  }, []);

  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className='App'>
          <MediaSearchbar mediaState={mediaState} handleMediaState={handleMediaState} handleBarState={handleBarState} />
          <Header
            login={handleLoginModalOpen}
            signup={handleSignupModalOpen}
            modal={handleModalOpen}
            handleMessage={handleMessage}
            handleNotice={handleNotice}
            handleMediaState={handleMediaState}
            barState={barState}
            handleBarState={handleBarState}
            resBarState={resBarState}
          />
          {openModal ? <Modal handleModal={handleModalClose} login={handleLoginModalOpen} /> : null}
          <Noti />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/mainpage' component={Main} />
            <Route path='/recommendpage' render={() => <Recommendation />} />
            <Route path='/mylike'>
              {information
                ? (
                  <GetLikedSong
                    modal={handleModalOpen}
                    handleMessage={handleMessage}
                    handleNotice={handleNotice}
                  />
                )
                : (
                  <Redirect to='/mainpage' />
                )}
            </Route>
            <Route path='/myinfo'>
              {information
                ? (
                  <Mypage
                    modal={handleModalOpen}
                    handleMessage={handleMessage}
                    handleNotice={handleNotice}
                  />
                )
                : (
                  <Redirect to='/mainpage' />
                )}
            </Route>
            <Route
              path='/song:id'
              render={() => (
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
              <Notice message={message} login={handleLoginModalOpen} handleNotice={handleNotice} />
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

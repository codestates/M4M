import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import { useState } from 'react';
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

const AppWrapper = styled.div`
  * {
    box-sizing: border-box;
  }
  .App {
    font-family: 'NeoDunggeunmo';
    text-align: center;
  }
`;

function App () {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const isLogin = useSelector((state) => state.userReducer).token;

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

  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className='App'>
          <Header
            login={handleLoginModalOpen}
            signup={handleSignupModalOpen}
            modal={handleModalOpen}
          />
          {openModal ? <Modal handleModal={handleModalClose} login={handleLoginModalOpen} /> : null}
          <Noti />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/mainpage' component={Main} />
            <Route path='/recommendpage' render={() => <Recommendation />} />
            <Route path='/mylike'>{isLogin ? <GetLikedSong modal={handleModalOpen} /> : <Redirect to='/' />}</Route>
            <Route path='/myinfo'>{isLogin ? <Mypage modal={handleModalOpen} /> : <Redirect to='/' />}</Route>
            <Route path='/song:id' render={() => <SongDetail modal={handleModalOpen} />} />
            <Redirect to='/' />
          </Switch>
          <MoveTop />
          <Footer />
          {openSignup ? <Signup handleModal={handleSignupModalClose} /> : null}
          {openLogin ? <Login handleModal={handleLoginModalClose} signup={handleSignupModalOpen} /> : null}
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

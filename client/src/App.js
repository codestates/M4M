import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import { useState } from 'react';
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

  const information = JSON.parse(localStorage.getItem('userinfo'));

  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className='App'>
          <Header login={handleLoginModalOpen} signup={handleSignupModalOpen} />
          <Noti />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/mainpage" component={Main} />
            <Route path="/recommendpage" component={Recommendation} />
          </Switch>
          {openSignup ? <Signup handleModal={handleSignupModalClose} /> : null}
          {openLogin
            ? (
              <Login handleModal={handleLoginModalClose} signup={handleSignupModalOpen} />
              )
            : null}
          <Switch>
            <Route path='/mylike'>
              {information ? <GetLikedSong /> : <Redirect to='/mainpage' />}
            </Route>
            <Route path='/myinfo'>{information ? <Mypage /> : <Redirect to='/mainpage' />}</Route>
            <Route path='/song:id' component={SongDetail} />
          </Switch>
            <Redirect to='/' />
          <MoveTop />
          <Footer />
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

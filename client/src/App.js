import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import Header from './components/Header';
import Noti from './components/Notification';
import Main from './pages/Mainpage/Main';
import Footer from './components/Footer';
import Recommendation from './pages/RecommendationPage/Recommendation';
import Signup from './pages/Signup';
import { useState } from 'react';
import Login from './pages/Login';
import GetLikedSong from './pages/MyPage/LikedSongPage';
import Mypage from './pages/MyPage/UserInfoPage';
import SongDetail from './pages/SongDetailPage/SongDetailPage';

const AppWrapper = styled.div`
  * {
    font-family: 'NeoDunggeunmo';
    box-sizing: border-box;
  }
  .App {
    text-align: center;
  }
`;

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const information = JSON.parse(localStorage.getItem('userinfo'));

  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className="App">
          <Header handleModal={handleModalOpen} />
          <Noti />
          <Switch>
            <Route exact path="/" />
            <Route path="/mainpage" component={Main} />
            <Route path="/recommendpage" component={Recommendation} />
          </Switch>
          <Switch>
            <Route path="/signup">
              {openModal ? <Signup handleModal={handleModalClose} /> : null}
            </Route>
          </Switch>
          <Switch>
            <Route path="/login">
              {openModal ? <Login handleModal={handleModalClose} /> : null}
            </Route>
            <Route path="/mylike">
              {information ? <GetLikedSong /> : <Redirect to="/mainpage" />}
            </Route>
            <Route path="/myinfo">
              {information ? <Mypage /> : <Redirect to="/mainpage" />}
            </Route>
            <Route path="/song:id" component={SongDetail} />
          </Switch>
          <Footer />
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from './components/utils/_var';
import Header from './components/Header';
import Noti from './components/Notification';
import Main from './pages/Mainpage/Main';
import Footer from './components/Footer';
import Recommendation from './pages/RecommendationPage/Recommendation';
import GetLikedSong from './pages/MyPage/LikedSongPage';
import Mypage from './pages/MyPage/UserInfoPage';
import Signup from './pages/Signup';
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

function App () {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const information = JSON.parse(localStorage.getItem('userinfo'));
  // console.log(information);

  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className='App'>
          <Header handleModal={handleModalOpen} />
          <Noti />
          <Switch>
            <Route exact path='/' />
            <Route path='/mainpage' component={Main} />
            <Route path='/recommendpage' component={Recommendation} />
            <Route path='/mylike'>
              {information ? <GetLikedSong /> : <Redirect to='/mainpage' />}
            </Route>
            <Route path='/myinfo'>
              {information ? <Mypage /> : <Redirect to='/mainpage' />}
            </Route>
            <Route path='/song:id' component={SongDetail} />
          </Switch>
          <Footer />
        </div>
        {openModal ? <Signup handleModal={handleModalClose} /> : null}
      </AppWrapper>
      {/* <Signup></Signup> */}
    </BrowserRouter>
  );
}

export default App;

import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import Header from './components/Header';
import Noti from './components/Notification';
import Main from './pages/Mainpage/Main';
import Footer from './components/Footer';
import Recommendation from './pages/RecommendationPage/Recommendation';
import Signup from './pages/Signup';
import { useState } from 'react';

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
          </Switch>
          <Footer />
        </div>
      </AppWrapper>
      {openModal ? <Signup handleModal={handleModalClose} /> : null}
    </BrowserRouter>
  );
}

export default App;

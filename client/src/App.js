import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import Header from './components/Header';
import Noti from './components/Notification';
import Main from './components/Mainpage/Main';
import Footer from './components/Footer';
import Recommendation from './pages/RecommendationPage/Recommendation';
import Signup from './pages/Signup';
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers.withCredentials = true;

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
  const [bulkData, setBulkData] =useState([]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
      axios
        .get(process.env.REACT_APP_API_URL + '/mainpage', { headers: { 'Content-Type': 'application/json'} })
        .then((res) => {
          setBulkData(res.data.data);
        })
        .catch(console.log);
  }, []);

  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className='App'>
          <Header handleModal={handleModalOpen} bulkData={bulkData} />
          <Noti />
          <Switch>
            <Route exact path='/' />
            <Route path='/mainpage'>
              <Main />
            </Route>
            <Route path='/recommendpage'>
              <Recommendation />
            </Route>
          </Switch>
          <Footer />
        </div>
      </AppWrapper>
      {openModal ? <Signup handleModal={handleModalClose} /> : null}
    </BrowserRouter>
  );
}

export default App;

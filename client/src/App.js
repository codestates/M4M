import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import Header from './components/Header';
import Noti from './components/Notification';
import Main from './components/Mainpage/Main';
import Footer from './components/Footer';
import Recommendation from './pages/RecommendationPage/Recommendation';

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
  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalStyle />
        <div className='App'>
          <Header />
          <Noti />
          <Switch>
            <Route exact path="/">
            </Route>
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
    </BrowserRouter>
  );
}

export default App;

import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/Mainpage/MainpageSideNav';
import Recommendation from './pages/RecommendationPage/Recommendation';

const AppWrapper = styled.div`
  div,
  button,
  select,
  input {
    font-family: 'NeoDunggeunmo';
  }
  .App {
    margin: 0;
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
          <Footer />
          <SideNav />
          <Switch>
            <Route path='/recommendpage'>
              <Recommendation />
            </Route>
          </Switch>
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

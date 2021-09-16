import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './components/utils/_var';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/Mainpage/MainpageSideNav';

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
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

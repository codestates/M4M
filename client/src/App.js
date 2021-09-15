import styled from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import GlobalFont from "./font/font";
import Header from './components/Header';
import Footer from './components/Footer';

const AppWrapper = styled.div`
  div,
  button,
  select,
  input {
    font-family: 'neodgm';
  }
  .App {
    margin: 0;
    text-align: center;
  }
`

function App () {
  return (
    <BrowserRouter>
      <AppWrapper>
        <GlobalFont />
        <div className="App">
          <Header />
          <Footer />
        </div>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

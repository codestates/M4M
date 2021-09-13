import './App.css';
import { BrowserRouter } from "react-router-dom";
import Header from './basic_component/Header';
import Footer from './basic_component/Footer';

function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

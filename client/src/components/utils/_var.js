import { createGlobalStyle } from 'styled-components';

const Colors = {
  black: '#1c180d',
  darkGray: '#575757',
  gray: '#7a7a7a',
  mediumGray: '#a7a7a7',
  lightGray: '#e0e2e3',
  borderColor: '#ccc',
  textColor: '#1c180d',
  beige: '#f7efe5'
};

const Size = {
  container: '42rem'
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DOSMyungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSMyungjo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: '국립박물관문화재단클래식M';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/국립박물관문화재단클래식M.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'NeoDunggeunmo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'DOSGothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSGothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  body {
    background: ${Colors.beigeColor};
  }
  .app-frame {
    background: ${Colors.beige};
    overflow-y: scroll;
    height: 80vh;
    max-width: 525px;
    min-width: 259px;    
    box-shadow: 0 0 0 1px ${Colors.black} inset; 
    margin: 5px auto 10px;
  }
`;

export { Colors, Size, GlobalStyle };

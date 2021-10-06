import { createGlobalStyle } from 'styled-components';

const Colors = {
  black: '#303030',
  darkGray: '#575757',
  gray: '#7a7a7a',
  mediumGray: '#a7a7a7',
  lightGray: '#e0e2e3',
  shadowColor: '',
  borderColor: '#ccc',
  textColor: '#1c180d',
  beige: '#f7efe5',
  pastelPurple: '#caa6fe',
  purple: '#9c57ff'
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
  @font-face {
    font-family: 'Chicago';
    font-style: normal;
    font-weight: normal;
    src: local('Chicago'), url('./fonts/Chicago.woff') format('woff');
  }
  @font-face {
    font-family:'Pixolde';
    font-style: normal;
    font-weight: 400;
    src: local('Pixolde'), url('./fonts/Pixolde.ttf') format('woff');
  }

  .app-frame {
    /* background: ${Colors.pastelPurple}; */
    overflow-y: scroll;
    padding-top: 1.5rem;
    max-width: 515px;
    min-width: 259px;    
    min-height: calc(100vh - 41px - 56px);
    /* box-shadow: 0 0 0 1px ${Colors.black} inset;  */
    margin: 0 auto;
  }
`;

export { Colors, Size, GlobalStyle };

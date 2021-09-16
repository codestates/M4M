import { createGlobalStyle } from 'styled-components';

const colors = {
  $textColor: '#1c180d',
  $grayColor: '#c7c2bb',
  $beigeColor: '#f7efe5'
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
    background: ${colors.$beigeColor};
  }
  .app-frame {
    height: 97vh;
    max-width: 650px;
    min-width: 319px;
    border: solid 1px;
    margin: 10px auto 10px;
    /* padding: 30px 0; */
  }
`;

export { colors, GlobalStyle };

import { createGlobalStyle } from 'styled-components';
import { media } from './_media-queries';

const Colors = {
  black: '#303030',
  darkGray: '#575757',
  gray: '#7a7a7a',
  mediumGray: '#a7a7a7',
  lightGray: '#e0e2e3',
  borderColor: '#ccc',
  pastelPurple: '#caa6fe',
  purple: '#9c57ff'
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DOSMyungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSMyungjo.woff') format('woff');
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

  .app-frame {
    overflow-y: scroll;
    padding-top: 1.5rem;
    max-width: 515px;
    min-width: 259px;    
    min-height: calc(100vh - 62.39px - 92px);
    ${media.tabletMini`min-height: calc(100vh - 62.39px - 92px);`}
    ${media.tablet`min-height: calc(100vh - 62.39px - 52px);`}
    ${media.laptop`min-height: calc(100vh - 62.39px - 45px);`}
    margin: 0 auto;
  }
`;

export { Colors, GlobalStyle };

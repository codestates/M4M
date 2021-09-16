import { createGlobalStyle } from 'styled-components';
import neodgm from './neodgm.woff';

const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: 'neodgm';
    src: local('nedgm'), url(${ neodgm }) format('woff');
    font-weight: 300;
    font-style: normal;
  }
`
export default GlobalFont;

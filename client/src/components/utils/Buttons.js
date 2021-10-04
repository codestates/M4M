import styled from 'styled-components';
import { media } from './_media-queries';
import { Colors } from './_var';

const StartBtn = styled.div`
  display: block;
  margin: 1.5em auto;
  width: 6em;
  height: 2.5em;
  line-height: 2.5em;
  ${media.tabletMini`width: 6.5em; height: 2.75em; line-height: 2.75em; margin: 2em auto`}
  background: ${Colors.beige};
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 5px;
  border: solid 1px ${Colors.black};
  cursor: pointer;
  
  span {
    display: block;
    /* text-align: center; */
    line-height: inherit;
    letter-spacing: 0.75px;
    font-size: .8em;
    ${media.tabletMini`font-size: .9em`}
    color: ${Colors.black};
  }
  &:hover {
    background: ${Colors.black};
    span {
      color: #fff;
    }
  }
`;

export { StartBtn };

import styled from 'styled-components';
import { media } from '../../components/utils/_media-queries';
import { Colors } from '../../components/utils/_var';

const StartBtn = styled.div`
  display: block;
  cursor: pointer;
  border: 1px solid ${Colors.black};
  margin: 1.5rem auto;
  width: 7.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  font-family: 'Arial';
  ${media.tabletMini`width: 8.2rem; height: 2.75rem; line-height: 2.75rem; margin: 2rem auto`}

  span {
    display: block;
    line-height: inherit;
    letter-spacing: 0.75px;
    font-size: .8rem;
    font-family: 'Arial';
    font-family: 'NeoDunggeunmo';
    ${media.tabletMini`font-size: .9rem`}
    color: ${Colors.black};
  }
  &:hover {
    background-color: ${Colors.black};
    span {
      color: white;
    }
  }
`;

export { StartBtn };

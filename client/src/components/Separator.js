import styled from 'styled-components';
import separator_img from '../images/Landing/separator_img.png';
import { media } from '../components/utils/_media-queries';

const SeparatorWrapper = styled.div`
  .separator {
<<<<<<< HEAD
    height: 64px;
=======
    height: 128px;
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    width: 100%;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
<<<<<<< HEAD
    ${media.tabletMini`height: 128px;`}
    ${media.tabletMini`height: 480px;`}
    ${media.tablet`height: 256px;`}
    ${media.tablet`height: 768px;`}
=======
    ${media.tabletMini`height: 256px;`}
    ${media.tabletMini`width: 480px;`}
    ${media.tablet`width: 768px;`}
>>>>>>> bb06a10f6bee3357cd0cb32847d6c56056e39822
    ${media.laptop`height: 512px;`}
    ${media.laptop`width: 1024px;`}
  }
  .separator-image {
    width: 128px;
    position: relative; 
    top: 50%;
    transform: translateY(-50%);
    animation: sep_bit 3000ms steps(2) infinite;
    @keyframes sep_bit {     
      10%, 30% { width: 141px }
      20%, 40% { width: 124px }
      50% { width: 128px }
      60%, 80% { width: 134px }
      70%, 90% { width: 125px }
    }
  }
`;

function Separator () {
  return (
    <SeparatorWrapper>
      <div className='separator'>
        <img className='separator-image' src={separator_img} alt='separator_img' />
      </div>
    </SeparatorWrapper>
  );
}

export default Separator;

import styled from 'styled-components';
import separator_img from '../images/Landing/separator_img.png';

const SeparatorWrapper = styled.div`
  .separator {
    height: 512px;
    width: 1024px;
    -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .separator-image {
    width: 128px;
    position: relative; 
    top: 50%;
    transform: translateY(-50%);
    animation: sep_bit 3000ms steps(2) infinite
  }
  @keyframes sep_bit {     
    10%, 30% { width: 141px }
    20%, 40% { width: 124px }
    50% { width: 128px }
    60%, 80% { width: 134px }
    70%, 90% { width: 125px }
  }
`;

function Separator () {
  return (
    <SeparatorWrapper>
      <div className='separator'>
        <img className='separator-image' src={separator_img} alt='separator_img'/>
      </div>
    </SeparatorWrapper>
  );
}

export default Separator;

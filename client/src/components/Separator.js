import styled from 'styled-components';
import separatorImg from '../separator_img.png';

const SeparatorWrapper = styled.div`
  .separator {
    height: 256px;
    width: 1024px;
    /* border: 10px solid purple; */
  }
  .separator-image {
    width: 128px;
    position: relative; 
    top: 50%;
    transform: translateY(-50%);
    animation: sep_bit 3000ms steps(2) infinite;
    /* border: 10px solid blue; */
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
        <img className='separator-image' src={separatorImg}/>
      </div>
    </SeparatorWrapper>
  );
}

export default Separator;

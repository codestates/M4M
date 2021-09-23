import styled from 'styled-components';

const MoveTopWrapper = styled.div`
  .move-top {
    position: fixed;
    right: 20px;
    bottom: calc(54px + 0px);
    animation: vertical 1000ms ease-in-out infinite, fadein 2000ms steps(10);
    cursor: pointer;
  }
  @keyframes vertical {
    0% { margin-bottom: 9px; }
    50% { margin-bottom: 11px; }
    100% { margin-bottom: 9px; }
  }
  @keyframes fadein {
    0% { opacity: 0% }
    100% { opacity: 100% }
  }
`;

function MoveTop () {

  const moveTop = () => {
    window.scrollTo ({
      top: 0, 
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <MoveTopWrapper>
      <div className='movetop'>
        <div className='move-top' onClick={moveTop}>
          <div className='arrow'></div>
          <div>TOP</div>
        </div>
      </div>
    </MoveTopWrapper>
  );
}

export default MoveTop;

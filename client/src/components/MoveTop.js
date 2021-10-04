import styled from 'styled-components';
import { useState, useEffect } from 'react';

const MoveTopWrapper = styled.div`
  .init {
    display: none;
  }
  .active {
    animation: fadein 500ms steps(5);
  }
  .deactive {
    animation: fadeout 500ms steps(5) forwards;
    pointer-events: none;
  }
  .move-top {
    position: fixed;
    left: 95%;
    bottom: calc(54px + 0px);
    animation: vertical 1000ms ease-in-out infinite;
    cursor: pointer;
    z-index: 99;
  }
  .arrow {
    width: 24px;
    height: 24px;
    border: 12px solid transparent;
    border-bottom: 18px solid black; 
  }
  @keyframes fadeout {
    from { opacity: 100% }
    to { opacity: 0% }
  }
  @keyframes vertical {
    0% { margin-bottom: 9px; }
    50% { margin-bottom: 11px; }
    100% { margin-bottom: 9px; }
  }
  @keyframes fadein {
    from { opacity: 0% }
    to { opacity: 100% }
  }
`;

function MoveTop () {
  const [moveTopState, setMoveTopState] = useState('init');

  const handleMoveTopState = () => {
    if (window.scrollY > 300) {
      setMoveTopState('active');
    } if (window.scrollY < 300 && moveTopState === 'active') {
      setMoveTopState('deactive');
    }
  };
  const handleMoveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleMoveTopState);
    return () => {
      window.removeEventListener('scroll', handleMoveTopState);
    };
  });

  return (
    <MoveTopWrapper>
      <div className={moveTopState}>
        <div className='move-top' onClick={handleMoveTop}>
          <div className='arrow' />
          <div>TOP</div>
        </div>
      </div>
    </MoveTopWrapper>
  );
}

export default MoveTop;

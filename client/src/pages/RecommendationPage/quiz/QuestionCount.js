import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../../components/utils/_var';

const Wrapper = styled.div`
  .container {
    display: flex;
    margin: 1rem 1.5rem 1rem;
    ${media.tabletMini`margin: 1rem 1.5rem;`}
  }
  .questionCountLeft {
    /* margin-left: 1rem; */
    border-bottom: solid .17rem ${Colors.black};
    /* font-family: '국립박물관문화재단클래식M'; */
    word-spacing: -.2rem;
    font-family: 'NeoDunggeunmo';
    font-size: 1.3rem;
    ${media.tabletMini`font-size: 1.5rem;`}
    ${media.tablet`font-size: 1.75rem;`}
    color: ${Colors.black};
    /* ${media.tabletMini`color: blue;`}
    ${media.tablet`color: red;`}
    ${media.laptop`color: green;`} */
  }
  .questionCountRight {
    height: 80%;
    padding: .3rem .5rem;
    border: solid 1px ${Colors.black};
    border-radius: 5px;
    margin-left: auto;
    font-family: 'NeoDunggeunmo';
    font-size: .8rem;
    color: ${Colors.black};
    font-size: .75rem;
    ${media.tabletMini`font-size: .8rem;`}
  }
`;

const QuestionCount = (props) => {
  return (
    <Wrapper>
      <GlobalStyle />
      <div className='container'>
        <div className='questionCountLeft'>
          <b>Q {props.counter}</b>
        </div>
        <div className='questionCountRight'>
          <b><span>{props.counter}</span> / <span>{props.total}</span></b>
        </div>
      </div>
    </Wrapper>
  );
};

QuestionCount.propTypes = {
  counter: propTypes.number.isRequired,
  total: propTypes.number.isRequired
};

export default QuestionCount;

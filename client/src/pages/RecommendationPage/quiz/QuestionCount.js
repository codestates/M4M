import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../../components/utils/_var';

const Wrapper = styled.div`
  .container {
    display: flex;
    margin: 1em 1.5em;
  }
  .questionCountLeft {
    border-bottom: solid .17em ${Colors.black};
    font-family: '국립박물관문화재단클래식M';
    font-size: 1.3em;
    ${media.tabletMini`font-size: 1.5em`}
    ${media.tablet`font-size: 1.75em`}
    color: ${Colors.black};
    ${media.tabletMini`color: blue`}
    ${media.tablet`color: red`}
    ${media.laptop`color: green`}
  }
  .questionCountRight {
    height: 80%;
    padding: .5em .75em;
    background-color: #e5e4e2;
    border: solid 1px ${Colors.black};
    border-radius: 5px;
    margin-left: auto;
    font-family: 'NeoDunggeunmo';
    font-size: .8em;
    color: ${Colors.black};
    background-color: ${Colors.beige};
    font-size: .75em;
    ${media.tabletMini`font-size: .9em`}
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

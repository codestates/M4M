import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../../components/utils/_var';

const Wrapper = styled.div`
  li {
    list-style-type: none;
  }
  .answerOption {
    text-align: center;
  }
  .answerOptionButton {
    position: absolute;
    width: auto;
    opacity: 0;
  }
  .answerOptionButton,
  .answerOptionLabel {
    display: flex;
    cursor: pointer;
  }
  .answerOptionLabel {
    position: relative;
    margin: 20px auto 10px auto;
    background-color: white;
    border: solid 1px ${Colors.black};
    box-shadow: 4px 5px ${Colors.gray};
    font-family: 'DOSGothic';
    text-align: center;
    color: ${Colors.black};
    font-size: 1em;
    padding: 1.2rem 1.8rem;
    line-height: 1.6rem;
    ${media.tabletMini`font-size: 1em; padding: 1.4rem 2rem; line-height: 1.6rem`}
    ${media.tablet`font-size: 1.1em; padding: 1.75rem 3rem; line-height: 1.7rem`}
    transition-duration: 0.5s;
  }
  .answerOptionLabel:active {
    left: 4px;
    top: 4px;
    box-shadow : none;
  }
`;

const AnswerOption = props => {
  return (
    <Wrapper>
      <GlobalStyle />
      <li className='answerOption'>
        <input
          className='answerOptionButton'
          checked={props.answerType === props.answer}
          id={props.answerType}
          value={props.answerType}
          name={props.answerType}
          disabled={props.answer}
          onChange={props.onAnswerSelected}
          type='radio'
        />
        <label className='answerOptionLabel' htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </li>
    </Wrapper>
  );
};

AnswerOption.propTypes = {
  answerType: propTypes.string.isRequired,
  answerContent: propTypes.string.isRequired,
  answer: propTypes.string.isRequired,
  onAnswerSelected: propTypes.func.isRequired
};

export default AnswerOption;

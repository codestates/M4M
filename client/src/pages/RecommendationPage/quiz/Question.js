import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { Colors, GlobalStyle } from '../../../components/utils/_var';

const Wrapper = styled.div`    
  .row {
    margin-top: 3rem; 
    margin-bottom: -1.5rem;
    ${media.tabletMini`margin-top: 3.7rem; margin-bottom: 0rem;`}
    ${media.tablet`margin-top: 4.2rem; margin-bottom: 0rem;`}
    .col {
      padding: 0 3rem;
      h1 {
        color: ${Colors.black};
        font-size: 1rem;
        ${media.tabletMini`font-size: 1.1rem;`}
        ${media.tablet`font-size: 1.2rem;`}
        font-family: 'NeoDunggeunmo';
        text-align: left;
        line-height: 1.7em;
      }
      h2 {
        color: transparent;
        font-size: 1rem;
        line-height: 0;
      }
    }
  }
`;

const Question = (props) => {
  return (
    <Wrapper>
      <GlobalStyle />
      <div className='row'>
        <div className='col'>
          <h1>{props.content}</h1>
          <h2>this is just an empty content. this is just an empty content. this is just an empty content.</h2>
        </div>
      </div>
    </Wrapper>
  );
};

Question.propTypes = {
  content: propTypes.string.isRequired
};

export default Question;

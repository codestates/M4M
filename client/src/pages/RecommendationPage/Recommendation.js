import React, { Component } from 'react';
import Intro from './Intro';
import Question from './Question';

class Recommendation extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showQuestion: false
    };
    this._onStartClick = this._onStartClick.bind(this);
  }

  renderIntro () {
    return (
      <div>
        <Intro _onStartClick={this._onStartClick} />
      </div>
    );
  }

  renderQuestion () {
    const {handleMessage, handleNotice } = this.props;
  
    return (
      <Question 
        handleMessage={handleMessage}
        handleNotice={handleNotice}
      />
    );
  }

  render () {
    const showQuestion = this.state.showQuestion;
    if (showQuestion) {
      return this.renderQuestion();
    }
    return this.renderIntro();
  }

  _onStartClick () {
    setTimeout(() => this.setState({ showQuestion: !this.state.showQuestion }), 500);
  }
}

export default Recommendation;

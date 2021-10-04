import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import Quiz from './quiz/Quiz';
import Result from './result/Result';
import quizQuestions from './questions/quizQuestions';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  li {
    list-style-type: none;
    max-width: 75%;
    margin: auto;
  }
`;

class Question extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        SongType: {
          A: 0,
          C: 0,
          F: 0,
          H: 0,
          E: 0,
          L: 0,
          W: 0
        }
      },
      resultType: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  // populate app's state using the componentWillMount life cycle event
  componentDidMount () {
    const answerOptions = quizQuestions.map(question => question.answers);
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: answerOptions[0]
    });
  }

  // setting the answer based on the user's selection
  setUserAnswer (answer) {
    const answersCount = this.state.answersCount;
    // console.log(answer);
    // console.log(answersCount);

    const applyAnswer = (answer) => {
      answersCount.SongType[answer] += 1;
      return answersCount;
    };

    this.setState({
      answersCount: applyAnswer(answer),
      answer: answer
    });
  }

  // increment the counter and questionId state
  setNextQuestion () {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  // setting the answer and then setting the next question
  handleAnswerSelected (event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 200);
    } else {
      setTimeout(() => this.setResults(this.getTypeResults()), 200);
    }
  }

  // get results
  getTypeResults () {
    const answerCount = this.state.answersCount;
    const typeAnswer = answerCount.SongType;
    let songType = '';
    if (typeAnswer.A >= typeAnswer.C) {
      songType += 'A';
    } else songType += 'C';
    if (typeAnswer.F) {
      songType += 'F';
    } else if (typeAnswer.H) {
      songType += 'H';
    } else songType += 'E';
    if (typeAnswer.L >= typeAnswer.W) {
      songType += 'L';
    } else songType += 'W';
    return songType;
  }

  // set results
  setResults (resultType) {
    if (resultType.length === 3) {
      axios.post(process.env.REACT_APP_API_URL + '/recommendation', {
        resultType: resultType
      })
        .then((res) => {
          let songList = [];

          if (res.status === 200) {
            // console.log('FROM SERVER: ' + res.data.data);
            songList = res.data.data;
          }

          this.setState({
            resultType: resultType,
            songList: songList
          });
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.message === 'Not enough songs are in the list') {
            this.setState({
              resultType: resultType,
              songList: ['당신의 취향에 맞는 노래를 찾지 못했습니다.']
            });
          }
        });
    }
  }

  // render quiz
  renderQuiz () {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  // render this question page
  render () {
    const resultType = this.state.resultType;
    if (resultType) {
      return this.renderResult();
    }
    return (
      <Wrapper>
        {this.renderQuiz()}
      </Wrapper>
    );
  }

  // render result
  renderResult () {
    return (
      <Result
        resultType={this.state.resultType}
        songList={this.state.songList}
      />
    );
  }
}

export default Question;

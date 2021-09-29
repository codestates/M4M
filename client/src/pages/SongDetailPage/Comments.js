import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CommentPagination from './CommentPagination';
import { Colors, Size, GlobalStyle } from '../../components/utils/_var';
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  .counter {
    width: ${Size.container};
    margin: .5rem auto;
    text-align: left;
    font-size: .9rem;
  }
  .comments-container {
    margin: auto auto 1.2rem;
    width: ${Size.container};
    background-color: #ededed;
    border: solid 1px ${Colors.lightGray};
  }
  .comments-input-container {
    display: grid;
    grid-template-columns: 85% 10%;
    grid-column-gap: 8px;
    margin: 1rem auto;
    width: ${Size.container};
    justify-content: center;
  }
  input {
    height: 4rem;
  }
  .postButton {
    height: 4rem;
    color: #606060;
    border: solid 1px ${Colors.lightGray};
    background: #fff;
    background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ededed));
    background: -moz-linear-gradient(top, #fff, #ededed);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ededed');
  }
  .postButton:hover {
    background: #ededed;
    background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#dcdcdc));
    background: -moz-linear-gradient(top, #fff, #dcdcdc);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#dcdcdc');
  }
  .postButton:active {
    color: #999;
    background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#fff));
    background: -moz-linear-gradient(top, #ededed, #fff);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#ffffff');
  }
  button:hover {
    cursor: pointer;
  }
  textarea {
    border: solid 1px ${Colors.lightGray};
    padding: .4rem;
    font-family: 'Arial';
    resize: none;
    height: auto;
  }
`;

// =====================================================================
//                                TO DO
// =====================================================================
//
// 1.
//

const Comments = ({ comments, information, songId }) => {
  const token = localStorage.getItem('accessToken');
  const [newComment, setNewComment] = useState({
    newContent: ''
  });
  const { newContent } = newComment;

  const handleCommentChange = (e) => {
    if (!information) {
      alert('로그인이 필요한 서비스입니다.');
    } else if (e.target.value.length > 300) {
      alert('댓글은 300자 이내로 입력해주세요.');
    } else {
      setNewComment({
        ...newComment,
        newContent: e.target.value
      });
    }
  };

  const waitTime = 60000; // 1 minute
  // let waitTime = 10000; // 10 sec for testing
  const initialTime = localStorage.getItem('initialTime');

  const handlePostClicked = () => {
    if (!information) {
      alert('로그인이 필요한 서비스입니다.');
    } else if (!initialTime || parseInt(initialTime, 10) + waitTime - (new Date()).getTime() < 0) {
      // console.log('nickname: ', information.nickname, 'content: ', newComment);
      if (newContent.length > 300) {
        alert('댓글은 300자 이내로 입력해주세요.');
      } else if (newContent.length === 0) {
        alert('댓글을 입력해주세요');
      } else {
        axios
          .post(process.env.REACT_APP_API_URL + '/comment', {
            userId: information.id,
            songId: songId,
            content: newContent
          }, {
            headers: {
              Authorization: `Bearer ${token}`,

              // JUST FOR TEST PURPOSES
              // Authorization: information.id,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status === 200) {
              // 클라이언트쪽에서 댓글 시간 제한 처리
              localStorage.setItem('initialTime', (new Date()).getTime());
              alert('댓글이 등록되었습니다.');
              setNewComment({
                newContent: ''
              });
              window.location.replace(`/song:id=${songId}`);
            }
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.status === 409) {
              alert('댓글은 중복 입력하실 수 없습니다');
            } else if (err.response.data.message === 'Already reached the limit') {
              alert('댓글은 한 곡당 50개로 제한됩니다.');
            }
          });
      }
    } else {
      alert('도배글 등을 방지하기 위해 1분간 사용이 제한됩니다.\n잠시 후 다시 시도해주세요.');
      setNewComment({
        ...newComment,
        newContent: ''
      });
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className='counter'>댓글 {comments.length}</div>
      <div className='comments-container'>
        <div className='comments-input-container'>
          <textarea
            className='write-comment'
            placeholder='300자 이내 입력 가능'
            onChange={handleCommentChange}
            value={newContent || ''}
          />
          <button className='postButton' type='submit' onClick={handlePostClicked}>등록</button>
        </div>
      </div>
      <CommentPagination information={information} songId={songId} totalComments={comments} />
    </Wrapper>
  );
};

export default Comments;

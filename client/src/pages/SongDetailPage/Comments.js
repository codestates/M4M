import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import CommentPagination from './CommentPagination';
import { media } from '../../components/utils/_media-queries'
import { Colors, GlobalStyle } from '../../components/utils/_var';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .counter {
    min-width: 320px;
    max-width: 479px;
    margin: .5rem auto;
    ${media.tabletMini`min-width: 470px; max-width: 750px;`}
    ${media.tablet`width: 41.7rem; max-width: 1024px;`}
    text-align: left;
    font-family: 'Arial';
    font-size: .9rem;
    color: ${Colors.darkGray};
  }
  .comments-container {
    margin: auto auto 1.2rem;
    min-width: 320px;
    max-width: 479px;
    ${media.tabletMini`min-width: 470px; max-width: 750px;`}
    ${media.tablet`width: 41.7rem; max-width: 1024px;`}
    background-color: #ededed;
    border: solid 1px ${Colors.lightGray};
  }
  .comments-input-container {
    display: grid;
    grid-template-columns: 85% 10%;
    grid-column-gap: 8px;
    margin: .5rem auto;
    min-width: 320px;
    max-width: 479px;
    ${media.tabletMini`min-width: 470px; max-width: 750px; margin: 1rem auto;`}
    ${media.tablet`width: 41.7rem; max-width: 1024px;`}
    ${media.laptop`width: 41.7rem;`}
    justify-content: center;
  }
  .postButton {
    height: 3.5rem;
    margin-left: -1rem;
    ${media.tabletMini`margin-left: 0; height: 4rem;`}
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
    padding: .6rem;
    font-family: 'Arial';
    resize: none;
    height: auto;
    margin-right: 1rem;
    ${media.tabletMini`margin-right: 0;`}
  }
  textarea:focus {
    outline: none;
  }
  textarea::-webkit-input-placeholder {
    color: ${Colors.gray};
    font-size: .8rem;
  }
`;

const Comments = ({ comments, songId, modal, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.userReducer).token;
  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);

  const [newComment, setNewComment] = useState({
    newContent: ''
  });
  const { newContent } = newComment;

  const handleCommentChange = (e) => {
    if (!token) {
      // alert('로그인이 필요한 서비스입니다.');
      handleNotice(true);
      handleMessage('로그인이 필요한 서비스입니다');
    } else if (e.target.value.length > 300) {
      // alert('댓글은 300자 이내로 입력해주세요.');
      handleNotice(true);
      handleMessage('댓글은 300자 이내로 입력해주세요');
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
    if (!token) {
      // alert('로그인이 필요한 서비스입니다.');
      handleNotice(true);
      handleMessage('로그인이 필요한 서비스입니다');
    }
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      // alert('토큰이 만료되었습니다');
      modal();
    } else if (!initialTime || parseInt(initialTime, 10) + waitTime - new Date().getTime() < 0) {
      // console.log('nickname: ', information.nickname, 'content: ', newComment);
      if (newContent.length > 300) {
        // alert('댓글은 300자 이내로 입력해주세요.');
        handleNotice(true);
        handleMessage('댓글은 300자 이내로 입력해주세요');
      } else if (newContent.length === 0) {
        // alert('댓글을 입력해주세요');
        handleNotice(true);
        handleMessage('댓글을 입력해주세요');
      } else {
        axios
          .post(
            process.env.REACT_APP_API_URL + '/comment',
            {
              songId: songId,
              content: newContent
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then((res) => {
            if (res.status === 200) {
              // 클라이언트쪽에서 댓글 시간 제한 처리
              localStorage.setItem('initialTime', new Date().getTime());
              // alert('댓글이 등록되었습니다.');
              setNewComment({
                newContent: ''
              });
              window.location.replace(`/song:id=${songId}`);
            }
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.status === 409) {
              handleNotice(true);
              handleMessage('댓글은 중복 입력하실 수 없습니다');
              // alert('댓글은 중복 입력하실 수 없습니다');
            } else if (err.response.data.message === 'Already reached the limit') {
              // alert('댓글은 한 곡당 50개로 제한됩니다.');
              handleNotice(true);
              handleMessage('댓글은 한 곡당 50개로 제한됩니다');
            }
          });
      }
    } else {
      // alert('도배글 등을 방지하기 위해 1분간 사용이 제한됩니다.\n잠시 후 다시 시도해주세요.');
      handleNotice(true);
      handleMessage('도배글 방지를 위해 1분간 사용이 제한되니 잠시 후 다시 시도해주세요');
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
          <button className='postButton' type='submit' onClick={handlePostClicked}>
            등록
          </button>
        </div>
      </div>
      <CommentPagination
        songId={songId}
        totalComments={comments}
        modal={modal}
        handleMessage={handleMessage}
        handleNotice={handleNotice}
      />
    </Wrapper>
  );
};

export default Comments;

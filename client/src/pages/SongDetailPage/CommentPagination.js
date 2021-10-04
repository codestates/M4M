import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Colors, Size, GlobalStyle } from '../../components/utils/_var';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .comments-container-pagination {
    width: ${Size.container};
    margin: auto;
    /* border: solid 1px; */
    justify-items: center;
  }
  .comment-item {
    display: grid;
    margin: 0.6rem auto;
    padding: 0rem;
    width: ${Size.container};
    border-bottom: 1px solid ${Colors.lightGray};
    grid-template-columns: 20% 71.5%;
    grid-template-areas:
      'nickname comment comment'
      '. date button'
      'page-num page-num page-num';
  }
  .comment-item:last-of-type {
    border-bottom: 1px solid ${Colors.gray};
  }
  .nickname {
    grid-area: nickname;
    padding-right: 0.5rem;
    text-align: left;
    font-size: 0.8rem;
    font-family: 'Arial';
    /* font-family: 'Iropke Batang', serif; */
    color: ${Colors.gray};
  }
  .date {
    grid-area: date;
    text-align: left;
    font-size: 1.1rem;
    margin-bottom: 0.62rem;
    font-family: 'Arial';
    font-family: 'Pixolde';
    color: ${Colors.gray};
  }
  .content {
    grid-area: comment;
    margin-bottom: 1rem;
    padding: 0 0 0.5rem;
    text-align: left;
    color: ${Colors.darkGray};
    font-family: 'Arial';
    font-size: 0.85rem;
  }
  .deleteButton {
    grid-area: button;
    grid-column: 3;
    position: inherit;
    bottom: 0px;
    -ms-transform: translate(0%, -35%);
    transform: translate(0%, -35%);
    width: 3rem;
    text-align: right;
    font-family: 'Arial';
    font-size: 0.75rem;
    color: ${Colors.gray};
    // trash icon size
    /* font-size: .9rem; */
    background: transparent;
    border: none;
  }
  .page-numbers {
    grid-area: page-num;
  }

  ul {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.7rem;
    height: 1.7rem;
    margin-left: 0.8rem;
    padding: 0.8rem;
    border-radius: 50%;
    color: ${Colors.darkGray};
    font-size: 0.9rem;
    font-family: 'Arial';
    font-size: 0.8rem;
  }
  li:hover {
    cursor: pointer;
  }
`;

const CommentPagination = ({ songId, totalComments, modal, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.userReducer).token;
  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);
  const { nickname } = useSelector((state) => state.userReducer).userInfo;

  const [commentList, setCommentList] = useState({
    comments: [],
    currentPage: 1,
    commentsPerPage: 10
  });

  useEffect(() => {
    setCommentList({
      currentPage: 1,
      commentsPerPage: 10,
      comments: totalComments
    });
  }, [totalComments]);
  // console.log(totalComments);

  const { comments, currentPage, commentsPerPage } = commentList;
  // console.log(comments, currentPage, commentsPerPage);

  const handleClick = (number) => {
    // console.log(number);
    setCommentList({
      ...commentList,
      currentPage: Number(number)
    });
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDeleteClicked = (commentContent) => {
    if (!token) {
      // alert('로그인이 필요한 서비스입니다.');
      handleNotice(true);
      handleMessage('로그인이 필요한 서비스입니다.');
    } else {
      // console.log('nickname: ', nickname, 'content: ', commentContent);
      if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
        // alert('토큰이 만료되었습니다');
        modal();
      } else {
        axios
          .delete(process.env.REACT_APP_API_URL + '/comment', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            data: {
              songId: songId,
              content: commentContent
            }
          })
          .then((res) => {
            if (res.status === 200) {
              // alert('댓글이 삭제되었습니다.');
              window.location.replace(`/song:id=${songId}`);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <div className="comments-container-pagination">
        {currentComments.map((comment, idx) => {
          return token && comment[0] === nickname ? (
            <div className="comment-item" key={idx}>
              <div className="nickname">{comment[0]}</div>
              <div className="date">{comment[2]}</div>
              <div className="content">{comment[1]}</div>
              <button className="deleteButton" onClick={() => handleDeleteClicked(comment[1])}>
                {/* <FontAwesomeIcon icon={faTrash} size='1x' color={Colors.mediumGray} /> */}
                삭제
              </button>
            </div>
          ) : (
            <div className="comment-item" key={idx}>
              <div className="nickname">{comment[0]}</div>
              <div className="date">{comment[2]}</div>
              <div className="content">{comment[1]}</div>
            </div>
          );
        })}
        <ul className="page-numbers">
          {pageNumbers.map((number, idx) => {
            return (
              <li
                key={idx}
                style={currentPage === idx + 1 ? { backgroundColor: Colors.lightGray } : null}
                onClick={() => handleClick(number)}>
                {number}
              </li>
            );
          })}
        </ul>
      </div>
    </Wrapper>
  );
};

export default CommentPagination;

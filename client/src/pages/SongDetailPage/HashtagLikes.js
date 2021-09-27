import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Colors } from '../../components/utils/_var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .hashtagBox {
    grid-row: 4;
    grid-column: 2 / end;
  }
`;

const HashTag = styled.div`
  float: left;
  margin: .2rem 0 auto .3rem;
  padding: .27rem;
  border: solid 1px ${Colors.gray};
  border-radius: 10px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  font-size: .7rem;
  
  &:hover {
    cursor: pointer;
  }
`;

const Like = styled.div`
  grid-row: 3;
  width: 2.5rem;
  margin: .2rem 0 .2rem .3rem;
  text-align: left;
  line-height: 1.5rem;
  font-size: 1rem;
  color: ${Colors.darkGray};

  &:hover {
    cursor: pointer;
  }
`;

const Hashtags = ({ songInfo, information }) => {
  // const token = localStorage.getItem('accessToken');
  const { userContent } = songInfo;
  const hashtagLikeList = ['좋아요', '#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'];

  const [hashtagLikes, setHashtagLikes] = useState({});

  // console.log(userContent);

  const userHashtagLikes = {
    좋아요: false,
    '#인생곡인': false,
    '#가사가재밌는': false,
    '#몸이기억하는': false,
    '#눈물샘자극': false,
    '#노래방금지곡': false,
    '#영원한18번': false,
    '#추억소환': false
  };

  userContent && userContent.map(el => {
    return userHashtagLikes[hashtagLikeList[el - 1]] = true;
  });

  useEffect(() => {
    if (userContent) {
      setHashtagLikes(userHashtagLikes);
    }
  }, [userContent]
  );

  let allHashtagLikes = {
    좋아요: 0,
    '#인생곡인': 0,
    '#가사가재밌는': 0,
    '#몸이기억하는': 0,
    '#눈물샘자극': 0,
    '#노래방금지곡': 0,
    '#영원한18번': 0,
    '#추억소환': 0
  };

  if (songInfo.hashtagLike) {
    songInfo.hashtagLike.map(el => {
      if (allHashtagLikes[el[0]] >= 0) {
        allHashtagLikes[el[0]] += el[1];
      }
    });
  }

  allHashtagLikes = Object.entries(allHashtagLikes);

  const handleTagLikeCliked = (hashtagLikeName) => {
    // console.log(hashtagLikes[hashtagLikeName]);
    if (information) {
      if (hashtagLikes[hashtagLikeName]) {
        setHashtagLikes({
          ...hashtagLikes,
          [hashtagLikeName]: false
        });
      } else {
        setHashtagLikes({
          ...hashtagLikes,
          [hashtagLikeName]: true
        });
      }
    }
    
    if (!information) {
      alert('로그인이 필요한 서비스입니다.');
    } else {
      if (hashtagLikes[hashtagLikeName] === true) {
        // console.log('delete', hashtagLikeName);
        axios
          .delete(process.env.REACT_APP_API_URL + '/hashtag', {
            headers: {
              // Authorization: `Bearer ${token}`,
              // JUST FOR TEST PURPOSES
              Authorization: information.id,
              'Content-Type': 'application/json'
            },
            data: {
              id: songInfo.id,
              name: hashtagLikeName
            }
          })
          .then((res) => {
            if (res.status === 200) {
              if (hashtagLikeName === '좋아요') {
                alert('좋아요가 취소되었습니다');
              } else {
                alert('해시태그가 취소되었습니다');
              }
              window.location.replace(`/song:id=${songInfo.id}`);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        // console.log('add', hashtagLikeName);
        axios
          .post(process.env.REACT_APP_API_URL + '/hashtag', {
            id: songInfo.id,
            name: hashtagLikeName
          }, {
            headers: {
              // Authorization: `Bearer ${token}`,

              // JUST FOR TEST PURPOSES
              Authorization: information.id,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status === 200) {
              if (hashtagLikeName === '좋아요') {
                alert('좋아요가 반영되었습니다');
              } else {
                alert('해시태그가 반영되었습니다');
              }
              window.location.replace(`/song:id=${songInfo.id}`);
            }
          })
          .catch((err) => {
            console.log(err.response);
            // console.log('3개 초과');
            if (err.response.data.message === 'You cannot choose over 3 hashtags') {
              alert('해시태그는 3개까지만 등록할 수 있습니다.');
            }
            setHashtagLikes({
              ...hashtagLikes,
              [hashtagLikeName]: false
            });
          });
      }
    }
  };

  return (
    <Wrapper>
      {songInfo.hashtagLike
        ? <Like onClick={() => handleTagLikeCliked(songInfo.hashtagLike[0][0])}>
          {hashtagLikes['좋아요']
            ? <FontAwesomeIcon icon={faHeart} size='1x' color='red' />
            : <FontAwesomeIcon icon={farHeart} size='1x' color='black' />}
          {' '}{songInfo.hashtagLike[0][1]}
          </Like>
        : null}
      {allHashtagLikes.map((el, idx) => {
        return (
          <div key={idx}>
            {el[0] === '좋아요'
              ? null
              : <HashTag
                  onClick={() => handleTagLikeCliked(el[0])}
                  backgroundColor={hashtagLikes[el[0]] ? Colors.darkGray : 'white'}
                  textColor={hashtagLikes[el[0]] ? 'white' : Colors.darkGray}
                >
                {el[0]} {el[1]}
                </HashTag>}
          </div>
        );
      })}
    </Wrapper>
  );
};
export default Hashtags;

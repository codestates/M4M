import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import { Colors } from '../../components/utils/_var';
import { changeHeader, userEdit } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { media } from '../../components/utils/_media-queries';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .main {
    /* display: flex; */
    display: inline-block;
    ${media.tablet`display: flex`};
    min-height: calc(100vh - 41px - 56px);
  }
  .container {
    width: 30rem;
    margin: 1rem 7rem;
    /* background-color: yellow; */
  }
  .mypage-container {
    width: 17rem;
    margin: 1rem 0;
  }
  .greeting {
    font-family: 'Arial';
    margin: 1rem auto 1rem;
    text-align: left;
    font-size: 1.3rem;
  }
  .id-number {
    position: absolute;
    padding: 0.4rem 0.2rem;
    margin: 0.2rem;
    color: ${Colors.gray};
    font-family: 'Arial';
    font-size: 0.9rem;
  }
  input {
    width: 17rem;
    height: 1.8rem;
    margin: 0.2rem auto;
    padding: 0.5rem;
    border-color: ${Colors.lightGray};
    border-width: 0.2px;
    font-family: 'Arial';
  }
  input::-webkit-input-placeholder {
    color: ${Colors.gray};
  }
  input:focus {
    outline: none;
  }
  input:disabled {
    background: ${Colors.lightGray};
    color: ${Colors.gray};
  }
  button {
    /* width: 8rem; */
    margin: 1.5rem 0.2rem;
    padding: 0.4rem 1.5rem;
    /* border: 1px solid ${Colors.black}; */
    border: 1px solid ${Colors.pastelPurple};
    background-color: ${Colors.pastelPurple};
  }
  button:hover {
    cursor: pointer;
    background-color: ${Colors.purple};
    border-color: ${Colors.purple};
    color: white;
  }
  button:last-of-type {
    border: 1px solid ${Colors.black};
    background-color: ${Colors.black};
    color: white;
  }
  button:last-of-type:hover {
    background-color: white;
    color: ${Colors.black};
    border: 1px solid ${Colors.black};
  }
`;

const MyPageField = styled.div`
  margin: 0.7rem auto 0.15rem;
  text-align: left;
  color: ${Colors.black};
  font-size: 0.95rem;
  font-family: 'Arial';

  &:first-of-type {
    padding-top: 1rem;
  }
`;

const AlertMessage = styled.div`
  color: red;
  font-family: 'Arial';

  &:not(:last-of-type) {
    text-align: left;
    font-size: 0.8rem;
  }
  &:last-of-type {
    margin: 0 auto;
    font-size: 0.95rem;
  }
`;

// const Mypage = ({ afterWithdrawal }) => {
const Mypage = ({ modal, handleMessage, handleNotice }) => {
  const token = useSelector((state) => state.userReducer).token;
  const { nickname, email, birthYear, kakao } = useSelector((state) => state.userReducer).userInfo;
  const accessTokenTime = localStorage.getItem('accessTokenTime');
  const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);
  const [checkNickname, setCheckNickname] = useState('ok');
  const [checkPassword, setCheckPassword] = useState('ok');
  const [checkBirthYear, setCheckBirthYear] = useState('ok');
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => dispatch(changeHeader([true, false])), [dispatch]);
  useEffect(() => dispatch(changeHeader([false, false])), [dispatch]);

  const [myInfo, setMyInfo] = useState({
    nickname: '',
    email: email,
    password: '',
    passwordRetype: '',
    birthYear: birthYear,
    kakao: kakao
  });

  const id = nickname.split('#')[1];

  const handleInputValue = (key) => (e) => {
    setMyInfo({ ...myInfo, [key]: e.target.value || '' });
  };

  const isValidNickname = (e) => {
    const regExpSpec = /[~!@#$%^&*()_+|<>?:{}`,.=]/;
    const regExpKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    if (e.target.value.length === 0) {
      if (checkRetypePassword || checkBirthYear === 'ok') {
        setCheckNickname('ok');
        setErrorMsg('');
      } else {
        setCheckNickname('닉네임을 입력해주세요.');
      }
    } else if (regExpKor.test(e.target.value)) {
      setCheckNickname('올바른 한글 형식을 따라주세요');
    } else if (regExpSpec.test(e.target.value)) {
      setCheckNickname('특수문자를 포함하면 안됩니다.');
    } else if (e.target.value.search(/\s/) !== -1) {
      setCheckNickname('공백을 포함하면 안됩니다');
    } else if (e.target.value.length < 2 || e.target.value.length > 15) {
      setCheckNickname('닉네임은 2-15자입니다');
    } else {
      setCheckNickname('ok');

      if (myInfo.password === '' && myInfo.passwordRetype === '') {
        setCheckPassword('ok');
        setCheckRetypePassword(true);
      }
    }
  };

  const isValidPassword = (e) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;

    if (e.target.value === '') {
      if (myInfo.passwordRetype === '' && checkNickname !== 'ok') {
        setCheckPassword('empty');
        setCheckRetypePassword(true);
      } else if (myInfo.passwordRetype === '' && checkNickname === 'ok') {
        setCheckPassword('ok');
        setCheckRetypePassword(true);
        setErrorMsg('');
      } else {
        setCheckPassword('empty');
        setCheckRetypePassword(false);
      }
    } else if (e.target.value !== '') {
      if (myInfo.passwordRetype === e.target.value) {
        setCheckRetypePassword(true);
      } else if (myInfo.passwordRetype !== '' && myInfo.passwordRetype !== e.target.value) {
        setCheckRetypePassword(false);
      }
      if (!regExp.test(e.target.value)) {
        setCheckPassword('no');
      } else {
        setCheckPassword('ok');
      }
    } else {
      setCheckPassword('no');
    }
    // console.log('password :', regExp.test(e.target.value));
  };

  const handleCheckPassword = (e) => {
    if (e.target.value !== '' && e.target.value === myInfo.password) {
      setCheckRetypePassword(true);
      // 비밀번호를 완벽하게 입력했다면 닉네임을 수정할 필요없음
      if (checkNickname === '닉네임을 입력해주세요.') {
        setCheckNickname('ok');
      }
    } else if (e.target.value === '' && myInfo.password === '') {
      setCheckRetypePassword(true);
    } else if (e.target.value === myInfo.password) {
      setCheckRetypePassword(true);
    } else {
      setCheckRetypePassword(false);
    }
  };
  // 올바른 닉네임 입력 && 카카오 생년 비어있음
  const isValidBirthYear = (e) => {
    const today = new Date();
    const year = today.getFullYear();
    // console.log(e.target.value === '');

    if (checkBirthYear === 'ok' && checkNickname === '닉네임을 입력해주세요.') {
      setCheckNickname('ok');
      setErrorMsg('');
    }
    if (e.target.value === '' && checkNickname === 'ok') {
      setCheckBirthYear('ok');
    } else if (Number(e.target.value) >= 1921 && Number(e.target.value) <= year) {
      setCheckBirthYear('ok');
    } else if (isNaN(Number(e.target.value))) {
      setCheckBirthYear('nan');
    } else {
      setCheckBirthYear('no');
    }
  };

  const inputCheck = (key) => (e) => {
    handleInputValue(key)(e);
    setErrorMsg('');
    if (key === 'nickname') {
      isValidNickname(e);
    }
    if (key === 'password') {
      isValidPassword(e);
    }
    if (key === 'birthYear') {
      isValidBirthYear(e);
    }
    if (key === 'passwordRetype') {
      handleCheckPassword(e);
    }
  };

  const handleEditUserRequest = () => {
    // console.log(myInfo);
    if (myInfo.passwordRetype !== myInfo.password) {
      setCheckRetypePassword(false);
    }
    // console.log(checkPassword, checkRetypePassword,checkNickname, checkBirthYear)
    if (kakao && !birthYear && !myInfo.birthYear && myInfo.nickname === '') {
      setErrorMsg('변경할 정보를 입력해주세요.');
    } else if (kakao && birthYear && myInfo.nickname === '') {
      setErrorMsg('변경할 정보를 입력해주세요.');
    } else if (!kakao && myInfo.nickname === '' && myInfo.password === '') {
      setErrorMsg('변경할 정보를 입력해주세요.');
    } else if (
      checkPassword !== 'ok' ||
      !checkRetypePassword ||
      checkNickname !== 'ok' ||
      checkBirthYear !== 'ok'
    ) {
      setErrorMsg('변경할 정보를 올바르게 입력해주세요.');
    } else {
      // console.log('user info has sent to the server');
      if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
        // alert('토큰이 만료되었습니다');
        modal();
      } else {
        axios
          .patch(process.env.REACT_APP_API_URL + '/user-info', myInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status === 200) {
              // alert('회원정보가 수정되었습니다.');
              handleNotice(true);
              handleMessage('회원정보가 수정되었습니다.');
              if (myInfo.nickname === '') {
                myInfo.nickname = nickname;
              } else {
                myInfo.nickname = myInfo.nickname + `#${id}`;
              }
              if (myInfo.password === '') {
                myInfo.password = '';
              }
              dispatch(userEdit(myInfo, token));
              localStorage.setItem('userinfo', JSON.stringify(myInfo));
            }
            // window.location.replace('/myinfo');
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  };

  const history = useHistory();

  const handleWithdrawalRequest = () => {
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      // alert('토큰이 만료되었습니다');
      modal();
    } else {
      handleNotice(true);
      handleMessage('정말 회원탈퇴 하시겠습니까...?');
      // axios
      //   .delete(process.env.REACT_APP_API_URL + '/withdrawal', {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       // alert('회원탈퇴가 완료되었습니다.');
      //       handleNotice(true);
      //       handleMessage('회원탈퇴가 완료되었습니다.');
      //       // afterWithdrawal();

      //       history.push({
      //         pathname: '/mainpage'
      //       });
      //     }
      //     localStorage.clear();
      //   });
    }
  };

  return (
    <Wrapper>
      <div className='main'>
        <SideNav />
        <div className='container'>
          <div className='greeting'>
            {/* {nickname.split('#')[0]} 님, 반갑습니다! */}
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${nickname.split('#')[0]} 님, 반갑습니다!`)
                  .pauseFor(1000)
                  .start();
              }}
            />
          </div>
          <div className='mypage-container'>
            <MyPageField>닉네임</MyPageField>
            <input
              type='text'
              placeholder={nickname.split('#')[0]}
              onChange={inputCheck('nickname')}
            />
            <span className='id-number'>#{nickname.split('#')[1]}</span>
            <AlertMessage>{checkNickname === 'ok' ? null : checkNickname}</AlertMessage>
            <MyPageField>이메일</MyPageField>
            <input disabled value={email} />
            <MyPageField>비밀번호</MyPageField>
            <input
              disabled={kakao ? 'disabled' : null}
              type='password'
              placeholder='영문/숫자 조합 8~10글자'
              onChange={inputCheck('password')}
            />
            <AlertMessage>
              {checkPassword === 'no' ? '올바른 비밀번호 형식이 아닙니다.' : null}
              {checkPassword === 'empty' ? '비밀번호를 입력해주세요.' : null}
            </AlertMessage>
            <MyPageField>비밀번호 확인</MyPageField>
            <input
              disabled={kakao ? 'disabled' : null}
              type='password'
              onChange={inputCheck('passwordRetype')}
            />
            <AlertMessage>
              {checkRetypePassword ? null : '비밀번호가 일치하지 않습니다'}
            </AlertMessage>
            <MyPageField>출생년도</MyPageField>
            {kakao && !birthYear
              ? (
                <>
                  <input onChange={inputCheck('birthYear')} />
                  <AlertMessage>
                    {checkBirthYear === 'no' ? '올바른 범위내의 출생년도를 입력해주세요' : null}
                    {checkBirthYear === 'nan' ? '숫자만 입력해주세요' : null}
                  </AlertMessage>
                </>
                )
              : (
                <input disabled value={birthYear} />
                )}
            <button onClick={handleEditUserRequest}>정보수정</button>
            <button onClick={handleWithdrawalRequest}>회원탈퇴</button>
            <AlertMessage>{errorMsg}</AlertMessage>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Mypage;

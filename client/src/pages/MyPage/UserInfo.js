import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
// import SideNav from '../../components/Mainpage/MainSideNav';
axios.defaults.withCredentials = true;
require('dotenv').config();

const Wrapper = styled.div`
  .mypage_container {
    width: 15rem;
    margin: 2rem auto;
    background-color: white;
  }
  .mypage_info {
    margin: auto;
    text-align: center;
  }
  .mypage_input {
    width: 12rem;
    height: 1.4rem;
  }
  .mypage_btn {
    margin-top: 1rem;
  }
  .check_typed {
    font-size: 1rem;
    color: red;
  }
`;

// function Mypage ({ afterWithdrawal }) {
function Mypage () {
  const [checkNickname, setCheckNickname] = useState('ok');
  const [checkPassword, setCheckPassword] = useState('ok');
  const [checkBirthYear, setCheckBirthYear] = useState('ok');
  const [checkRetypePassword, setCheckRetypePassword] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const information = JSON.parse(localStorage.getItem('userinfo'));
  // const token = localStorage.getItem('accessToken');

  // =========================================================================
  //                         JUST FOR TEST PURPOSES
  // =========================================================================
  //
  // TEST PHASE 1:
  // const information = {
  //   id: 2,
  //   nickname: 'AC#2',
  //   email: 'm3m@gmail.com',
  //   birthYear: 1990,
  //   kakao: false
  // };
  //
  // TEST PHASE 2:
  // localstrage 조작 후 테스트 진행
  // 예: localStorage.userinfo = '{'id':2,'nickname':'테스트#2','email':'m4m@gmail.com','birthYear':1990,'kakao':true,'salt':'d014ad7a47379a482b8f2beb455f5f2525d1b755ce8cdabdb4b0766e73b1030329ee487543e99c27a8980de6e878dd8686a6a3c80d51a7299e1c39a2fca34764','password':'UFMySd9D/pKkO/m0KXZZmPh0bV+c3QHQyvNn8Sev0g4fhviKRUyJFAeRsXXfXDlEvjd7K0TuR7OF9TW1gBDNBQ==','mobile':'01000002222','address':'경기 목감동','createdAt':'2021-09-06T11:17:27.000Z','updatedAt':'2021-09-06T11:17:27.000Z'}'
  //
  // =========================================================================

  // console.log(information);

  const [myInfo, setMyInfo] = useState({
    id: information.id,
    nickname: '',
    password: '',
    passwordRetype: ''
  });

  const handleInputValue = (key) => (e) => {
    setMyInfo({ ...myInfo, [key]: e.target.value });
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
    console.log(myInfo);
    if (myInfo.passwordRetype !== myInfo.password) {
      setCheckRetypePassword(false);
    }
    // console.log(checkPassword, checkRetypePassword,checkNickname, checkBirthYear)
    if (myInfo.nickname === '' && myInfo.password === '' && myInfo.birthYear === '') {
      setErrorMsg('변경할 정보를 입력해주세요.');
    } else if (
      checkPassword !== 'ok' ||
      !checkRetypePassword ||
      checkNickname !== 'ok' ||
      checkBirthYear !== 'ok'
    ) {
      setErrorMsg('변경할 정보를 올바르게 입력해주세요');
    } else {
      console.log('send info to server');
      axios
        .patch(process.env.REACT_APP_API_URL + '/user-info', myInfo, {
          headers: {
            // Authorization: `Bearer ${token}`,
            // JUST FOR TEST PURPOSES
            Authorization: information.id,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then((res) => {
          if (res.status === 200) {
            alert('회원정보가 수정되었습니다');
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const history = useHistory();

  const handleWithdrawalRequest = () => {
    console.log(information.id);
    axios
      .delete (
        process.env.REACT_APP_API_URL + '/withdrawal',
        // { data: null },
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            // JUST FOR TEST PURPOSES
            Authorization: information.id,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert('회원탈퇴가 완료되었습니다');
          // afterWithdrawal();

          // JUST FOR TEST PURPOSES
          history.push({
            pathname: '/mainpage',
          });
        }
        localStorage.removeItem('userinfo');
        localStorage.removeItem('accessToken');
      });
  };

  return (
    <Wrapper>
      {/* <SideNav /> */}
      <div className='Mypage'>
        <div className='mypage_container'>
          <div>
            <div className='mypage_info'>닉네임</div>
            <input
              type='text'
              className='mypage_input'
              placeholder={information.nickname.split('#')[0]}
              onChange={inputCheck('nickname')}
            /><span className='id-number'>#{information.nickname.split('#')[1]}</span>
            <div className='check_typed'>
              {checkNickname === 'ok' ? null : checkNickname}
            </div>
          </div>
          <div>
            <div className='mypage_info'>이메일</div>
            <input
              disabled
              className='mypage_input'
              value={information.email}
            />
            <div className='check_email' />
          </div>
          <div>
            <div className='mypage_info'>비밀번호</div>
            <input
              disabled={information.kakao ? 'disabled' : null}
              type='password'
              placeholder='영문/숫자 조합 8~10글자'
              className='mypage_input'
              onChange={inputCheck('password')}
            />
            <div className='check_typed'>
              {checkPassword === 'no' ? '올바른 비밀번호 형식이 아닙니다.' : null}
              {checkPassword === 'empty' ? '비밀번호를 입력해주세요.' : null}
            </div>
          </div>
          <div>
            <div className='mypage_info'>비밀번호 확인</div>
            <input
              disabled={information.kakao ? 'disabled' : null}
              type='password'
              className='mypage_input'
              onChange={inputCheck('passwordRetype')}
            />
            <div className='check_typed'>
              {checkRetypePassword ? null : '비밀번호가 일치하지 않습니다'}
            </div>
          </div>
          <div>
            <div className='mypage_info'>출생년도</div>
            {
              information.kakao && information.birthYear === null
                ? <>
                  <input
                    className='mypage_input'
                    onChange={inputCheck('birthYear')}
                  />
                  <div className='check_typed'>
                    {checkBirthYear === 'no' ? '올바른 범위내의 출생년도를 입력해주세요' : null}
                    {checkBirthYear === 'nan' ? '숫자만 입력해주세요' : null}
                  </div>
                </>
                : <input
                    disabled
                    className='mypage_input'
                    value={information.birthYear}
                  />
            }

          </div>
          <button className='mypage_btn' id='edit' onClick={handleEditUserRequest}>
            정보수정
          </button>
          <button className='mypage_btn' id='withdraw' onClick={handleWithdrawalRequest}>
            회원탈퇴
          </button>
          <div className='check_typed'>{errorMsg}</div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Mypage;

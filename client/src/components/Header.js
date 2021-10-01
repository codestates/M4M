import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderSearchbar from './HeaderSearchbar';
import { useSelector, useDispatch } from 'react-redux';
import { notify, userLogout } from '../redux/action';
import axios from 'axios';
import { useHistory } from 'react-router';
axios.defaults.withCredentials = true;

const HeaderWrapper = styled.div`
  .header {
    padding: 8px 12px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: burlywood;
  }
  .header-container-1 {
    width: 15vw;
    min-width: 110px;
  }
  .header-container-2 {
    width: 20vw;
    min-width: 145px;
  }
  .header-container-3 {
    width: 45vw;
    min-width: 340px;
  }
  .header-container-4 {
    width: 20vw;
    min-width: 180px;
  }
  .logo {
    background-color: beige;
    font-size: 24px;
    font-weight: bold;
  }
  .btn {
    cursor: pointer;
    font-size: 18px;
  }
  .login,
  .logout,
  .signup,
  .mypage {
    margin: 0px 8px;
  }
`;

function Header({ login, signup, modal }) {
  const isLogin = useSelector((state) => state.userReducer).token;
  const [isRecommend, setIsRecommend] = useState(false);
  const handleIsRecommend = (status) => setIsRecommend(status);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutRequest = () => {
    const token = localStorage.getItem('accessToken');
    const accessTokenTime = localStorage.getItem('accessTokenTime');
    const expiredTime = Number(process.env.REACT_APP_TOKEN_TIME);
    const logoutUrl = process.env.REACT_APP_API_URL + '/logout';
    const logoutConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    };
    const logoutData = { data: null };
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      // alert('토큰이 만료되었습니다');
      modal();
    } else {
      axios
        .post(logoutUrl, logoutData, logoutConfig)
        .then((res) => {
          dispatch(userLogout(res));
          dispatch(notify('로그아웃되었습니다.'));
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userinfo');
          localStorage.removeItem('accesstokenTime');
          localStorage.removeItem('initialTime');
          history.push('/mainpage');
          // window.location.replace('/mainpage');
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <HeaderWrapper>
      <div className="header">
        <div className="header-container-1">
          <Link to="/mainpage">
            <div className="logo" onClick={() => handleIsRecommend(false)}>
              M4M Logo
            </div>
          </Link>
        </div>
        <div className="header-container-2">
          <Link to="/recommendpage">
            <button
              className="btn recommend-page"
              onClick={() => handleIsRecommend(true)}
              disabled={isRecommend ? 'disabled' : null}>
              recommend page
            </button>
          </Link>
        </div>
        <div className="header-container-3">
          <HeaderSearchbar isRecommend={isRecommend} />
        </div>
        <div className="header-container-4">
          {!isLogin ? (
            <button
              className="btn login"
              onClick={() => {
                login();
              }}>
              login
            </button>
          ) : (
            <button className="btn logout" onClick={handleLogoutRequest}>
              logout
            </button>
          )}
          {!isLogin ? (
            <button
              className="btn signup"
              onClick={() => {
                signup();
              }}>
              signup
            </button>
          ) : (
            <Link to="/mylike">
              <button className="btn mypage">mypage</button>
            </Link>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;

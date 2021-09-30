import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../redux/action';
import { useHistory } from 'react-router';
import HeaderSearchbar from './HeaderSearchbar';
import axios from 'axios';

axios.defaults.headers.withCredentials = true;

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
  .display-none {
    display: none;
  }
`;

function Header({ handleModal }) {
  const isLogin = useSelector((state) => state.userReducer).token;
  const headerState = useSelector((state) => state.headerReducer);
  const [isRecommend, setIsRecommend] = useState(false);
  const handleIsRecommend = (status) => setIsRecommend(status);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log('🤔', headerState);
  window.onpageshow = (e) => {
    if (e.persisted) console.log('🤔🤔🤔 change!')
  }

  useEffect(() => {
    if(history.location.pathname === '/recommendpage') {
      setIsRecommend(true);
    } else {
      setIsRecommend(false);
    }
  }, [isLogin, history])

  const handleLogoutRequest = () => {
    const token = localStorage.getItem('accessToken');
    const logoutUrl = process.env.REACT_APP_API_URL + '/logout';
    const logoutConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const logoutData = { data: null };
    axios
      .post(logoutUrl, logoutData, logoutConfig)
      .then((res) => {
        dispatch(userLogout(res));
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userinfo');
        history.push('/mainpage');
        setIsRecommend(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <HeaderWrapper>
      <div className='header'>
        <div className='header-container-1'>
          <Link to='/mainpage'>
            <div className='logo' onClick={() => handleIsRecommend(false)}>
              M4M Logo
            </div>
          </Link>
        </div>
        <div className='header-container-2'>
          <Link to='/recommendpage'>
            <button
              className={headerState.recommendBtn ? 'btn recommend-page': 'display-none'}
              onClick={() => handleIsRecommend(true)}
            >
              recommend page
            </button>
          </Link>
        </div>
        <div className='header-container-3'>
          <HeaderSearchbar isRecommend={headerState.searchBar} />
        </div>
        <div className='header-container-4'>
          {!isLogin ? (
            <Link to='/login'>
              <button className='btn login' onClick={handleModal}>
                login
              </button>
            </Link>
          ) : (
            <button className='btn logout' onClick={handleLogoutRequest}>
              logout
            </button>
          )}
          {!isLogin ? (
            <Link to='/signup'>
              <button className='btn signup' onClick={handleModal}>
                signup
              </button>
            </Link>
          ) : (
            <Link to='/mylike'>
              <button className='btn mypage' onClick={() => handleIsRecommend(false)}>mypage</button>
            </Link>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;

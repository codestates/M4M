import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import HeaderSearchbar from './HeaderSearchbar';
import { notify, userLogout } from '../redux/action';
import axios from 'axios';
import { media } from './utils/_media-queries';
import { Colors } from '../components/utils/_var';

axios.defaults.headers.withCredentials = true;

const HeaderWrapper = styled.div`
  .header {
    height: 3.9rem;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(150, 150, 150, 0.2);
  }
  .header-container-1 {
    max-width: 6rem;
    background-color: burlywood;
    margin-left: .8rem;
    ${media.tabletMini`background-color: lime; margin-left: 1rem;`}
    ${media.tablet`background-color: cyan;`}
    ${media.laptop`background-color: green;`}
  }
  .header-container-2 {
    /* width: 20vw; */
    max-width: 12rem;
    background-color: salmon;
  }
  .header-container-3 {
    /* width: 45vw; */
    max-width: 22rem;
  }
  .header-container-4 {
    /* width: 20vw; */
    max-width: 15rem;
  }
  a {
    text-decoration: none;
  }
  .logo {
    /* background-color: beige; */
    font-size: 1.2rem;
  }
  .btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    /* background-color: red; */
  }
  .recommend-page {
    color: ${Colors.darkGray};
    font-size: .6rem;
    ${media.tabletMini`font-size: .9rem;`}
    ${media.tablet`font-size: .9rem;`}
    ${media.laptop`font-size: .9rem;`}
    /* background-color: red; */
  }
  .login,
  .logout,
  .signup,
  .mypage {
    margin: 0 .5rem;
    font-size: .5rem;
    ${media.tabletMini`font-size: .8rem;`}
    ${media.tablet`font-size: .8rem;`}
    ${media.laptop`font-size: .8rem;`}
    color: ${Colors.gray};
  }
  button:hover {
    color: ${Colors.pastelPurple};
  }
  .display-none {
    display: none;
  }
`;

function Header ({ login, signup, modal, handleMessage, handleNotice }) {
  const isLogin = useSelector((state) => state.userReducer).token;
  const headerState = useSelector((state) => state.headerReducer);
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
      }
    };
    const logoutData = { data: null };
    if (parseInt(accessTokenTime, 10) + expiredTime - new Date().getTime() < 0) {
      modal();
    } else {
      axios
        .post(logoutUrl, logoutData, logoutConfig)
        .then((res) => {
          dispatch(userLogout(res));
          localStorage.clear();
          handleNotice(true);
          handleMessage('로그아웃 성공!');
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <HeaderWrapper>
      <div className='header'>
        <div className='header-container-1'>
          <Link to='/mainpage'>
            <div className='logo'>
              M4M
            </div>
          </Link>
        </div>
        <div className='header-container-2'>
          <Link to='/recommendpage'>
            <button className={headerState.recommendBtn ? 'btn recommend-page' : 'display-none'}>
              노래 추천
            </button>
          </Link>
        </div>
        <div className='header-container-3'>
          <HeaderSearchbar isRecommend={headerState.searchBar} />
        </div>
        <div className='header-container-4'>
          {!isLogin
            ? (
              <button className='btn login' onClick={login}>
                로그인
              </button>
              )
            : (
              <button className='btn logout' onClick={handleLogoutRequest}>
                로그아웃
              </button>
              )}
          {!isLogin
            ? (
              <button className='btn signup' onClick={signup}>
                회원가입
              </button>
              )
            : (
              <Link to='/myinfo'>
                <button className='btn mypage'>
                  마이페이지
                </button>
              </Link>
              )}
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;

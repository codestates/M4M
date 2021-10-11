import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeaderSearchbar from './HeaderSearchbar';
import { userLogout } from '../redux/action';
import axios from 'axios';
import { media } from './utils/_media-queries';
import { Colors } from '../components/utils/_var';
import Logo from '../images/logo.png';
axios.defaults.headers.withCredentials = true;

const HeaderWrapper = styled.div`
  button:focus {
    outline: none;
  }
  .header {
    display: grid;
    height: 3.9rem;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(150, 150, 150, 0.2);
    grid-template-columns: 1fr 1fr 1fr 1fr;
    ${media.tablet`grid-template-columns: 10% 10% 45% auto;`}
    grid-template-areas:
      'logo recommend search pages'
  }
  .header-container-1 {
    grid-area: logo;
    width: 7rem;
    padding-left: 0;
    ${media.tablet`width: 8rem;`}
  }
  .header-container-2 {
    grid-area: recommend;
    width: 4.5rem;
    justify-self: flex-start;
    /* ${media.tabletMini`background-color: lavender;`} */
    text-align: left;
    ${media.tabletMini`text-align: center; width: 5rem;  margin-left: -2rem;`}
    ${media.tablet`width: 100%; margin-left: 0;`}
  }
  .header-container-3 {
    grid-area: search;
    text-align: right;
    padding-top: .4rem;
    width: 2rem;
    justify-self: end;
    ${media.tabletMini`padding-top: .2rem;`}
    ${media.tablet`width: 100%; text-align: center; padding-top: 0;`}
  }
  .header-container-4 {
    grid-area: pages;
    justify-self: end;
    width: 8.5rem;
    padding-right: .6rem;
    ${media.tabletMini`padding-right: 1.2rem; width: 10.75rem;`}
    ${media.tablet`padding-right: 1.1rem; width: 11rem; padding-right: 2.2rem;`}
  }
  a {
    text-decoration: none;
  }
  .logo {
    font-size: 1.2rem;
  }
  .logo-image {
    padding-left: .7rem;
    padding-top: .2rem;
    width: 5rem;
  }
  .btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .recommend-page {
    color: ${Colors.darkGray};
    font-size: .8rem;
    ${media.tabletMini`font-size: .85rem;`}
    ${media.tablet`font-size: .9rem;`}
    ${media.laptop`font-size: .9rem;`}
  }
  .login,
  .logout,
  .signup,
  .mypage {
    font-size: .65rem;
    padding-left: .2rem;
    ${media.tabletMini`font-size: .8rem; margin: 0 0 0 .5rem; padding: 0; `}
    ${media.tablet`padding-left: .4rem;`}
    margin-right: 0;
    color: ${Colors.gray};
  }
  button:hover {
    color: ${Colors.pastelPurple};
  }
  .display-none {
    display: none;
  }
`;

function Header ({ login, signup, modal, handleMessage, handleNotice, handleMediaState, handleSongMediaState, handleSongBarState, barState, handleBarState, resBarState }) {
  const isLogin = useSelector((state) => state.userReducer).token;
  const headerState = useSelector((state) => state.headerReducer);
  const dispatch = useDispatch();

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
          <Link to='/mainpage' onClick={() => { handleSongMediaState(); handleSongBarState(); }}>
            <div className='logo'>
              <img src={Logo} className='logo-image' alt='m4m-logo' />
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
          <HeaderSearchbar
            isRecommend={headerState.searchBar}
            handleMediaState={handleMediaState}
            barState={barState}
            handleBarState={handleBarState}
            resBarState={resBarState}
            handleMessage={handleMessage}
            handleNotice={handleNotice}
          />
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

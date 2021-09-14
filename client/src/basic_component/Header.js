import { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  .header {
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: burlywood;
  }
  .header-container-1 {
    width: 15vw;
  }
  .header-container-2 {
    width: 20vw;
  }
  .header-container-3 {
    width: 45vw;
  }
  .header-container-4 {
    width: 20vw;
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
  .searchbar-none {
    display: none;
  }
  .searchbar {
    display: flex;
    justify-content: center;
  }
  .searchbar-text {
    width: 30vw;
  }
  .login, .logout, .signup, .mypage  {
    margin: 0px 8px;
  }
  .test-container {
    padding: 8px 12px;
    background-color: beige;
  }
  .test {
    margin: 0px 8px;
  }
`

function Header () {
  // ! useState는 Redux를 사용하기 전 테스트 용으로 사용
  const [isLogin, setIsLogin] = useState(false);
  const [isRecommend, setIsRecommend] = useState(false);
  const [keyword, setKeyword] = useState('');
  console.log('🔴isLogin:', isLogin, '🟠isRecommend:', isRecommend);
  console.log('🟡', keyword);

  const handleIsLogin = () => setIsLogin(!isLogin);
  const handleIsRecommend = () => setIsRecommend(!isRecommend);
  const handleKeywordChange = (e) => setKeyword(e.target.value);

  return (
    <HeaderWrapper>
      <>
        <div className='header'>
          <div className='header-container-1'>
            <Link to='/mainpage'>
              <div className='logo'>M4M Logo</div>
            </Link>
          </div>
          <div className='header-container-2'>
            <Link to='/recommendpage'>
              <button className='btn recommend-page' disabled={isRecommend ? "disabled" : null}>recommend page</button>
            </Link>
          </div>
          <div className='header-container-3'>
            <div className={isRecommend ? 'searchbar-none':'searchbar'}>
              <select className='searchbar-dropbox'>
                <option value="title">title</option>
                <option value="artist">artist</option>
              </select>
              <input className='searchbar-text' type='text' onChange={handleKeywordChange}></input>
              <button className='btn searchbar-button'>search</button>
            </div>
          </div>
          <div className='header-container-4'>
            {!isLogin ? 
              <Link to="/login">
                <button className='btn login'>login</button>
              </Link>
              :
              <Link to="/logout">
                <button className='btn logout'>logout</button>
              </Link>
            }
            {!isLogin ? 
              <Link to="/signup">
                <button className='btn signup'>signup</button>
              </Link>
              :
              <Link to="/mypage">
                <button className='btn mypage'>mypage</button>
              </Link>
            }
          </div>
        </div>
        <div className='test-container'>
          <button className='btn test' onClick={handleIsLogin}>change login status for test</button>
          <button className='btn test' onClick={handleIsRecommend}>change Recommend status for test</button>
        </div>
      </>
    </HeaderWrapper>
  );
}

export default Header;
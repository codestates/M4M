import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import SongList from './MainSongList';
import { changeType, getSongsBulk } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { media } from '../../components/utils/_media-queries';
import axios from 'axios';

axios.defaults.headers.withCredentials = true;

const MainWrapper = styled.div`
  .main {
    display: inline-block;
    min-height: calc(100vh - 41px - 56px);
    ${media.tablet`display: flex;`}
  }
  .loading-container {
    padding-top: 2rem;
    font-family: 'Arial';
  }
`;

function Main () {
  const dispatch = useDispatch();
  const information = JSON.parse(localStorage.getItem('userinfo'));
  const token = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(changeType('All'));
    setIsLoading(true);
    const headersContent = { 'Content-Type': 'application/json' };
    if (information) headersContent.Authorization = `Bearer ${token}`;
    axios
      .get(process.env.REACT_APP_API_URL + '/mainpage', { headers: headersContent })
      .then((res) => {
        console.log('✅ songs update');
        dispatch(getSongsBulk(res.data.data));
        setIsLoading(false);
      })
      .catch(console.log);
  }, [dispatch]);

  return (
    <MainWrapper>
      <div className='main'>
        <SideNav />
        {isLoading
          ? <div className='loading-container'>
            로딩 중입니다...
          </div>
          : <SongList />}
      </div>
    </MainWrapper>
  );
}

export default Main;

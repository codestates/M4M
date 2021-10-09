import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import SongList from './MainSongList';
import { changeType, getSongsBulk } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { media } from '../../components/utils/_media-queries';
import axios from 'axios';

axios.defaults.headers.withCredentials = true;

const MainWrapper = styled.div`
  .main {
    display: inline-block;
    background-color: #f7efe5;
    min-height: calc(100vh - 62.39px - 129px);
    ${media.tablet`display: flex`};
    ${media.tabletMini`min-height: calc(100vh - 62.39px - 116px)`};
    ${media.tablet`min-height: calc(100vh - 62.39px - 71px)`};
    ${media.laptop`min-height: calc(100vh - 62.39px - 61px)`};
  }
`;

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    const information = JSON.parse(localStorage.getItem('userinfo'));
    const token = localStorage.getItem('accessToken');
    dispatch(changeType('All'));
    const headersContent = { 'Content-Type': 'application/json' };
    if (information) headersContent.Authorization = `Bearer ${token}`;
    axios
      .get(process.env.REACT_APP_API_URL + '/mainpage', { headers: headersContent })
      .then((res) => {
        console.log('✅ songs update');
        dispatch(getSongsBulk(res.data.data));
      })
      .catch(console.log);
  }, [dispatch]);

  return (
    <MainWrapper>
      <div className='main'>
        <SideNav />
        <SongList />
      </div>
    </MainWrapper>
  );
}

export default Main;

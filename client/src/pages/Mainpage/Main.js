import styled from 'styled-components';
import SideNav from '../../components/SideNav';
import SongList from './MainSongList';
import { changeType, getSongsBulk } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

axios.defaults.headers.withCredentials = true;

const MainWrapper = styled.div`
  .main {
    display: flex;
    background-color: #f7efe5;
    min-height: calc(100vh - 41px - 56px);
  }
`;

function Main () {
  const dispatch = useDispatch();
  const information = JSON.parse(localStorage.getItem('userinfo'));
  useEffect(() => {
    dispatch(changeType('All'));
    const headersContent = { 'Content-Type': 'application/json' };
    if (information) headersContent.Authorization = information.id;
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

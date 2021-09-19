import styled from 'styled-components';
import SideNav from './MainSideNav';
import SongList from './MainSongList';

const MainWrapper = styled.div`
  .main {
    display: flex;
    background-color: #f7efe5;
    min-height: calc(100vh - 41px - 56px);
  }
`;

function Main () {
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

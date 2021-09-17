import styled from 'styled-components';
import SideNav from './MainSideNav';
import SongList from './MainSongList';

const MainWrapper = styled.div`
  .main {
    display: flex;
  }
`

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

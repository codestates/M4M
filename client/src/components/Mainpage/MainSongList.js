import styled from 'styled-components';

const SongListWrapper = styled.div`
  .songlist {
    background-color: #f7efe5;
    width: 80vw;
    min-height: calc(100vh - 41px - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

function SongList () {
  return (
    <SongListWrapper>
      <div className='songlist'>
        songlist content
      </div>
    </SongListWrapper>
  );
}

export default SongList;

import styled from 'styled-components';

const SongListWrapper = styled.div`
  .songlist {
    background-color: #f7efe5;
    width: 80vw;
    justify-content: center;
    align-items: center;
  }
`;

function SongList () {
  const test = new Array(30).fill();
  return (
    <SongListWrapper>
      <div className='songlist'>
        {test.map((el, idx) => <div key={idx + 1}>test{idx + 1}</div>)}
      </div>
    </SongListWrapper>
  );
}

export default SongList;

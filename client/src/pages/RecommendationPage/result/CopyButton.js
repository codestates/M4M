import styled from 'styled-components';

const Wrapper = styled.div`
  margin: .8rem auto 4rem;
`;

const CopyButton = ({ songType, songList }) => {
  let copySongType = songType.name;
  let copySongList = [...songList];

  copySongList = copySongList.map((el) => el.split(',')[1]);

  copySongList = JSON.stringify(copySongList);
  copySongList = copySongList.replace(/[""{}/[^\]]+/g, '');
  copySongList = copySongList.replace(/,/g, '\n');

  copySongType += '\n\n' + copySongList;

  // console.log(copySongType);
  // console.log(copySongList);

  const copyResult = text => {
    navigator.clipboard.writeText(text).then(() => {
      alert('추천 결과가 클립보드에 복사되었습니다.');
    }, () => {
      alert('복사하기가 지원되지 않는 브라우저입니다.');
    });
  };

  return (
    <Wrapper>
      <button onClick={() => copyResult(copySongType)}>결과 복사하기</button>
    </Wrapper>
  );
};

export default CopyButton;

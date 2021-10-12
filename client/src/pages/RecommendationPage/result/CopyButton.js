import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import { Colors } from '../../../components/utils/_var';

const Button = styled.div`
  width: 9.5rem;
  height: 3rem;
  margin: .6rem auto 1.7rem;
  padding: 1rem 1rem;
  vertical-align: middle;
  color: ${Colors.black};
  background-color: ${Colors.pastelPurple};
  color: white;
  border-radius: 7px;
  border: none;
  font-family: 'Arial';
  font-size: .75rem;
  ${media.tablet`font-size: .8em; width: 10rem;`}

  &:hover {
    cursor: pointer;
    color: white;
    background-color: ${Colors.purple};
  }    
`;

const CopyButton = ({ songType, songList, handleNotice, handleMessage }) => {
  let copySongType = '나의 타입: ' + songType.name;
  let copySongList = [...songList];

  copySongList = copySongList.map((el) => el.split(',')[1]);

  copySongList = JSON.stringify(copySongList);
  copySongList = copySongList.replace(/[""{}/[^\]]+/g, '');
  copySongList = copySongList.replace(/,/g, '\n');

  copySongType += '\n\n' + '추천 노래:\n' + copySongList;

  const copyResult = text => {
    navigator.clipboard.writeText(text).then(() => {
      handleNotice(true);
      handleMessage('추천 결과가 클립보드에 복사되었습니다.');
    }, () => {
      handleNotice(true);
      handleMessage('복사하기가 지원되지 않는 브라우저입니다.');
    });
  };

  return (
    <Button onClick={() => copyResult(copySongType)}>
      추천 결과 복사하기
    </Button>
  );
};

export default CopyButton;

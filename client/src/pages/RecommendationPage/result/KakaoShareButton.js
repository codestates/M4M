import styled from 'styled-components';
import { media } from '../../../components/utils/_media-queries';
import kakaoLogo from '../../../images/kakao_logo.png';

require('dotenv').config();

const Wrapper = styled.div`
  img {
    vertical-align: middle;
    width: 1.15rem;
  }
  button:hover {
    cursor: pointer;
  }
  .kakao-button {
    width: 9rem;
    ${media.tablet`width: 9.5rem;`}
    margin: .8rem auto 0;
    padding: .8rem 1rem;
    background-color: #FEE500;
    border-radius: 7px;
    border: none;
  }
  .kakao-content {
    display: inline-block;
    vertical-align: middle;
    margin-left: .3rem;
    font-family: 'Arial';
    font-size: .75rem;
    ${media.tablet`font-size: .8rem;`}
    color: #000000 85%;
  }
`;

const KakaoShareButton = ({ songType, songList }) => {
  // console.log(songList);
  const copySongList = songList.map((el) => el.split(',')[1]);
  const copySongIds = songList.map((el) => el.split(',')[0]);

  const kakaoShare = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'list',
      headerTitle: `당신의 노래 취향은?\n${songType.name}`,
      headerLink: { mobileWebUrl: process.env.REACT_APP_URL },

      contents: [{
        title: copySongList[0],
        description: '당신을 위한 추천 노래',
        imageUrl: '이미지 주소',
        link: {
          webUrl: process.env.REACT_APP_URL + `/song:id=${copySongIds[0]}`,
          mobileWebUrl: process.env.REACT_APP_URL + `/song:id=${copySongIds[0]}`
        }
      }, {
        title: copySongList[1],
        description: '당신을 위한 추천 노래',
        imageUrl: '이미지 주소',
        link: {
          webUrl: process.env.REACT_APP_URL + `/song:id=${copySongIds[1]}`,
          mobileWebUrl: process.env.REACT_APP_URL + `/song:id=${copySongIds[1]}`
        }
      }, {
        title: copySongList[2],
        description: '당신을 위한 추천 노래',
        imageUrl: '이미지 주소',
        link: {
          webUrl: process.env.REACT_APP_URL + `/song:id=${copySongIds[2]}`,
          mobileWebUrl: process.env.REACT_APP_URL + `/song:id=${copySongIds[2]}`
        }
      }],
      buttons: [
        {
          title: '나도 추천 받기',
          link: {
            webUrl: process.env.REACT_APP_URL + '/recommendpage',
            mobileWebUrl: process.env.REACT_APP_URL + '/recommendpage'
          }
        }
      ]
    });
  };

  return (
    <Wrapper>
      <button className='kakao-button' onClick={kakaoShare}>
        <img src={kakaoLogo} alt='kakao-logo' />
        <div className='kakao-content'>카카오톡 공유하기</div>
      </button>
    </Wrapper>
  );
};

export default KakaoShareButton;

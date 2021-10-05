import styled from 'styled-components';
import { media } from '../components/utils/_media-queries';

const FooterWrapper = styled.div`
  .footer {
    padding: 12px 0px;
    background-color: #3f3f3f;
    width: 100vw;
    ${media.tablet`padding: 4px 12px;`}
  }
  .sub-container {
    display: inline;
    ${media.tablet`display: flex;`}
  }
  .link {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #caa6fe;
    }
  }
  .link-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 56px;
    ${media.tablet`min-height: 0px;`}
  }
  .container-empty {
    width: 100%;
  }
  .link, .copyright {
    min-width: 72px;
    padding: 4px 12px;
    text-decoration: none;
    color: #e9e9e9;
  }
  .copyright {
    min-width: 352px;
  }
`;

function Footer () {
  return (
    <FooterWrapper>
      <div className='footer'>
        <div className='sub-container'>
          <a
            className='link'
            href='https://github.com/codestates/M4M'
            target='_blank'
            rel='noopener noreferrer'
          >
            Project Repository Link
          </a>
        </div>
        <div className='sub-container'>
          <div className='link-container'>
            <a className='link' href='https://github.com/moo9205' target='_blank' rel='noopener noreferrer'>김무현</a>
            <a className='link' href='https://github.com/magababo' target='_blank' rel='noopener noreferrer'>김용우</a>
            <a className='link' href='https://github.com/TAETAEHO' target='_blank' rel='noopener noreferrer'>김태호</a>
            <a className='link' href='https://github.com/TTurbo0824' target='_blank' rel='noopener noreferrer'>하경주</a>
          </div>
          <div className='container-empty' />
          <span className='copyright'>copyright &copy; {new Date().getFullYear()} MGs All rights reserved.</span>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

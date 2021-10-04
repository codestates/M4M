import styled from 'styled-components';

const FooterWrapper = styled.div`
  .footer {
    padding: 4px 12px;
    background-color: #3f3f3f;
    width: 100vw;
  }
  .sub-container {
    display: flex;
  }
  .link {
    cursor: pointer;
  }
  .copyright {
    position: absolute;
    right: 0;
  }
  .link, .copyright {
    padding: 4px 12px;
    text-decoration: none;
    color: #e9e9e9;
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
          <a className='link' href='https://github.com/moo9205' target='_blank' rel='noopener noreferrer'>김무현</a>
          <a className='link' href='https://github.com/magababo' target='_blank' rel='noopener noreferrer'>김용우</a>
          <a className='link' href='https://github.com/TAETAEHO' target='_blank' rel='noopener noreferrer'>김태호</a>
          <a className='link' href='https://github.com/TTurbo0824' target='_blank' rel='noopener noreferrer'>하경주</a>
          <span className='copyright'>copyright &copy; {new Date().getFullYear()} MGs All rights reserved.</span>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

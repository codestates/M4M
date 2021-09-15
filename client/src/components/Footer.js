import styled from 'styled-components';

const FooterWrapper = styled.div`
  .footer {
    padding: 8px 12px;
    background-color: #3f3f3f;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .repository-link {
    display: flex;
  }
  .link {
    padding: 8px 12px;
    text-decoration: none;
    cursor: pointer;
  }
  .link, .copyright {
    color: #e9e9e9;
  }
`

function Footer () {
  return (
    <FooterWrapper>
      <div className='footer'>
        <div className='group repository-link'>
          <a 
            className='link' 
            href='https://github.com/codestates/M4M' 
            target='_blank' 
            rel='noopener noreferrer'>
            Project Repository Link
          </a>
        </div>
        <div className='personal repository-link'>
          <a className='link' href='https://github.com/moo9205' target='_blank' rel='noopener noreferrer'>김무현</a>
          <a className='link' href='https://github.com/magababo' target='_blank' rel='noopener noreferrer'>김용우</a>
          <a className='link' href='https://github.com/TAETAEHO' target='_blank' rel='noopener noreferrer'>김태호</a>
          <a className='link' href='https://github.com/TTurbo0824' target='_blank' rel='noopener noreferrer'>하경주</a>
        </div>
        <div className='copyright'>copyright MGs all rights reserved</div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

import styled from 'styled-components';

const FooterWrapper = styled.div`
  .footer {
    padding: 8px 12px;
    background-color: burlywood;
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
    color: navy;
    cursor: pointer;
  }
`

function Footer () {
  return (
    <FooterWrapper>
      <div className='footer'>
        <div className='group repository-link'>
          <a className='link' href='https://github.com/codestates/M4M' target='_blank'>Project Repository Link</a>
        </div>
        <div className='personal repository-link'>
          <a className='link' href='https://github.com/moo9205' target='_blank'>김무현</a>
          <a className='link' href='https://github.com/magababo' target='_blank'>김용우</a>
          <a className='link' href='https://github.com/TAETAEHO' target='_blank'>김태호</a>
          <a className='link' href='https://github.com/TTurbo0824' target='_blank'>하경주</a>
        </div>
        <div className='copyright'>copyright MGs all rights reserved</div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

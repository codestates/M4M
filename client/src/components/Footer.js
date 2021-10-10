import styled from 'styled-components';
import { media } from '../components/utils/_media-queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Colors } from '../components/utils/_var';

const FooterWrapper = styled.div`
  .footer {
    padding: 12px 0px;
    background-color: ${Colors.darkGray};
    width: 100vw;
    font-family: 'Arial';
    ${media.tablet`padding: 4px 12px;`}
  }
  .sub-container {
    display: inline;
    ${media.laptop`display: flex;`}
  }
  .link-label, .link, .copyright {
    color: ${Colors.lightGray};
    min-width: 86px;
    padding: 4px 12px;
  }
  .link {
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: ${Colors.pastelPurple}
    }
  }
  .link-label {
    min-width: 128px;
    ${media.laptop`text-align: left;`}
  } 
  .copyright {
    min-width: 352px;
  }
  .link-container {
    display: inline-block;
    padding: 12px 0px;
    justify-content: center;
    align-items: center;
    min-height: 56px;
    ${media.tabletMini`display: flex;`}
    ${media.tabletMini`padding: 0px 0px;`}
    ${media.tablet`min-height: 0px;`}
  }
  .container-empty {
    width: 100%;
  }
`;

function Footer () {
  const team = [{
    name: '김무현',
    repository: 'https://github.com/moo9205'
  },
  {
    name: '김용우',
    repository: 'https://github.com/magababo'
  },
  {
    name: '김태호',
    repository: 'https://github.com/TAETAEHO'
  },
  {
    name: '하경주',
    repository: 'https://github.com/TTurbo0824'
  }
  ];
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
            M4M Repository Link
          </a>
        </div>
        <div className='sub-container'>
          <div className='link-container'>
            <div className='link-label'>Developed by</div>
            {team.map((member, idx) =>
              <a className='link'
                key={idx}
                href={member.repository}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FontAwesomeIcon icon={faGithub} size='1x' color={Colors.lightGray} />
                {' '}{member.name}
              </a>
            )}
          </div>
          <div className='container-empty' />
          <span className='copyright'>copyright &copy; {new Date().getFullYear()} MGs All rights reserved.</span>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

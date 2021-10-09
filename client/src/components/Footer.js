import styled from 'styled-components';
import { media } from '../components/utils/_media-queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Colors } from '../components/utils/_var';

const FooterWrapper = styled.div`
  .footer {
    padding: 1rem 0;
    background-color: ${Colors.darkGray};
    width: 100vw;
    font-family: 'Arial';
    ${media.laptop`padding: 0 12px 4px;`}
  }
  .sub-container {
    display: inline;
    ${media.laptop`display: flex;`}
  }
  .repository, .link-label, .link, .copyright {
    color: ${Colors.lightGray};
    vertical-align: middle;
    margin-bottom: .2rem;
  }
  .repository {
    cursor: pointer;
    text-decoration: none;
    margin-top: 1rem;
    border-bottom: 2px solid transparent;
    transition-duration: 0.5s;
    &:hover {
      border-bottom-color: ${Colors.pastelPurple};
    }
  }
  .link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .name {
    padding: .3rem 0 0;
    margin: 0 .8rem 0 .2rem;
    border-bottom: 2px solid transparent;
    transition-duration: 0.5s;
    min-width: 48px;
    &:hover {
      border-bottom-color: ${Colors.pastelPurple};
    }
  }
  .link-label {
    min-width: 112px;
    padding-right: 0;
    ${media.tablet`text-align: left; min-width: 108px;`}
  } 
  .copyright {
    min-width: 352px;
    text-align: right;
  }
  .link-container {
    display: inline-block;
    justify-content: center;
    align-items: center;
    ${media.tabletMini`display: flex; padding: 0px 0px; line-height: 1.2rem;`}
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
            className='repository'
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
              <a className='link' key={idx} href={member.repository} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faGithub} size='1x' color={Colors.lightGray} />
                <div className='name'>{' '}{member.name}</div>
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

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Colors } from '../components/utils/_var';

const FooterWrapper = styled.div`
  .footer {
    padding: .8rem 0 .5rem 0;
    background-color: ${Colors.darkGray};
    width: 100vw;
    font-family: 'Arial';
  }
  .sub-container {
    display: flex;
    margin-left: 1rem;
  }
  .link, .copyright {
    color: ${Colors.lightGray};
  }
  .link {
    cursor: pointer;
    padding: 0 .4rem .5rem;
    text-decoration: none;
  }
  .copyright {
    position: absolute;
    right: 0;
    padding: 0 1rem .5rem; 
    text-decoration: none;
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
          <div className='link'>Developed by</div>
          {team.map((member, idx) =>
            <a className='link' key={idx} href={member.repository} target='_blank' rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faGithub} size='1x' color={Colors.lightGray} />
              {' '}{member.name}
            </a>
          )}
          <span className='copyright'>Copyright &copy; {new Date().getFullYear()} MGs All Rights Reserved.</span>
        </div>
      </div>
    </FooterWrapper>
  );
}

export default Footer;

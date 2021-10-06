import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { changeType } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../components/utils/_var';

const SideNavWrapper = styled.div`
  .main-deactive {
    display: none;
  }
  .sidenav {
    text-align: left;
    min-width: 12rem;
    max-width: 13rem;
    min-height: 100%;
    padding-top: 2rem;
  }
  @keyframes rainbow {     
    0% { color: #ff2a2a; }
    15% { color: #ff7a2a; }
    30% { color: #ffc52a; }
    45% { color: #43ff2a; }
    60% { color: #2a89ff; }
    75% { color: #202082; }
    90% { color: #6b2aff; } 
    100% { color: #e82aff; }
  }
  @keyframes horizontal {
    0% { margin-left: 9px; }
    50% { margin-left: 11px; }
    100% { margin-left: 9px; }
  }
`;

const Item = styled.div`
  margin: 0px 12px 14px;
  padding: 8px 20px 0;
  font-family: 'Arial';
  color: ${Colors.darkGray};
  cursor: pointer;
  font-size: 1.05rem;
  text-decoration: ${(props) => props.underline};
  text-decoration-thickness: 2px;
  text-underline-offset: 2.5px; 

  &:hover, &:focus {
    animation: rainbow 2000ms infinite;
  } 
  /* .space, .arrow {
    animation: horizontal 1000ms ease-in-out infinite;
  } */
  .arrow {
    display: inline-flex;
    border: 6px solid transparent;
    border-left: 6px solid black;
  }
`;

const SubItem = styled.div`
  position: relative;
  left: 30px;
  margin: 0px 18px;
  padding: 8px 12px;
  font-family: 'Arial';
  font-size: .9rem;
  color: ${Colors.darkGray};
  cursor: pointer;
  text-decoration: ${(props) => props.underline};
  text-decoration-thickness: 1px;
  text-underline-offset: 2px; 

  &:hover, &:focus {
    animation: rainbow 2000ms infinite;
  } 
`;

function SideNav () {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(null);
  const plainList = {All: '모든 노래', Like: '좋아요'};
  const accordionList = ['장르', '해시태그', '연도'];
  const accordionObj = {
    장르: ['발라드', '댄스', '랩/힙합', 'R&B/Soul', '인디음악', '록/메탈', '트로트', '포크/블루스'],
    해시태그: ['#인생곡인', '#가사가재밌는', '#몸이기억하는', '#눈물샘자극', '#노래방금지곡', '#영원한18번', '#추억소환'],
    연도: new Array(18).fill(1992).map((el, idx) => String(el + idx))
  };
  const mypageList = ['회원정보', '관심노래'];
  const mypageEndpoint = ['/myinfo', '/mylike'];
  const history = useHistory();
  const handleSelectChange = (e) => dispatch(changeType(e.target.getAttribute('value')));
  const handleIsOpen = (e) => {
    const curValue = e.target.getAttribute('value');
    if (isOpen === curValue) {
      setIsOpen(null);
    } else {
      setIsOpen(curValue);
    }
  };
  const handleClicked = (idx) => {
    history.push({
      pathname: mypageEndpoint[idx]
    });
  };

  const navType = useSelector((state) => state.typeReducer).navType || null;

  return (
    <SideNavWrapper>
      <div className='sidenav'>
        {/* history 값이 mainpage일 때, 다른 값 보여주기 */}
        <div className={history.location.pathname === '/mainpage' ? 'main-active' : 'main-deactive'}>
          {Object.keys(plainList)
            .map((list, idx) => {
              return (
                <Item
                  key={idx + 1}
                  value={list}
                  onClick={handleSelectChange}
                  underline={navType === list ? 'underline' : 'none'}
                >
                  <span className='space' />{plainList[list]}
                </Item>
              );
            })}
          {accordionList
            .map((list, idx) => {
              return (
                <div key={idx + 1}>
                  <Item value={list} onClick={handleIsOpen}>
                    <span className='arrow' />{list}
                  </Item>
                  {isOpen === list
                    ? accordionObj[list]
                      .map((el, idx) =>
                        <SubItem
                          key={idx + 1}
                          value={el}
                          onClick={handleSelectChange}
                          underline={navType === el ? 'underline' : 'none'}
                        >
                          {el}
                        </SubItem>
                      )
                    : null}
                </div>
              );
            })}
        </div>
        {/* history 값이 mylike나 myinfo일 때, 다른 값 보여주기 */}
        <div className={history.location.pathname === '/mylike' || history.location.pathname === '/myinfo' ? 'main-active' : 'main-deactive'}>
          {mypageList
            .map((list, idx) => {
              return (
                <Item
                  key={idx + 1}
                  value={list}
                  onClick={() => handleClicked(idx)}
                  underline={history.location.pathname === mypageEndpoint[idx] ? 'underline' : 'none'}
                >
                  <span className='space' />{list}
                </Item>
              );
            })}
        </div>
      </div>
    </SideNavWrapper>
  );
}

export default SideNav;

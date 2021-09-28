import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderSearchbar from "./HeaderSearchbar";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/action";
import axios from "axios";
import { useHistory } from "react-router";

const HeaderWrapper = styled.div`
  .header {
    padding: 8px 12px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: burlywood;
  }
  .header-container-1 {
    width: 15vw;
    min-width: 110px;
  }
  .header-container-2 {
    width: 20vw;
    min-width: 145px;
  }
  .header-container-3 {
    width: 45vw;
    min-width: 340px;
  }
  .header-container-4 {
    width: 20vw;
    min-width: 180px;
  }
  .logo {
    background-color: beige;
    font-size: 24px;
    font-weight: bold;
  }
  .btn {
    cursor: pointer;
    font-size: 18px;
  }
  .login,
  .logout,
  .signup,
  .mypage {
    margin: 0px 8px;
  }
`;

function Header({ handleModal }) {
  const isLogin = useSelector((state) => state.userReducer.user.login);
  const [isRecommend, setIsRecommend] = useState(false);
  const handleIsRecommend = (status) => setIsRecommend(status);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem("accessToken");

  const handleLogoutRequest = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(userLogout(res));
        localStorage.removeItem("accessToken");
        // history.push("/mainpage");
        // window.location.replace("/mainpage");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <HeaderWrapper>
      <div className="header">
        <div className="header-container-1">
          <Link to="/mainpage">
            <div className="logo" onClick={() => handleIsRecommend(false)}>
              M4M Logo
            </div>
          </Link>
        </div>
        <div className="header-container-2">
          <Link to="/recommendpage">
            <button
              className="btn recommend-page"
              onClick={() => handleIsRecommend(true)}
              disabled={isRecommend ? "disabled" : null}
            >
              recommend page
            </button>
          </Link>
        </div>
        <div className="header-container-3">
          <HeaderSearchbar isRecommend={isRecommend} />
        </div>
        <div className="header-container-4">
          {!isLogin ? (
            <Link to="/login">
              <button
                className="btn login"
                onClick={() => {
                  handleModal();
                }}
              >
                login
              </button>
            </Link>
          ) : (
            // <Link to="/logout">
            <button className="btn logout" onClick={handleLogoutRequest}>
              logout
            </button>
            // </Link>
          )}
          {!isLogin ? (
            <Link to="/signup">
              <button
                className="btn signup"
                onClick={() => {
                  handleModal();
                }}
              >
                signup
              </button>
            </Link>
          ) : (
            <Link to="/mypage">
              <button className="btn mypage">mypage</button>
            </Link>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;

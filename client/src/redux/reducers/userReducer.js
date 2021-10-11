import { LOG_IN, LOG_OUT, EDIT_INFO } from '../action';
import { initUserState } from './initialState';

const userReducer = (state = initUserState, action) => {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        token: action.token,
        userInfo: {
          birthYear: action.payload.birthYear,
          email: action.payload.email,
          kakao: action.payload.kakao,
          nickname: action.payload.nickname
        }
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        token: null,
        userInfo: {
          birthYear: null,
          email: null,
          kakao: null,
          nickname: null
        }
      });
    case EDIT_INFO:
      return Object.assign({}, state, {
        token: action.token,
        userInfo: {
          birthYear: action.payload.birthYear,
          email: action.payload.email,
          kakao: action.payload.kakao,
          nickname: action.payload.nickname
        }
      });
    default: return state;
  }
};

export default userReducer;

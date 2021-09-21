import { LOG_IN, LOG_OUT } from '../action';
import { initialState } from './initialState';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        user: {
          login: true,
          userInfo: {
            nickname: action.payload.nickname,
            birthYear: action.payload.birthYear
          }
        }
      });

    case LOG_OUT:
      return Object.assign({}, state, {
        user: {
          login: false,
          userInfo: {
            nickname: 'guest',
            birthYear: null
          }
        }
      });

    default: return state;
  }
};

export default userReducer;

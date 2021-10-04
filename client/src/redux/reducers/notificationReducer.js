import { NOTI_FOUND, NOTI_LOST } from '../action';
import { initNotiState } from './initialState';

const notiReducer = (state = initNotiState, action) => {
  switch (action.type) {
    case NOTI_FOUND:
      return Object.assign({}, state, {
        notifications: action.payload
      });
    case NOTI_LOST:
      return Object.assign({}, state, {
        notifications: { message: '' }
      });
    default: return state;
  }
};

export default notiReducer;

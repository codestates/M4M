import { HEADER_CHANGE } from '../action';
import { initHeaderState } from './initialState';

const headerReducer = (state = initHeaderState, action) => {
  switch (action.type) {
    case HEADER_CHANGE:
      return Object.assign({}, state, {
        recommendBtn: action.payload[0],
        searchBar: action.payload[1]
      });
    default: return state;
  }
};

export default headerReducer;

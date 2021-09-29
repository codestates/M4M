import { TYPE_CHANGE } from '../action';
import { initTypeState } from './initialState';

const typeReducer = (state = initTypeState, action) => {
  switch (action.type) {
    case TYPE_CHANGE:
      return Object.assign({}, state, {
        navType: action.payload
      });
    default: return state;
  }
};

export default typeReducer;

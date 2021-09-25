import { TYPE_CHANGE } from '../action';
import { initialState } from './initialState';

const typeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_CHANGE:
      return Object.assign({}, state, {
        navType: action.payload
      });
    default: return state;
  }
};

export default typeReducer;

import { GET_SONGS_BULK } from '../action';
import { initialState } from './initialState';

const songsBulkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS_BULK:
      return Object.assign({}, state, {
        songsBulk: action.payload
      });
    default: return state;
  }
};

export default songsBulkReducer;

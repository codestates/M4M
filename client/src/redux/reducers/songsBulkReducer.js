import { GET_SONGS_BULK } from '../action';
import { initSongBulkState } from './initialState';

const songsBulkReducer = (state = initSongBulkState, action) => {
  switch (action.type) {
    case GET_SONGS_BULK:
      return Object.assign({}, state, {
        songsBulk: action.payload
      });
    default: return state;
  }
};

export default songsBulkReducer;

import { GET_SEARCH_RESULT } from '../action';
import { initSearchResultState } from './initialState';

const searchReducer = (state = initSearchResultState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULT:
      return Object.assign({}, state, {
        searchResult: action.payload
      });
    default: return state;
  }
};

export default searchReducer;

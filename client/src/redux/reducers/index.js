import { combineReducers } from 'redux';
import notiReducer from './notificationReducer';
import songsBulkReducer from './songsBulkReducer';
import searchReducer from './searchReducer';
import typeReducer from './typeReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  notiReducer,
  songsBulkReducer,
  searchReducer,
  typeReducer,
  userReducer
});

export default rootReducer;

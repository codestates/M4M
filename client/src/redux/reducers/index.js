import { combineReducers } from 'redux';
import notiReducer from './notificationReducer';
import songsBulkReducer from './songsBulkReducer';
import typeReducer from './typeReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  notiReducer,
  songsBulkReducer,
  typeReducer,
  userReducer
});

export default rootReducer;

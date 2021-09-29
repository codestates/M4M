import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notiReducer from './notificationReducer';
import songsBulkReducer from './songsBulkReducer';
import searchReducer from './searchReducer';
import typeReducer from './typeReducer';
import userReducer from './userReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['userReducer']
};

const rootReducer = combineReducers({
  notiReducer,
  songsBulkReducer,
  searchReducer,
  typeReducer,
  userReducer
});

export default persistReducer(persistConfig, rootReducer);

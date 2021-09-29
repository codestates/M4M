export const NOTI_FOUND = 'NOTI';
export const NOTI_LOST = 'NOTI_ALIVE';
export const TYPE_CHANGE = 'TYPE_CHANGE';
export const GET_SONGS_BULK = 'GET_SONGS_BULK';
export const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const notify = (message, duration = 3000) => dispatch => {
  dispatch(notiFound(message));
  setTimeout(() => {
    dispatch(notiLost());
  }, duration);
};

export const notiFound = (message) => {
  return {
    type: NOTI_FOUND,
    payload: { message }
  };
};

export const notiLost = () => {
  return {
    type: NOTI_LOST
  };
};

export const changeType = (type) => {
  return {
    type: TYPE_CHANGE,
    payload: type
  };
};

export const getSongsBulk = (songsBulk) => {
  return {
    type: GET_SONGS_BULK,
    payload: songsBulk
  };
};

export const getResult = (searchResult) => {
  return {
    type: GET_SEARCH_RESULT,
    payload: searchResult
  }
}

export const userLogin = (loginData, token) => {
  return {
    type: LOG_IN,
    payload: loginData,
    token: token
  };
};

export const userLogout = () => {
  return {
    type: LOG_OUT
  };
};

export const initialState = {
  user: {
    login: false,
    userInfo: {
      nickname: 'guest',
      birthYear: null
    }
  },
  songsBulk: [],
  notifications: {
    message: ''
  }
};

export const initTypeState = {
  navType: 'All'
};

export const initSearchResultState = {
  searchResult: []
}

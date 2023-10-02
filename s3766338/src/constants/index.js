
export const typeLocal = {
  ACCOUNTS: 'ACCOUNTS',
  ACCOUNT_LOGIN: 'ACCOUNT_LOGIN',
  MOVIE_LIST: 'MOVIE_LIST',
  LIST_COMMENT: 'LIST_COMMENT'
}

export const messageAuth = {
  REGISTER_SUCCESS: 'You have successful register',
  REGISTER_EXITS: 'Email has already registered',
  LOGIN_SUCCESS: 'You have successful login',
  LOGIN_ERROR: 'Wrong username or password'
}

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === '{}'
}
import * as types from './ActionsTypes';
export const isLogin = payload => {
  return {
    type: types.IS_LOGIN,
    payload,
  };
};

export const isLoadding = payload => {
  return {
    type: types.IS_LOADING,
    payload,
  };
};

export const setUserDetails = payload => {
  return {
    type: types.USER_DETAILS,
    payload,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

import * as aTypes from './actionTypes';

export const authStart = () => ({
  type: aTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: aTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = (error) => ({
  type: aTypes.AUTH_FAIL,
  error,
});

export const auth = () => (dispatch) => {
  dispatch(authStart());
};

import axios from 'axios';
import * as aTypes from './actionTypes';

export const authStart = () => ({
  type: aTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: aTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = (error) => ({
  type: aTypes.AUTH_FAIL,
  error,
});

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: aTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  const authKey = process.env.REACT_APP_FIREBASEAPIKEY;
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
  let url = `${authUrl}:signUp?key=${authKey}`;
  if (!isSignup) {
    url = `${authUrl}:signInWithPassword?key=${authKey}`;
  }
  axios
    .post(
      url,
      authData,
    )
    .then((res) => {
      console.log('{auth} res', res);
      const { idToken, localId, expiresIn } = res.data;
      const experiationDate = new Date(new Date().getTime() + (expiresIn * 1000));
      localStorage.setItem('token', idToken);
      localStorage.setItem('expirationDate', experiationDate);
      localStorage.setItem('userId', localId);
      dispatch(authSuccess(idToken, localId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch((error) => {
      console.log('{auth error}', error);
      dispatch(authFail(error.response.data.error));
    });
};

export const setAuthRedirectPath = (path) => ({
  type: aTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(authLogout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      const newDateSeconds = new Date().getTime();
      dispatch(checkAuthTimeout((expirationDate.getTime() - newDateSeconds) / 1000));
    } else {
      dispatch(authLogout());
    }
  }
};

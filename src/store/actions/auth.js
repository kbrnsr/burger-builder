import axios from 'axios';
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
      dispatch(authSuccess(res.data));
    })
    .catch((error) => {
      console.log('{auth error}', error);
      dispatch(authFail(error));
    });
};

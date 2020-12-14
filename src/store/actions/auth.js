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

export const auth = (email, password) => (dispatch) => {
  const authKey = process.env.REACT_APP_FIREBASEAPIKEY;
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authKey}`,
      authData,
    )
    .then((res) => {
      console.log('{auth} res', res);
      dispatch(authSuccess());
    })
    .catch((error) => {
      console.log('{auth error}', error);
      dispatch(authFail());
    });
};

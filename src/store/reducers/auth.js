import * as aTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: '',
  userId: '',
  error: false,
  errorObject: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state) => updateObject(state, {
  error: false, errorObject: null, loading: true,
});

const authSuccess = (state, action) => {
  const { idToken, userId } = action;
  return updateObject(state, {
    token: idToken,
    userId,
    error: false,
    errorObject: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  const { error: errorObject } = action;
  return updateObject(state, {
    error: true,
    errorObject,
    loading: false,
  });
};

const authLogout = (state) => updateObject(state, {
  token: '',
  userId: '',
});

const setAuthRedirectPath = (state, action) => updateObject(state, {
  authRedirectPath: action.path,
});

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case aTypes.AUTH_START: return authStart(state);
    case aTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case aTypes.AUTH_FAIL: return authFail(state, action);
    case aTypes.AUTH_LOGOUT: return authLogout(state);
    case aTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
};

export default reducer;

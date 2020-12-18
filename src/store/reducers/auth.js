import * as aTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state) => updateObject(state, { error: null, loading: true });

const authSuccess = (state, action) => {
  const { idToken, userId } = action;
  return updateObject(state, {
    token: idToken,
    userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  const { error } = action;
  return updateObject(state, {
    error,
    loading: false,
  });
};

const authLogout = (state) => updateObject(state, {
  token: null,
  userId: null,
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

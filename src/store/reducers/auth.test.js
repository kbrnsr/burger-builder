import reducer from './auth';
import * as aTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        token: '',
        userId: '',
        error: false,
        errorObject: null,
        loading: false,
        authRedirectPath: '/',
      });
  });
  it('should store token upon login', () => {
    expect(reducer({
      token: '',
      userId: '',
      error: false,
      errorObject: null,
      loading: false,
      authRedirectPath: '/',
    }, {
      type: aTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-Id',
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-Id',
      error: false,
      errorObject: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});

import authReducer from '../reducer/auth.js';

describe('Auth Reducer', () => {
  let state = {auth: '1234567890987654321'}

  test('initial state should be null', () => {
    let result = authReducer(undefined, {type: null});
    expect(result).toEqual(null)
  })

  test('no action provided should return default state', () => {
    let result = authReducer(state, {type: null});
    expect(result).toEqual(state);
  })

  test('TOKEN_SET should return a token', () => {
    let action = {
      type: 'TOKEN_SET',
      payload: 'sample token'
    }

    let result = authReducer({}, action);
    expect(result).toBe(action.payload);
  })

  test('TOKEN_DELETE should return null', () => {
    let result = authReducer(state, {type: 'TOKEN_DELETE'});
    expect(result).toBe(null);
  })
})

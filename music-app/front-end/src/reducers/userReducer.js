import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
  } from '../actions/userActions';
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
      case SIGNUP_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGIN_USER_SUCCESS:
      case SIGNUP_USER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
          success: true,
        };
      case LOGIN_USER_FAILURE:
      case SIGNUP_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
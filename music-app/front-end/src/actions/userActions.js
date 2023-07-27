import { addUserLogin, addUserSignup } from '../controllers/user.controllers';
import { warning } from '../utils/shared.service';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};

export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};

export const signUpUserRequest = () => {
  return {
    type: SIGNUP_USER_REQUEST,
  };
};

export const signUpUserSuccess = (user) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user,
  };
};

export const signUpUserFailure = (error) => {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error,
  };
};

export const loginUser = (email,password) => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      const response =await addUserLogin(email,password)
      const token = response.data.token;
      const userId =response.data.existingUser.id;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      dispatch(loginUserSuccess(response.data.existingUser));
      warning("login successful","success")
    } catch (error) {
      dispatch(loginUserFailure(error.message));
    }
  };
};

export const signUpUser = (name, email, password) => {
  return async (dispatch) => {
    dispatch(signUpUserRequest());
    try {
      const response = await addUserSignup(name,email,password)
      dispatch(signUpUserSuccess(response.data.existingUser));
      warning("signUp successful","success")
    } catch (error) {
      dispatch(signUpUserFailure(error.message));
    }
  };
};


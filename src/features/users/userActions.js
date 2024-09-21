import axios from 'axios';
import config from '../../config';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;
const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};

const registerUserSuccess = (data) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
};

const registerUserFailure = (error) => {
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };
};

export const registerUser = (user) => {
  return (dispatch) => {
    dispatch(registerUserRequest());

    axios
      .post(`${apiUrl}/users/register/`, user)
      .then((response) => {
        dispatch(registerUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(registerUserFailure(error.message));
      });
  };
};

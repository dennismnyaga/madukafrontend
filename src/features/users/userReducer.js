import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
  } from './userActions';
  
  const initialState = {
    loading: false,
    user: null,
    error: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: '',
        };
      case REGISTER_USER_FAILURE:
        return {
          ...state,
          loading: false,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
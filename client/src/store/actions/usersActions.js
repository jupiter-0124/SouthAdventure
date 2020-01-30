import * as actionTypes from './actionTypes'
// import jwt from 'jsonwebtoken';

const URL = "http://54.67.113.64:3000/api";
const options = data => {
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(data)
  };
};

export const userRegisterRequest = (userSignupDetails) => {
  return dispatch => {
    return fetch(URL + '/register', options(userSignupDetails))
    .then(res => res.json());
  }
}

export const userLoginRequest = (userLoginDetails) => {
  return dispatch => {
    return fetch(URL + '/login', options(userLoginDetails))
    .then(res => res.json())
    .then(res => {
      if (!res.errors) {
        localStorage.setItem('jwtToken', res.user.token);
        localStorage.setItem('username', res.user.name);
        dispatch({ 
          type: actionTypes.LOGIN_SUCCESSFUL, 
          authorizationToken: res.user.token, 
          authenticatedUsername: res.user.name 
        });
      }
      return res;
    })
  }   
}

export const userLogoutRequest = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        dispatch({ type: actionTypes.LOGOUT_USER });
    }
}
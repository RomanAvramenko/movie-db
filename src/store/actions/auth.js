import { AUTH_LOGINFORM_OPEN, AUTH_SIGNUPFORM_OPEN, AUTH_LOGOUT, AUTH_SUCCESS } from "../types"
import axios from 'axios'
import { SubmissionError } from 'redux-form'
import { FIREBASE_URL, FIREBASE_API_KEY } from "../../constants"

export const signUp = async (values) => {
  const signUpData = {
    email: values.email,
    password: values.password,
    returnSecureToken: true
  }
  try {
    const response = await axios
      .post(`${FIREBASE_URL}:signUp?key=${FIREBASE_API_KEY}`, signUpData)
    console.log(response);
  } catch (e) {
    if (e.response.data.error.message === "EMAIL_EXISTS") {
      throw new SubmissionError({
        username: 'This email address already exists'
      })
    }
  }
}

export const signIn = async (values) => {
  const signInData = {
    email: values.username,
    password: values.password,
    returnSecureToken: true
  }
  try {
    const response = await axios
      .post(`${FIREBASE_URL}:signInWithPassword?key=${FIREBASE_API_KEY}`, signInData)
    const { data } = response
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate)
  } catch (e) {
    if (e.response.data.error.message === "INVALID_EMAIL") {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    }
    if (e.response.data.error.message === "INVALID_PASSWORD") {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    }
  }
}

const autoLogout = (time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export const setLogin = (value) => {
  return {
    type: AUTH_LOGINFORM_OPEN,
    payload: value
  }
}

export const setSignUp = (value) => {
  return {
    type: AUTH_SIGNUPFORM_OPEN,
    payload: value
  }
}
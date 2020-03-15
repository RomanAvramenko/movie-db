import { LOGIN_FORM_OPEN } from "../types"
import axios from 'axios'
import { SubmissionError } from 'redux-form'
import { FIREBASE_URL, FIREBASE_API_KEY } from "../../constants"

export const signIn = async (values) => {
  const signInData = {
    email: values.username,
    password: values.password,
    returnSecureToken: true
  }
  try {
    const response = await axios
      .post(`${FIREBASE_URL}:signInWithPassword?key=${FIREBASE_API_KEY}`, signInData)
    console.log(response)
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
    console.log(e.response.data.error)
  }
}

export const setLogin = (value) => {
  return {
    type: LOGIN_FORM_OPEN,
    payload: value
  }
}
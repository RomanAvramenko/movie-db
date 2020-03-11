import { SubmissionError } from 'redux-form'
import axios from 'axios'

const API_KEY = 'AIzaSyDbcN_rzgVmqLsfTCC-BxxqQudubKDGTSo'
const URL_MAIN = 'https://identitytoolkit.googleapis.com/v1/accounts'

export const signUp = async (values) => {
  const signUpData = {
    email: values.email,
    password: values.password,
    returnSecureToken: true
  }
  try {
    const response = await axios
      .post(`${URL_MAIN}:signUp?key=${API_KEY}`, signUpData)
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
      .post(`${URL_MAIN}:signInWithPassword?key=${API_KEY}`, signInData)
    console.log(response);
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



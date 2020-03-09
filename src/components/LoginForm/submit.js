import { SubmissionError } from 'redux-form'
import axios from 'axios'

export const signUp = async (values) => {
  const signUpData = {
    email: values.email,
    password: values.password,
    returnSecureToken: true
  }
  try {
    const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbcN_rzgVmqLsfTCC-BxxqQudubKDGTSo', signUpData)
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export const signIn = async (values) => {
  const signInData = {
    email: values.username,
    password: values.password,
    returnSecureToken: true
  }
  try {
    const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbcN_rzgVmqLsfTCC-BxxqQudubKDGTSo', signInData)
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
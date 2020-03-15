import { SubmissionError } from 'redux-form'
import axios from 'axios'
import { FIREBASE_URL, FIREBASE_API_KEY } from '../../constants'

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
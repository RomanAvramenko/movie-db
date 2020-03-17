import React from 'react'
import { reduxForm, Field, Form } from 'redux-form'
import { Input } from '../UI/Input/Input'
import { required, minLength } from '../../utils/validators'
import { SubmissionError } from 'redux-form'
import { FIREBASE_URL, FIREBASE_API_KEY } from '../../constants'
import axios from 'axios'
import './LoginForm.scss'
import { useDispatch } from 'react-redux'
import { setLogin, authSuccess, autoLogout } from '../../store/actions/auth'

const LoginForm = props => {

  const { error, handleSubmit, submitting } = props
  const dispatch = useDispatch()
  const signIn = async (values) => {
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

      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
      dispatch(setLogin(false))

    } catch (e) {
      console.log(e.response);
      if (e.response.data.error.message === "EMAIL_NOT_FOUND") {
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

  return (
    <Form onSubmit={handleSubmit(signIn)} className="auth">
      <Field
        name="username"
        type="text"
        component={Input}
        label="Username"
        validate={[required]}
      />
      <Field
        name="password"
        type="password"
        component={Input}
        label="Password"
        validate={[required, minLength]}
      />
      {error && <strong className="text">{error}</strong>}
      <div>
        <button type="submit" disabled={submitting} className="button">
          Log In
        </button>
      </div>
    </Form>
  )
}
export default reduxForm({ form: 'submitValidation' })(LoginForm)
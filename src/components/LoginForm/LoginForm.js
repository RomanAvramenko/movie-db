import React from 'react'
import { reduxForm, Field, Form } from 'redux-form'
import './LoginForm.scss'
import { signIn } from './submit'
import { required, minLength } from '../utils/validators'
import { Input } from '../UI/Input/Input'

const LoginForm = props => {
  const { error, handleSubmit, submitting } = props
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
      {/* <Field
        name="Remember Me"
        type="checkbox"
        component={Input}
        label="Remember Me"
      /> */}
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
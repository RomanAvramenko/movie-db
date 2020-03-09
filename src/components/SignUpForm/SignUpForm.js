import React from 'react'
import { Input } from '../UI/Input/Input'
import { reduxForm, Form, Field } from 'redux-form'
import { required, email, minLength, confirmPass } from '../utils/validators'

const SignUpForm = props => {
  const { error, submitting } = props
  return (
    <Form onSubmit={() => { }} className="auth" >
      <Field
        name="username"
        type="text"
        component={Input}
        label="Username"
        validate={[required]}
      />
      <Field
        name="email"
        type="email"
        component={Input}
        label="Email"
        validate={[required, email]}
      />
      <Field
        name="password"
        type="password"
        component={Input}
        label="Password"
        validate={[required, minLength, confirmPass]}
      />
      <Field
        name="confirm"
        type="password"
        component={Input}
        label="Confirm password"
        validate={[confirmPass]}
      />
      {error && <strong className="text">{error}</strong>}
      <div>
        <button type="submit" disabled={submitting} className="button">
          Sign Up
        </button>
      </div>
    </Form>
  )
}

export default reduxForm({ form: 'submitValidation' })(SignUpForm)
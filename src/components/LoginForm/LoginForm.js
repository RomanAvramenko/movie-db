import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'
import './LoginForm.scss'
class LoginForm extends Component {

  state = {
    isFormValue: false,
    formControls: {
      userName: {
        value: '',
        type: 'text',
        label: 'User Name',
        errorMessage: 'This Username Already Exists',
        placeholder: "Enter Username",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter the correct password',
        placeholder: "Enter Password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 8
        }
      },
    }
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    formControls[controlName] = control
    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({
      formControls, isFormValid
    })
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }
    let isValid = true
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          placeholder={control.placeholder}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <form className="auth" >
        {this.renderInputs()}
        <Button className="auth__button">Login</Button>
      </form>
    )
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm)


export default LoginForm
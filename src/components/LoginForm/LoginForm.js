import React, { Component } from 'react'
import './LoginForm.scss'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'

export class LoginForm extends Component {

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
          minLength: 6
        }
      },
    }
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

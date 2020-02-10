import React from 'react'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'

export const SignUpForm = () => {
  return (
    <form className="auth">
      <label htmlFor="email" className="auth__label">Username</label>
      <Input
        type="text"
        placeholder="Enter Username"
        name="email"
        className="auth__input"
      />

      <label htmlFor="password" className="auth__label">Password</label>
      <Input
        type="password"
        placeholder="Enter Password"
        name="password"
        className="auth__input"
      />

      <label htmlFor="password-repeat" className="auth__label">Repeat Password</label>
      <Input
        type="text"
        placeholder="Enter Password"
        name="password-repeat"
        className="auth__input"
      />

      <Button className="auth__button">Login</Button>
    </form>
  )
}

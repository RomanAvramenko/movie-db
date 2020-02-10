import React from 'react'
import './Auth.scss'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'

export const Auth = () => {

  return (
    <form className="auth">
      <label htmlFor="username" className="auth__label">Username</label>
      <Input
        type="text"
        placeholder="Enter Username"
        name="username"
        className="auth__input"
      />

      <label htmlFor="password" className="auth__label">Password</label>
      <Input
        type="password"
        placeholder="Enter Password"
        name="username"
        className="auth__input"
      />

      <Button className="auth__button">Login</Button>
    </form>
  )
}

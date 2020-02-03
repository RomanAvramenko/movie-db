import React from 'react'
import './Auth.scss'

export const Auth = ({show}) => {

  return (
    <form className="auth">
      <label htmlFor="username"><strong>Username</strong></label>
      <input type="text" placeholder="Enter Username" name="username"/>

      <label htmlFor="password"><strong>Password</strong></label>
      <input type="password" placeholder="Enter Password" name="username"/>

      <button className="">Login</button>
    </form>
  )
}

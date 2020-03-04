import React from 'react'
import './Input.scss'

export const Input = ({ type, placeholder, name }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      name={name}
    />
  )
}

import React from 'react'
import './Input.scss'

export const Input = ({ type, placeholder, name, value, htmlFor, label, onChange }) => {
  return (
    <>
      <label className="auth__label" htmlFor={htmlFor}>{label}</label>
      <input
        className="input"
        type={type}
        id={htmlFor}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </>
  )
}

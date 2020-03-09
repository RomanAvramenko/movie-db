import React from 'react'
import './Input.scss'

export const Input = ({ input, label, type, meta: { touched, error } }) => {
  const hasError = (touched && error)
  const inputClass = hasError ? ("input error") : "input"
  return (
    <>
      <label className="auth__label">{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className={inputClass}
        />
        {hasError && <span className="text">{error}</span>}
      </div>
    </>
  )
}

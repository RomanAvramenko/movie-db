import React from 'react'
import './Button.scss'

export const Button = ({ children, onClick, title, className }) => {
    return (
        <button onClick={onClick} className={`button ${className}`} >
            {children && children}
            {title && title}
        </button>
    )
}

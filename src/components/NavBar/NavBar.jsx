import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import { Modal } from '../Modal/Modal'
import { LoginForm } from '../LoginForm/LoginForm'
import { SignUpForm } from '../SignUpForm/SignUpForm'
import "./NavBar.scss"

const NavBar = () => {

  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)

  const toggleSearch = (e) => {
    e.preventDefault();
    setOpen(!open)
  }

  const toggleModal = (e) => {
    if (e.target.id === 'login') {
      setOpenLogin(true)
    }
    if (e.target.id === 'signup') {
      setOpenSignUp(true)
    }
    setOpen(!open)
  }

  return (
    <>
      {openLogin
        ? <Modal
          show={openLogin}
          handleClose={() => setOpenLogin(false)}
        >
          <LoginForm />
        </Modal>
        : null
      }
      {openSignUp
        ? <Modal
          show={openSignUp}
          handleClose={() => setOpenSignUp(false)}
        >
          <SignUpForm />
        </Modal>
        : null
      }
      <nav className="menu__wrapper">
        <div className="menu__logo"><Link to="/">THEMOVIEBOX</Link></div>
        <div className="menu__toggle" >
          <button
            onClick={toggleSearch}
            className={open ? "menu__button checked" : "menu__button"}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={open ? "nav__menu checked" : "nav__menu"}>
            <li className="nav__menu__search"><SearchBar /></li>
            <li className="nav__menu__item nav__menu__login" id="login" onClick={toggleModal}>LOG IN</li>
            <li className="nav__menu__item nav__menu__item-color nav__menu__signin" id="signup" onClick={toggleModal}>SIGN UP</li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
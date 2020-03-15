import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar'
import { Modal } from '../Modal/Modal'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../store/actions/login'
import { setSignUp } from '../../store/actions/signUp'
import "./NavBar.scss"

const NavBar = () => {

  const dispatch = useDispatch()
  const { login: { open: openLogin }, signUp: { open: openSignUp } } = useSelector(state => state)

  const [open, setOpen] = useState(false)

  const toggleSearch = (e) => {
    e.preventDefault();
    setOpen(!open)
  }

  const toggleModal = (e) => {
    if (e.target.id === 'login') {
      dispatch(setLogin(true))
    }
    if (e.target.id === 'signup') {
      dispatch(setSignUp(true))
    }
    setOpen(!open)
  }

  return (
    <>
      {openLogin
        ? <Modal
          show={openLogin}
          handleClose={() => dispatch(setLogin(false))}
        >
          <LoginForm />
        </Modal>
        : null
      }
      {openSignUp
        ? <Modal
          show={openSignUp}
          handleClose={() => dispatch(setSignUp(false))}
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
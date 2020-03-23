import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar'
import { Modal } from '../Modal/Modal'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setSignUp, logout } from '../../store/actions/auth'
import "./NavBar.scss"

const NavBar = () => {

  const dispatch = useDispatch()
  const { logIn, signUp, token } = useSelector(state => state.auth)

  const [open, setOpen] = useState(false)

  const toggleSearch = (e) => {
    e.preventDefault();
    setOpen(!open)
  }

  const toggleModal = (e) => {
    const auth = e.target.id === 'login' ? setLogin : setSignUp
    dispatch(auth(true))
    setOpen(!open)
  }

  const modalRender = () => {
    const trigger = logIn || signUp
    const auth = trigger === logIn ? setLogin : setSignUp
    const form = trigger === logIn ? <LoginForm /> : <SignUpForm />
    return (
      trigger
        ? <Modal
          show={trigger}
          handleClose={() => dispatch(auth(false))}
        >
          {form}
        </Modal>
        : null)
  }

  const navButtonRender = () => {
    const unLogedIn = (
      <>
        <li
          className="nav__menu__item nav__menu__login"
          id="login"
          onClick={toggleModal}
        >LOG IN</li>
        <li className="nav__menu__item nav__menu__item-color nav__menu__signin"
          id="signup"
          onClick={toggleModal}
        >SIGN UP</li>
      </>
    )
    const logedIn = (
      <>
        <li className="nav__menu__item nav__menu__item-color nav__menu__signin"
          onClick={()=>dispatch(logout())}
        >Log Out</li>
      </>
    )
    return (
      !token
        ? unLogedIn
        : logedIn
    )
  }

  return (
    <>
      {modalRender()}
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
            {navButtonRender()}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
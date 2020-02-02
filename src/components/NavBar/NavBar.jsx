import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar';
import "./NavBar.scss";
import { Modal } from '../Modal/Modal';
import { Auth } from '../Auth/Auth';

const NavBar = () => {

  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  const toggle = (e) => {
    e.preventDefault();
    setOpen(!open)
  }

  return (
    <>
      {openLogin
        ? <Modal
          show={openLogin}
          handleClose={()=>setOpenLogin(false)}
        >
          <Auth />
        </Modal>
        : null
      }
      <nav className="menu__wrapper">
        <div className="menu__logo"><Link to="/">THEMOVIEBOX</Link></div>
        <div className="menu__toggle" >
          <button
            onClick={toggle}
            className={open ? "menu__button checked" : "menu__button"}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={open ? "nav__menu checked" : "nav__menu"}>
            <li className="nav__menu__search"><SearchBar /></li>
            <li className="nav__menu__item nav__menu__login" onClick={() => setOpenLogin(true)}>LOG IN</li>
            <li className="nav__menu__item nav__menu__item-color nav__menu__signin">SIGN UP</li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
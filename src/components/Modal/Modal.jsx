import React from 'react'
import './Modal.scss'

export const Modal = (props) => {
  const showHideClassName = props.show ? "modal display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <button onClick={props.handleClose} className='modal__btn'><i className="fas fa-times"></i></button>
      </section>
    </div>
  )
}

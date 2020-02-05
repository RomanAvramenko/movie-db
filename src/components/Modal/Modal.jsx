import React from 'react'
import './Modal.scss'
import { Button } from '../UI/Button/Button';

export const Modal = (props) => {
  const showHideClassName = props.show ? "modal display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <Button
          onClick={props.handleClose}
          className='modal'>
          <i className="fas fa-times"></i>
        </Button>
      </section>
    </div>
  )
}

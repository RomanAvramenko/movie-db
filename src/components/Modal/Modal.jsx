import React from 'react'
import './Modal.scss'
import { Button } from '../UI/Button/Button';
import PropTypes from 'prop-types';

export const Modal = ({show, handleClose, children}) => {
  const showHideClassName = show ? "modal display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button
          onClick={handleClose}
          className='modal'>
          <i className="fas fa-times"></i>
        </Button>
      </section>
    </div>
  )
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
}

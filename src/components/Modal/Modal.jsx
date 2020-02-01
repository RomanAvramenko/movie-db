import React from 'react'
import './Modal.scss'

export const Modal = ({ show, handleClose, trailerKey }) => {
  const showHideClassName = show ? "modal display-block" : "display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <iframe
          className="video"
          title="trailer"
          width="560"
          height="315"
          src={`//www.youtube.com/embed/${trailerKey}?autoplay=1`}
          frameBorder="0"
          allowFullScreen>
        </iframe>
        <button onClick={handleClose} className='modal__btn'><i className="fas fa-times"></i></button>
      </section>
    </div>
  )
}

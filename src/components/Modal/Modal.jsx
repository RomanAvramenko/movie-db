import React from 'react'
import './Modal.scss'

export const Modal = ({ props, show, handleClose }) => {
    const showHideClassName = show ? "modal display-block" : "display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <iframe
                    title={props.name}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/eSLe4HuKuK0`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
                <button onClick={handleClose} className='modal__btn'><i className="fas fa-times"></i></button>
            </section>

        </div>
    )
}

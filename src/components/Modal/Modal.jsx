import React from 'react'
import YouTube from 'react-youtube'
import './Modal.scss'

export const Modal = ({ show, handleClose, trailerKey }) => {
    const showHideClassName = show ? "modal display-block" : "display-none";
    const opts = {
        playerVars: {
            autoplay: 1,
            origin:"http://http://localhost:3000/"
        }
    };

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <YouTube
                    videoId={trailerKey}
                    opts={opts}
                />
                <button onClick={handleClose} className='modal__btn'><i className="fas fa-times"></i></button>
            </section>

        </div>
    )
}

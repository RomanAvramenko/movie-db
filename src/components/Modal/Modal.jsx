import React from 'react'
import YouTube from 'react-youtube'
import './Modal.scss'

export const Modal = ({ props, show, handleClose, trailerKey }) => {
    const showHideClassName = show ? "modal display-block" : "display-none";
    const opts = {
        height: '500',
        width: '800',
        playerVars: {
            autoplay: 1
        }
    };
    
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <YouTube
                    videoId={trailerKey}
                    opts={opts}
                    onReady={this._onReady}
                />
                <button onClick={handleClose} className='modal__btn'><i className="fas fa-times"></i></button>
            </section>

        </div>
    )
}

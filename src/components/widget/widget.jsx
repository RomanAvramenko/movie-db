import React from 'react';

import "./widget.scss";

const Widget = () => {
    return (
        <div className="widget">
            <span className="widget__title">
                <p>Rating</p>
                <p className="title">based on 3.546 reviews</p>
            </span>
            <span className="widget__rating">
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <div className="rating">3.4</div>
            </span>
        </div>
    )
}

export default Widget;
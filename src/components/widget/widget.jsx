import React from 'react';

import "./Widget.scss";

const Widget = ({ ratio, votes }) => {
    return (
        <div className="widget">
            <span className="widget__title">
                <p>Rating</p>
                <p className="title">based on {votes} reviews</p>
            </span>
            <span className="widget__rating">
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <div className="rating">{ratio}</div>
            </span>
        </div>
    )
}

export default Widget;
import React from 'react'

import "./SearchBar.scss"

export class SearchBar extends React.Component {

    state = {
        isOpen: "close",
        searchResponse: []
    }

    onClickHandler = () => {
        if (this.state.isOpen !== "open") {
            this.setState({
                isOpen: "open"
            })
        }
    }

    onBlurHandler = () => {
        this.setState({
            isOpen: "close"
        })
    }

    render() {
        return (
            <label htmlFor="search" className={this.state.isOpen} onClick={this.onClickHandler} onBlur={this.onBlurHandler}>
                <input type="text" placeholder="Search" />
                <i className="fas fa-search" ></i>
            </label>
        )
    }
}
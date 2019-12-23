import React from 'react'

import "./search-bar.scss"

export class SearchBar extends React.Component {

    state = {
        isOpen: "close",
        searchResponse: []
    }

    handleSearchBar = () => {
        if (this.state.isOpen !== "open") {
            this.setState({
                isOpen: "open"
            })
        } else {
            this.setState({
                isOpen: "close"
            })
        }
    }

    render() {
        return (
            <label htmlFor="search" className={this.state.isOpen}>
                <input type="text" placeholder="Search" onClick={this.handleSearchBar} />
                <i className="fas fa-search"></i>
            </label>
        )
    }
}
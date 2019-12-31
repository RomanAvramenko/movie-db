import React from 'react'
import axios from 'axios';

import "./SearchBar.scss"

export class SearchBar extends React.Component {

    API_KEY = 'api_key=82d1a8c492becf617a26326954e61f9a';
    BASE_URL = 'https://api.themoviedb.org/3/search/movie';

    state = {
        isOpen: "close",
        searchResponse: []
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const url = `${this.BASE_URL}?${this.API_KEY}&language=en-US&query=avengers&page=1&include_adult=false`;
        await axios
            .get(url)
            .then(result => {
                this.setState({
                    searchResponse: this.transformData(result),
                })
            })
            .catch(e => { console.log(e.config) });
    }

    transformData = (result) => {
        return {
            results: result.data.results
        }
    }

    inputHandler = e => {
        const itemText = e.target.value.toLowerCase();
        const currentItem = {
            text: itemText
        };
        this.setState({
            currentItem
        });
        e.preventDefault();
    };

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
                <input
                    type="text"
                    placeholder="Search"
                    value={this.currentItem}
                    onChange={this.inputHandler}
                />
                <i className="fas fa-search" ></i>
            </label>
        )
    }
}
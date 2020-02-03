import React from 'react'
import axios from 'axios';
import "./SearchBar.scss"
import { Redirect } from 'react-router-dom';
export class SearchBar extends React.Component {

  API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  BASE_URL = 'https://api.themoviedb.org/3/search/movie';

  state = {
    isOpen: "close",
    searchResponse: [],
    currentItem: null,
  }

  getData = async (name) => {
    const url = `${this.BASE_URL}?${this.API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
    await axios
      .get(url)
      .then(result => {
        this.setState({
          searchResponse: result.data.results
        })
      })
      .catch(e => { console.log(e.config) });
  }

  inputHandler = e => {
    const itemText = e.target.value.toLowerCase();
    const currentItem = {
      text: itemText
    };
    this.setState({
      currentItem
    });
  }

  searchHandler = e => {
    const { text } = this.state.currentItem
    this.getData(text)
    e.target.reset()
    e.preventDefault()
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
    const { isOpen, searchResponse } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.searchHandler}>
          <label
            id="searchBar__label"
            htmlFor="search"
            className={isOpen}
            onClick={this.onClickHandler}
            onBlur={this.onBlurHandler}>
            <input
              className="searchBar__input"
              type="text"
              placeholder="Search"
              value={this.currentItem}
              onChange={this.inputHandler}
            />
            <i className="fas fa-search" ></i>
          </label>
        </form>
        {searchResponse.length > 0 &&
          <Redirect to={{
            pathname: "/search",
            state: { searchResponse }
          }} />}
      </React.Fragment>
    )
  }
}
import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import "./SearchBar.scss"
import { useDispatch, useSelector } from 'react-redux';
import { searchResults } from '../../store/actions/search';


export const SearchBar = () => {

  const dispatch = useDispatch()
  const results = useSelector(state => state.searchRes.searchResults)

  const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

  const [open, setOpen] = useState("close")
  const [currentValue, setCurrentValue] = useState(null)

  const getData = async (name) => {
    const url = `${BASE_URL}?${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
    await axios
      .get(url)
      .then(result => { dispatch(searchResults(result.data.results)) })
      .catch(e => { console.log(e.config) });
  }

  const inputHandler = e => {
    const itemText = e.target.value.toLowerCase();
    const currentValue = {
      text: itemText
    };
    setCurrentValue(currentValue);
  }

  const searchHandler = e => {
    const { text } = currentValue
    getData(text)
    e.target.reset()
    e.preventDefault()
  }

  const onClickHandler = () => {
    if (open !== "open") {
      setOpen("open")
    }
  }

  const onBlurHandler = () => {
    setOpen("close")
  }

  return (
    <>
      <form onSubmit={searchHandler}>
        <label
          id="searchBar__label"
          htmlFor="search"
          className={open}
          onClick={onClickHandler}
          onBlur={onBlurHandler}>
          <input
            className="searchBar__input"
            type="text"
            placeholder="Search"
            //value={}
            onChange={inputHandler}
          />
          <i className="fas fa-search" ></i>
        </label>
      </form>
      {results.length > 0 &&
        <Redirect to={{
          pathname: "/search",
          state: { results }
        }} />}
    </>
  )

}
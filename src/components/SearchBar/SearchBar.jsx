import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getSearchData } from '../../store/actions/search'
import "./SearchBar.scss"

export const SearchBar = () => {

  const dispatch = useDispatch()
  const loading = useSelector(state => state.searchRes.loading)
  const [open, setOpen] = useState("close")
  const [current, setCurrent] = useState(null)

  const inputHandler = e => {
    const itemText = e.target.value.toLowerCase();
    setCurrent(itemText);
  }

  const searchHandler = e => {
    dispatch(getSearchData(current))
    e.target.reset()
    e.preventDefault()
  }

  const onClickHandler = () => open !== "open" && setOpen("open")

  const onBlurHandler = () => setOpen("close")

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
            onChange={inputHandler}
          />
          <i className="fas fa-search" ></i>
        </label>
      </form>
      {loading &&
        <Redirect to='/result' />
      }
    </>
  )
}
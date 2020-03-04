import React from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSearchData } from '../../store/actions/search'
import "./SearchBar.scss"
import { API_KEY, SEARCH_URL } from '../../constants';

class SearchBar extends React.Component {

  state = {
    isOpen: "close",
    searchResponse: [],
    currentItem: null,
  }

  getData = async (name) => {
    const url = `${SEARCH_URL}?${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
    await axios
      .get(url)
      .then(result => this.setState({ searchResponse: result.data.results }))
      .catch(e => { console.log(e.config) });
  }

  inputHandler = e => {
    const itemText = e.target.value.toLowerCase();
    const currentItem = { text: itemText };
    this.setState({ currentItem });
  }

  searchHandler = e => {
    const { text } = this.state.currentItem
    this.props.searchResp(text)
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
      <>
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
            pathname: `/result`,
            state: { searchResponse }
          }} />
        }
      </>
    )
  }
}

const mapStateToProps = ({ searchRes }) => {
  return {
    searchResp: searchRes.searchResults
  }
}

const mapDispatchToProps = dispatch => {
  return { searchResp: name => dispatch(getSearchData(name)) }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { getSearchData } from '../../store/actions/search'
import "./SearchBar.scss"

class SearchBar extends React.Component {

  state = {
    isOpen: "close",
    currentItem: null,
  }

  inputHandler = e => {
    const itemText = e.target.value.toLowerCase();
    const currentItem = { text: itemText };
    this.setState({ currentItem });
  }

  searchHandler = e => {
    const { text } = this.state.currentItem
    this.props.searchResp(text)
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
    const { isOpen } = this.state;
    const { searchResult, loading } = this.props
    console.log(searchResult);
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
        {loading &&
          <Redirect to='/result' />
        }
      </>
    )
  }
}

const mapStateToProps = ({ searchRes }) => {
  return {
    searchResult: searchRes.searchResults,
    loading: searchRes.loading
  }
}

const mapDispatchToProps = dispatch => {
  return { searchResp: name => dispatch(getSearchData(name)) }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
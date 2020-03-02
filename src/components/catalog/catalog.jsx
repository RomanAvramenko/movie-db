import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../Loading/Loading';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { TileItem } from '../TileItem/TileItem';
import { connect } from 'react-redux';
import { catalogResults } from '../../store/actions/catalog';
import { BASE_URL, API_KEY } from '../../constants';
import './Catalog.scss';
import '../styles/reactTabs.scss';


class Catalog extends React.Component {
  state = {
    searchVars: '/popular',
    currentPage: 0,
    totalPages: null,
    hasMore: true
  }

  request = (page) => {
    const url = `${BASE_URL}${this.state.searchVars}?${API_KEY}&language=en-US&page=${page}`;
    axios
      .get(url)
      .then(result => {
        if (this.state.currentPage === this.state.totalPages - 1) {
          this.setState({ hasMore: false })
        }
        this.props.results([...this.props.response, ...result.data.results])
        this.setState({
          currentPage: page,
          totalPages: result.data.total_pages
        })
      })
      .catch(e => { console.log(e.config); });
  }

  changeSearchHandler = (newSearch) => {
    window.scroll(0, 0)
    this.props.results([])
    this.setState({
      searchVars: newSearch,
      currentPage: 0
    })
  }

  render() {
    const {response} = this.props
    const loader = <Loading key={Math.random * 100} />
    const result = response ? <TileItem results={response} /> : loader;
    return (
      <section className="catalog">
        <ScrollToTop />
        <Tabs>
          <TabList>
            <Tab onClick={this.changeSearchHandler.bind(this, '/popular')}>Poular</Tab>
            <Tab onClick={this.changeSearchHandler.bind(this, '/top_rated')}>Top Rated</Tab>
            <Tab onClick={this.changeSearchHandler.bind(this, '/upcoming')}>New Arrivals</Tab>
          </TabList>
          <InfiniteScroll
            pageStart={this.state.currentPage}
            loadMore={this.request}
            hasMore={this.state.hasMore}
            loader={loader}
          >
            <TabPanel>
              {result}
            </TabPanel>
            <TabPanel>
              {result}
            </TabPanel>
            <TabPanel>
              {result}
            </TabPanel>
          </InfiniteScroll>
        </Tabs>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { response: state.catalog.response }
}

const mapDispatchToProps = dispatch => {
  return {
    results: responseData => dispatch(catalogResults(responseData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Catalog)
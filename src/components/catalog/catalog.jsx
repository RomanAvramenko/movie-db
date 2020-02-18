import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../Loading/Loading';
import { TileItem } from '../TileItem/TileItem';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import './Catalog.scss';
import '../styles/reactTabs.scss';

export default class Catalog extends React.Component {
  state = {
    response: [],
    searchVars: '/popular',
    currentPage: 1,
    totalPages: null,
    hasMore: true
  }

  request = async (page) => {
    const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    const BASE_URL = 'https://api.themoviedb.org/3/movie';
    const url = `${BASE_URL}${this.state.searchVars}?${API_KEY}&language=en-US&page=${this.state.currentPage}`;
    await axios
      .get(url)
      .then(result => {
        if (this.state.currentPage === this.state.totalPages - 1) {
          this.setState({ hasMore: false })
        }
        this.setState({
          response: [...this.state.response, ...result.data.results],
          currentPage: page,
          totalPages: result.data.total_pages
        })
      })
      .catch(e => { console.log(e.config); });
  }

  changeSearchHandler = (newSearch) => {
    window.scrollTo(0, 0)
    this.setState({
      response: [],
      searchVars: newSearch,
      currentPage: 1
    })
  }

  render() {
    const loader = <Loading key={Math.random * 100} />
    const result = this.state.response ? <TileItem results={this.state.response} /> : loader;
    return (
      <section className="catalog">
        <ScrollToTop />
        <Tabs>
          <TabList>
            <Tab onClick={this.changeSearchHandler.bind(this, '/popular')}>Poular</Tab>
            <Tab onClick={this.changeSearchHandler.bind(this, '/top_rated')}>Top Rated</Tab>
            <Tab onClick={this.changeSearchHandler.bind(this, '/upcoming')}>New Arrivals</Tab>
            <Tab onClick={this.changeSearchHandler.bind(this, '/now_playing')}>Now In Cinema</Tab>
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
            <TabPanel>
              {result}
            </TabPanel>
          </InfiniteScroll>
        </Tabs>
      </section>
    );
  }
}
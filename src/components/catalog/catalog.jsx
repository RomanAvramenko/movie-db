import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../Loading/Loading';
import { TileItem } from '../TileItem/TileItem';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import './Catalog.scss';
import '../styles/reactTabs.scss';
import { useDispatch, useSelector } from 'react-redux';
import { catalogResults } from '../../store/actions/catalog';

export const Catalog = () => {

  const dispatch = useDispatch()
  const { response, currentPage, totalPages } = useSelector(state => state.catalog)
  const [hasMore, setHasMore] = useState(true)
  const [tabsList, setTabsList] = useState('/popular')

  useEffect(() => {
    request()
    // eslint-disable-next-line
  }, [])

  const request = async (page) => {
    console.log(page);
    const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    const BASE_URL = 'https://api.themoviedb.org/3/movie';
    const url = `${BASE_URL}${tabsList}?${API_KEY}&language=en-US&page=${page}`;
    await axios
      .get(url)
      .then(result => {
        if (currentPage === totalPages - 1) {
          setHasMore(false)
        }
        dispatch(catalogResults({
          response: [...response, ...result.data.results],
          currentPage: page,
          totalPages: result.data.total_pages
        }))
      })
      .catch(e => { console.log(e.config); });
  }

  const changeSearchHandler = (newSearch) => {
    window.scroll(0, 0)
    setTabsList(newSearch)
    dispatch(catalogResults({
      response: [],
      currentPage: 1
    }))
  }


  const loader = <Loading key={Math.random * 100} />
  const result = response ? <TileItem results={response} /> : loader;
  return (
    <section className="catalog">
      <ScrollToTop />
      <Tabs>
        <TabList>
          <Tab onClick={changeSearchHandler.bind(null, '/popular')}>Poular</Tab>
          <Tab onClick={changeSearchHandler.bind(null, '/top_rated')}>Top Rated</Tab>
          <Tab onClick={changeSearchHandler.bind(null, '/upcoming')}>New Arrivals</Tab>
        </TabList>
        <InfiniteScroll
          pageStart={1}
          loadMore={request}
          hasMore={hasMore}
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
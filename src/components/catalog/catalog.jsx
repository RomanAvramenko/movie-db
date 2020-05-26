import React from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Loading } from "../UI/Loading/Loading";
import { ScrollToTop } from "../UI/ScrollToTop/ScrollToTop";
import { TileItem } from "../TileItem/TileItem";
import { useDispatch, useSelector } from "react-redux";
import {
  catalogResults,
  setSearchSelector,
  setCurrentPage,
  setDataLength,
  setTotalPages,
  setHasMore,
} from "../../store/actions/catalog";
import { BASE_URL, API_KEY } from "../../constants";
import { addToWishList } from "../../store/actions/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Catalog.scss";
import "../styles/reactTabs.scss";
import { useEffect } from "react";

export const Catalog = () => {
  const dispatch = useDispatch();
  const {
    catalog: {
      response,
      searchSelector,
      currentPage,
      dataLength,
      totalPages,
      hasMore,
    },
    auth: { userId, token },
  } = useSelector((state) => state);

  const url = `${BASE_URL}${searchSelector}?${API_KEY}&language=en-US&page=${currentPage}`;

  useEffect(() => {
    request();
  }, [searchSelector]);

  const request = () => {
    axios
      .get(url)
      .then((result) => {
        if (currentPage === totalPages - 1) {
          dispatch(setHasMore(false));
        }
        if (!response.some((i) => i.id === result.data.results[0].id)) {
          dispatch(catalogResults([...response, ...result.data.results]));
        }
        dispatch(setDataLength(result.data.results.length * currentPage));
        dispatch(setCurrentPage(currentPage + 1));
        dispatch(setTotalPages(result.data.total_pages));
      })
      .catch((e) => {
        console.log(e.config);
      });
  };

  const changeSearchHandler = (newSearch) => {
    window.scroll(0, 0);
    dispatch(catalogResults([]));
    dispatch(setSearchSelector(newSearch));
    dispatch(setCurrentPage(1));
  };

  const handleAddButton = (e, id) => {
    dispatch(addToWishList(userId, id, e));
  };

  const loader = <Loading key={Math.random * 100} />;
  const result = response ? (
    <TileItem
      token={token}
      response={response}
      handleAddButton={handleAddButton}
    />
  ) : (
    loader
  );
  return (
    <section className="catalog">
      <ScrollToTop />
      <Tabs>
        <TabList>
          <Tab onClick={() => changeSearchHandler("/popular")}>Poular</Tab>
          <Tab onClick={() => changeSearchHandler("/top_rated")}>Top Rated</Tab>
          <Tab onClick={() => changeSearchHandler("/upcoming")}>
            New Arrivals
          </Tab>
        </TabList>
        <InfiniteScroll
          dataLength={dataLength}
          next={request}
          hasMore={hasMore}
          loader={loader}
        >
          <TabPanel>{result}</TabPanel>
          <TabPanel>{result}</TabPanel>
          <TabPanel>{result}</TabPanel>
        </InfiniteScroll>
      </Tabs>
    </section>
  );
};

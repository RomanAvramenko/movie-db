import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loading from '../Loading/Loading';
import { TileItem } from '../TileItem/TileItem';
import './Catalog.scss';
import '../styles/reactTabs.scss';

export default class Catalog extends React.Component {
    state = {
        response: [],
        currentPage: 1,
        searchVars: '/popular' //
    }

    componentDidMount() {
        this.request();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchVars !== prevState.searchVars) {
            this.request();
        }
    }

    request = () => {
        const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
        const BASE_URL = 'https://api.themoviedb.org/3/movie';
        const url = `${BASE_URL}${this.state.searchVars}?${API_KEY}&language=en-US&page=${this.state.currentPage}`;
        axios
            .get(url)
            .then(result => {
                this.setState({ response: this._transformData(result) })
            })
            .catch(e => { console.log(e.config); });
    };

    _transformData = (result) => {
        return {
            page: result.data.page,
            results: result.data.results
        }
    }

    changeSearchHandler = (newSearch) => {
        this.setState({
            searchVars: newSearch
        })
    }

    render() {
        const result = this.state.response.results ? <TileItem results={this.state.response.results} /> : <Loading />;
        return (
            <section className="catalog">
                <Tabs>
                    <TabList>
                        <Tab onClick={this.changeSearchHandler.bind(this, '/popular')}>Poular</Tab>
                        <Tab onClick={this.changeSearchHandler.bind(this, '/top_rated')}>Top Rated</Tab>
                        <Tab onClick={this.changeSearchHandler.bind(this, '/upcoming')}>New Arrivals</Tab>
                    </TabList>
                    <TabPanel>
                        {result}
                    </TabPanel>
                    <TabPanel>
                        {result}
                    </TabPanel>
                    <TabPanel>
                        {result}
                    </TabPanel>
                </Tabs>
            </section>
        );
    }
}



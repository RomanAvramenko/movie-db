import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loading from '../Loading/Loading';
import { TileItem } from '../TileItem/TileItem';
import InfiniteScroll from 'react-infinite-scroller';
import './Catalog.scss';
import '../styles/reactTabs.scss';

export default class Catalog extends React.Component {
	state = {
		response: [],
		searchVars: '/popular',
		currentPage: null,
		totalPages: null
	}

	componentDidMount() {
		this.request();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.searchVars !== prevState.searchVars) {
			this.request();
		}
	}

	request = (page) => {
		const API_KEY = `api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
		const BASE_URL = 'https://api.themoviedb.org/3/movie';
		const url = `${BASE_URL}${this.state.searchVars}?${API_KEY}&language=en-US&page=${page}`;
		axios
			.get(url)
			.then(result => {
				this.setState({
					response: [...this.state.response, ...result.data.results],
					currentPage: page,
					totalPages: result.data.total_pages
				})
				console.log(this.state);
			})
			.catch(e => { console.log(e.config); });
	};
	changeSearchHandler = (newSearch) => {
		this.setState({
			response: [],
			searchVars: newSearch
		})
	}

	render() {
		const loader = <Loading />
		const result = this.state.response ? <TileItem results={this.state.response} /> : loader;
		return (
			<section className="catalog">
				<Tabs>
					<TabList>
						<Tab onClick={this.changeSearchHandler.bind(this, '/popular')}>Poular</Tab>
						<Tab onClick={this.changeSearchHandler.bind(this, '/top_rated')}>Top Rated</Tab>
						<Tab onClick={this.changeSearchHandler.bind(this, '/upcoming')}>New Arrivals</Tab>
					</TabList>
					<InfiniteScroll
						pageStart={1}
						loadMore={this.request}
						hasMore={true}
						loader={loader}
					>
						<TabPanel key={1}>
							{result}
						</TabPanel>
						<TabPanel key={2}>
							{result}
						</TabPanel>
						<TabPanel key={3}>
							{result}
						</TabPanel>
					</InfiniteScroll>
				</Tabs>
			</section>
		);
	}
}



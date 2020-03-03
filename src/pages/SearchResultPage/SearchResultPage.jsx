import React from 'react'
import NavBar from "../../components/NavBar/NavBar";
import Footer from '../../components/Footer/Footer';
import { SearchList } from '../../components/SearchList/SearchList';


export const SearchResultPage = ({ location }) => {
	return (
		<React.Fragment>
			<NavBar />
			<SearchList results={location.state.searchResponse} />
			<Footer />
		</React.Fragment>
	)
}

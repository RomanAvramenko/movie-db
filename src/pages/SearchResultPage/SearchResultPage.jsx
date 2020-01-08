import React from 'react'

import NavBar from "../../components/NavBar/NavBar";
import Footer from '../../components/Footer/Footer';
import { SearchList } from '../../components/SearchList/SearchList';


export const SearchResultPage = (props) => {
    return (
        <React.Fragment>
            <NavBar />
            <SearchList results={props.location.state.searchResponse}/>
            <Footer />
        </React.Fragment>
    )
}

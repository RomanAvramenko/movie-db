import React from 'react'

import Header from '../../components/Header/Header';
import { Catalog } from '../../components/Catalog/Catalog';
import Footer from '../../components/Footer/Footer';
import NavBar from "../../components/NavBar/NavBar";

export const MainPage = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Header />
            <Catalog />
            <Footer />
        </React.Fragment>
    )
}
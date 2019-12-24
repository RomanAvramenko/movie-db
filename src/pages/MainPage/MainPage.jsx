import React from 'react'

import Header from '../../components/Header/Header';
import Catalog from '../../components/Catalog/Catalog';
import Footer from '../../components/Footer/Footer';

export const MainPage = () => {
    return (
        <React.Fragment>
            <Header />
            <Catalog />
            <Footer />
        </React.Fragment>
    )
}